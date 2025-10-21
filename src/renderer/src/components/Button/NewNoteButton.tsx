import React from "react";
import { ActionButton, ActionButtonProps } from "@/components"
import { LucideFileSignature } from "lucide-react";
import { useSetAtom } from "jotai";
import { creatEmptyNoteAtom } from "@/store";


export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
    const createEmptynote=useSetAtom(creatEmptyNoteAtom)

    const handleCreation=()=>{
        createEmptynote()
    }

    return (
        <ActionButton onClick={handleCreation} {...props}>
            <LucideFileSignature className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    )
}