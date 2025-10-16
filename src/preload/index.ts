import { contextBridge } from 'electron'

if(!process.contextIsolated){
  throw new Error('Context Isolation is not enabled. The preload script requires context isolation to be enabled for security reasons.')
}

try{
  contextBridge.exposeInMainWorld('context',{
    //TODO
  })
}catch(error){
  console.error(error)
}
