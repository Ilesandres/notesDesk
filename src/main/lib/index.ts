import { appDirectory, fileEncoding } from "@shared/constanst"
import { NoteInfo } from "@shared/models"
import { CreateNote, DeleteNote, GetNotes, Readnote, WriteNote } from "@shared/types"
import { dialog } from "electron"
import { ensureDir, readdir, readFile, remove, stat, writeFile } from "fs-extra"
import { homedir } from "os"
import path from "path"

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

export const writeNote:WriteNote =async(filename,content )=>{
    const rootDir=getRootDir()
    console.info(`writing note ${filename}`)
    return writeFile(`${rootDir}/${filename}.md`,content,{encoding:fileEncoding})
}

export const createNote:CreateNote=async()=>{
    const rootDir= getRootDir()
    await ensureDir(rootDir)
    
    const {filePath, canceled}=await dialog.showSaveDialog({
        title:' New note',
        defaultPath:`${rootDir}/untitled.md`,
        buttonLabel: 'Create',
        properties: ["showOverwriteConfirmation"],
        showsTagField:false,
        filters:[{name: 'Markdown', extensions:['md']}]
    })
    if(canceled || !filePath){
        console.info('Note creation canceled')
        return false
    }
    const {name:filename, dir:parentDir}= path.parse(filePath)
    console.info(`parentDir : ${parentDir}  rootDir: ${rootDir}`)

    const parentDirNormal=path.resolve(parentDir);
    const rootDirNormal= path.resolve(rootDir)
    
    if(parentDirNormal !== rootDirNormal){
        await dialog.showMessageBox({
            type:'error',
            title:'Creation Failed',
            message: `all notes must be saved under ${rootDir}.
            Avoid usinf other directories`,
        })
        return false;
    }

    console.info(`Creating notes : ${filePath}`)
    await writeFile(filePath,'')
    return filename

}

export const deleteNote:DeleteNote=async(filename)=>{
    const rootDir= getRootDir()
    const {response}=await dialog.showMessageBox({
        type: 'warning',
        title: 'DeleteNote',
        message: `estas seguro de querer eliminar ${filename}?`,
        buttons: ['Eliminar','Cancelar'], //0 es boton de eliminar, 1 es de cancelar
        defaultId: 1,
        cancelId:1,
        noLink:true
    })
    if(response===1){
        console.info('note deletion canceled')
        return false
    }

    console.info(`Deleting note: ${filename}`)
    await remove(`${rootDir}/${filename}.md`)
    return true

}