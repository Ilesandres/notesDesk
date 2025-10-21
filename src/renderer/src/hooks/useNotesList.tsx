import { notesAtom, selectedNoteIndexAtom } from "@/store"
import { useAtom } from "jotai"

export const useNotesList=({onSelect}: {onSelect?:()=>void})=>{
    const notes = useAtom(notesAtom)

    const [selectedNoteindex, SetSelectedNoteindex]= useAtom(selectedNoteIndexAtom)

    const handleNoteSelect=(index:number)=>async()=>{
        SetSelectedNoteindex(index)

        if(onSelect){
            onSelect()
        }
    }
    
    return{
        notes,
        selectedNoteindex,
        handleNoteSelect
    }
}