import { MessageType } from "@/lib/types";

export default function Message({message, t}: {message: MessageType, t: Record<string, string>}){
    return message.role === "user" ? (
        <div className="w-full max-w-4/5 flex flex-col gap-1 self-end">
            <div 
                className="w-fit max-w-4/5 p-2 rounded-[.5rem] text-small md:text-pmobile text-neutral-900 bg-lightgreen-500/95 relative after:absolute after:content-['']
                after:w-2 after:aspect-square after:bg-lightgreen-500/95 after:rotate-45 after:-right-1 after:top-3 z-1 afer:z-0 self-end"
                aria-label={t.messageYouAria}
            >
                {message.content}
            </div>
            <span aria-hidden className="text-small text-neutral-50 opacity-80 mr-2 self-end">{t.you}</span>
        </div>
    ) : (
        <div className="max-w-4/5 flex flex-col gap-1">
            <div 
                className="w-fit p-2 rounded-[.5rem] text-small md:text-pmobile text-neutral-900 bg-lightgreen-500/95 relative before:absolute before:content-['']
                before:w-2 before:aspect-square before:bg-lightgreen-500/95 before:rotate-45 before:-left-1 before:top-3 z-1 before:z-2"
                aria-label={t.messageTomAria}
            >
                {message.content}
            </div>
            <span aria-hidden className="text-small text-neutral-50 opacity-80 ml-2">Tom</span>
        </div>
    )
}