import { saveNoteAtom, selectedNotedAtom } from "@/store"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { NoteContent } from "@shared/models"
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react"
import { throttle } from "lodash"
import { autoSavingTime } from "@shared/constanst"

export const usemarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNotedAtom)
    const saveNote = useSetAtom(saveNoteAtom)
    const editorRef = useRef<MDXEditorMethods>(null)

    const handleAutoSaving = throttle(
        async (content: NoteContent) => {
            if (!selectedNote) return

            console.info('Auto saving : ', selectedNote.title)

            await saveNote(content)
        },
        autoSavingTime
        ,{
            leading:false,
            trailing:true,
        }
    )

    const handleBlur=async()=>{
        if(!selectedNote) return

        handleAutoSaving.cancel()

        const content=editorRef.current?.getMarkdown()

        if(content !=null){
            await saveNote(content)
        }
    }
    return {
        editorRef,
        selectedNote,
        handleAutoSaving,
        handleBlur
    }
}