import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createNote, deleteNote, getNotes, readnote, writeNote } from './lib'
import { CreateNote, DeleteNote, GetNotes, Readnote, WriteNote } from '@shared/types'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    center: true,
    autoHideMenuBar: true,
    title: 'NoteMark',

    transparent: true,
    vibrancy:
      process.platform === 'darwin'
        ? 'under-window' 
        : undefined, 

    backgroundColor:
      process.platform === 'win32'
        ? '#00000020' 
        : '#00000000', 

    frame: false, 
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 15, y: 10 },

    ...(process.platform === 'linux' ? { icon } : {}),

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))
  
  ipcMain.handle('getNotes',(_,...args:Parameters<GetNotes>)=>getNotes(...args))
  ipcMain.handle('readNote',(_, ...args:Parameters<Readnote>)=>readnote(...args))
  ipcMain.handle('writeNote',(_, ...args:Parameters<WriteNote>)=>writeNote(...args))
  ipcMain.handle('createNote',(_, ...args:Parameters<CreateNote>)=>createNote(...args))
  ipcMain.handle('deleteNote',(_, ...args:Parameters<DeleteNote>)=>deleteNote(...args))

  // controladores de pestaña de windows
  ipcMain.handle('window:minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.minimize()
  })

  ipcMain.handle('window:toggle-maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipcMain.handle('window:close', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) win.close()
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
