import { NoteContent, NoteInfo } from "@shared/models";
import { atom } from "jotai";
import { notesMock } from "@/store/mocks";
import { unwrap } from "jotai/utils";

const loadNotes = async () => {
    const notes = await window.context.getNotes()
    //ordenar por edicion mas reciente
    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNotedAtomAsync = atom(async (get) => {
    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)
    if (selectedNoteIndex === null || !notes) return null;

    const selectedNote = notes[selectedNoteIndex]
    const noteContent = await window.context.readNote(selectedNote.title)

    return {
        ...selectedNote,
        content: noteContent
    }
})

export const selectedNotedAtom = unwrap(
    selectedNotedAtomAsync, (prev) =>
    prev ?? {
        title: '',
        content: '',
        lastEditTime: Date.now()
    })

export const creatEmptyNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom)
    if (!notes) return
    const title = await window.context.createNote()
    if(!title) return

    const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now(),
    }

    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
    set(selectedNoteIndexAtom, 0)
})
export const deleteNoteAtom = atom(null,async (get, set) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNotedAtom)
    if (!selectedNote || !notes) return

    const isDeleted=await window.context.deleteNote(selectedNote.title)
    if(!isDeleted) return

    set(
        notesAtom,
        notes.filter((note) => note.title !== selectedNote.title)
    )

    set(selectedNoteIndexAtom, null)
})

export const saveNoteAtom=atom(null, async(get,set, newContent:NoteContent)=>{
    const notes= get(notesAtom)
    const selectedNote=get(selectedNotedAtom)

    if(!selectedNote || !notes )return
    //guardar en disco
    await window.context.writeNote(selectedNote.title, newContent)

    //actuaizar la nota guardad la ultima vez
    set(
        notesAtom,
        notes.map((note)=>{
            if(note.title===selectedNote.title){
                return{
                    ...note,
                    lastEditTime:Date.now()
                }
            }
            return note
        })
    )
})