import { appDirectory, fileEncoding } from "@shared/constanst"
import { NoteInfo } from "@shared/models"
import { GetNotes, Readnote } from "@shared/types"
import { ensureDir, readdir, readFile, stat } from "fs-extra"
import { homedir } from "os"

export const getRootDir=()=>{
    return `${homedir}/${appDirectory}`
}

export const getNotes:GetNotes = async()=>{
    const rootDir=getRootDir()

    await ensureDir(rootDir)

    const notesFilename = await readdir(rootDir,{
        encoding: fileEncoding,
        withFileTypes:false
    })

    const notes= notesFilename.filter((fileName)=> fileName.endsWith('.md'))
    return Promise.all(notes.map(getNotesInfoFromFileName))
}

export const getNotesInfoFromFileName=async(filename:string):Promise<NoteInfo>=>{
    const fileStats=await stat(`${getRootDir()}/${filename}`)
    return{
        title:filename.replace(/\.md$/, ''),
        lastEditTime: fileStats.mtimeMs
    }
}

export const readnote:Readnote= async(filename)=>{
    const rootDir= getRootDir()
    return readFile(`${rootDir}/${filename}.md`, {encoding:fileEncoding})
}