
export const DraggableTopBar =()=>{
    return(
        <header className="absolute inset-0 h-8 bg-transparent">
            <div className="flex items-center gap-2 pl-3 pt-2 select-none" style={{ ['-webkit-app-region' as any]: 'drag' }}>
                <div className="flex items-center gap-2" style={{ ['-webkit-app-region' as any]: 'no-drag' }}>
                    <button
                        aria-label="Close"
                        onClick={() => window.context.close()}
                        className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] hover:brightness-90"
                    />
                    <button
                        aria-label="Minimize"
                        onClick={() => window.context.minimize()}
                        className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e] hover:brightness-90"
                    />
                    <button
                        aria-label="Maximize"
                        onClick={() => window.context.toggleMaximize()}
                        className="h-3.5 w-3.5 rounded-full bg-[#28c840] hover:brightness-90"
                    />
                </div>
            </div>
        </header>
    )
}