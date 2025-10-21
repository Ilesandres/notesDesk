import { NoteContent, NoteInfo } from "./models";

export type GetNotes=()=>Promise<NoteInfo[]>

export type Readnote=(title:NoteInfo['title'])=>Promise<NoteContent>

export type WriteNote = (title: NoteInfo['title'], content:NoteContent)=>Promise<void>