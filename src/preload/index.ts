import { GetNotes } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if(!process.contextIsolated){
  throw new Error('Context Isolation is not enabled. The preload script requires context isolation to be enabled for security reasons.')
}

try{
  contextBridge.exposeInMainWorld('context',{
    locale:navigator.language,
    getNotes:(...args:Parameters<GetNotes>)=>ipcRenderer.invoke('getNotes', ...args)
  })
}catch(error){
  console.error(error)
}
