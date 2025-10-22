import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateNote, GetNotes, Readnote, WriteNote } from '@shared/types'

declare global {
  interface Window {
    //electron: ElectronAPI
    context:{
      locale:string,
      getNotes: GetNotes,
      readNote: Readnote,
      writeNote: WriteNote,
      createNote:CreateNote
    }
  }
}
