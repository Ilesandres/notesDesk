import { selectedNotedAtom } from "@/store"
import {  useAtomValue } from "jotai"

export const usemarkdownEditor=()=>{
    const selectedNote= useAtomValue(selectedNotedAtom)
    return{
        selectedNote
    }
}