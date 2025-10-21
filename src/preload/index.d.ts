import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, Readnote } from '@shared/types'

declare global {
  interface Window {
    //electron: ElectronAPI
    context:{
      locale:string,
      getNotes: GetNotes,
      readNote: Readnote
    }
  }
}
