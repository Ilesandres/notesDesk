import { ActionButtonsRows, Content, DraggableTopBar, FloatingNoteTitle, MarkdownEditor, NotePreviewList, RootLayout, Sidebar, } from "@/components"
import { useRef } from "react"

const App = () => {

  const contentContainerref= useRef<HTMLDivElement>(null)
  const resetScroll=()=>{
    contentContainerref.current?.scrollTo(0,0)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRows className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerref} className="border- bg-zinc-900/50 border-l-white/20">
        <FloatingNoteTitle className="pt-2"/>
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
