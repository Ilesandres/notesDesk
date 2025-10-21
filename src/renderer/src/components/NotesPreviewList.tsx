import {notesMock} from '@/store/mocks'
import { ComponentProps } from 'react'
import { NotePreview } from '@/components'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@/hooks/useNotesList'

export const NotePreviewList=({className,...props}:ComponentProps<'ul'>)=>{
    const {notes, selectedNoteindex, handleNoteSelect}=useNotesList({})
    if(notesMock.length===0){
        return(
            <ul className={twMerge('text-center pt-4', className)} {...props}>
                <span>No Notes yet</span>
            </ul>
        )
    }
    return (
        <ul className={className} {...props}>
            {notesMock.map((note, index)=>(
                <NotePreview key={note.title + note.lastEditTime} {...note}
                isActive={selectedNoteindex==index}
                onClick={handleNoteSelect(index)}
                {...note}
                />
            ))}
        </ul>
    )
}