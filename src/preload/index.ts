import { CreateNote, DeleteNote, GetNotes, Readnote, WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if(!process.contextIsolated){
  throw new Error('Context Isolation is not enabled. The preload script requires context isolation to be enabled for security reasons.')
}

try{
  contextBridge.exposeInMainWorld('context',{
    locale:navigator.language,
    getNotes:(...args:Parameters<GetNotes>)=>ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args:Parameters<Readnote>)=>ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args:Parameters<WriteNote>)=>ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args:Parameters<CreateNote>)=>ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args:Parameters<DeleteNote>)=>ipcRenderer.invoke('deleteNote', ...args),
   
    minimize: () => ipcRenderer.invoke('window:minimize'),
    toggleMaximize: () => ipcRenderer.invoke('window:toggle-maximize'),
    close: () => ipcRenderer.invoke('window:close')

  })
}catch(error){
  console.error(error)
}
