"use client"

import type {Locale} from "@/app/i18n/config"
import { useEffect, useState, useActionState, useMemo, useRef } from "react"
import Message from "./Message"
import { MessageType } from "@/lib/types"
import Form from "next/form"
import IconChat from "@/public/images/icon-chat.svg"
import IconSend from "@/public/images/icon-send.svg"
import ChevronDown from "@/public/images/chevron-down.svg"
import IconClose from "@/public/images/icon-close.svg"
import Image from "next/image"

export default function Chat({lang, t}: {lang: Locale, t: Record<string, string>}){
    const [messages, setMessages] = useState<MessageType[]>([])
    const [openChat, setOpenChat] = useState<boolean>(false)
    const [showHint, setShowHint] = useState<boolean>(true)
    const firstLoad = useRef<boolean>(true)
    const bottomRef = useRef<HTMLDivElement>(null)
    const chatRef = useRef<HTMLDivElement>(null)
    const openChatRef = useRef<HTMLButtonElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [error, submitAction, isPending] = useActionState(async(_:unknown, formData: FormData) => {
        const newUserMessage = formData.get("chat-message")
        if(typeof newUserMessage !== "string" || newUserMessage.trim().length < 2){
            return new Error("Invalid form data")
        }
        setMessages(prev => [...prev, {role: "user", content: newUserMessage.trim()}])
        try{
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({lang, messages, newUserMessage: newUserMessage.trim()})
            })
            const body = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(body.error || "Unknown error");
            }
            if(body.role && body.content){
                setMessages(prev => [...prev, body])
            }else{
                throw new Error("Unknown error")
            }
        }catch(error){
            console.error(error) 
            return new Error(t.error)
        } 
    }, null)

    const greetingMessage = useMemo(()=>{
        return {
            role: "assistant",
            content: t.greeting
        }
    }, [])
    const pendingMessage = useMemo(()=>{
        return {
            role: "assistant",
            content: t.pending
        }
    }, [])

    const errorMessage = useMemo(()=>{
        return {
            role: "assistant",
            content: error?.message || t.unknownError
        }
    }, [error])

    useEffect(()=>{
        function removeMessages(){
            setMessages([])
        }
        removeMessages()
    }, [lang])

     useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [messages]);

    useEffect(()=>{
        if(firstLoad.current){
            firstLoad.current = false
            return
        }
        if(openChat){
            chatRef.current?.focus()
        }
        if(!openChat){
            openChatRef.current?.focus()
        }
    }, [openChat])

    return (
        <>
            {!openChat && (
                <div className="w-fit flex items-center gap-2 md:gap-4 fixed bottom-4 md:bottom-6 right-4 md:right-6 z-1000">
                    {showHint && (
                        <div 
                            className="w-50 md:w-75 p-4 bg-grey-700 shadom-md relative bg-gray-700 text-small md:text-pmobile rounded-sm
                            after:content-[''] after:bg-gray-700 after:absolute after:top-1/2
                            after:-right-1 md:after:-right-2 after:w-2 md:after:w-4 after:aspect-square after:rotate-45 after:-translate-y-1/2"
                            
                        >
                            <button
                                className="text-neutral-50 bg-gray-800 rounded-full w-6 md:w-8 aspect-square flex justify-center
                                items-center shadow-sm absolute -top-2 md:-top-4 -left-2 md:-left-4"
                                aria-label={t.closeHintAria}
                                onClick={()=> setShowHint(false)}
                            >
                            <Image className="w-2 md:w-3" src={IconClose} alt="" />
                            </button>
                            <p>{t.hint}</p>
                        </div>
                    )}
                    <button
                        ref={openChatRef}
                        className="w-18 md:w-24 2xl:w-30 aspect-square rounded-full flex items-center justify-center bg-lightgreen-500/90 text-neutral-900 text-pmobile shadow-md
                        md:bottom-6 md:right-6 z-1000" 
                        aria-label={t.chatBtnAria}
                        onClick={()=>{
                            setOpenChat(true)
                            if(showHint){
                                setShowHint(false)
                            }
                        }}
                    >
                        <Image className="w-12 md:w-16 2xl:w-20" src={IconChat} alt="" />
                    </button>
                </div>
            )}
            {openChat && (
                <section 
                    className="w-[calc(100%-2rem)] h-[calc(100dvh-2rem)] md:h-[calc(100dvh-3rem)] max-w-150 max-h-250 p-5 flex flex-col gap-4
                    bg-gray-700 rounded-lg shadow-lg fixed bottom-4 right-4 z-1000"
                    tabIndex={0}
                    ref={chatRef}
                    onKeyDown={(e)=>{
                        if(e.key === "Escape"){
                            setOpenChat(false)
                        }
                    }}
                    
                >
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-h3mobile font-semibold md:text-pdesktop">{t.heading}</h2>
                        <button 
                            className="w-10 aspect-square rounded-full flex items-center justify-center bg-gray-800"
                            aria-label={t.closeBtnAria}
                            onClick={()=> {
                                setOpenChat(false)
                            }}
                        >
                            <Image className="w-8" src={ChevronDown} alt="" />
                        </button>
                    </div>
                    <div className="h-full flex flex-col py-4 bg-neutral-900">
                        <div className="h-full max-h-[calc(100dvh-16rem)] md:max-h-[calc(100dvh-17rem)] flex flex-col gap-4 px-3 bg-neutral-900 overflow-y-auto"
                        aria-live="polite">
                            <Message t={t} message={greetingMessage} />
                            {messages.map((message, index) => {
                                return <Message t={t} key={index} message={message} />
                            })}
                            {isPending && <Message t={t} message={pendingMessage} />}
                            {(error && !isPending) && <Message t={t} message={errorMessage} />}
                            <div ref={bottomRef} />
                        </div>
                    </div>
                    <Form action={submitAction}>
                        <div className="flex items-center">
                            <label className="w-full flex">
                                <span className="sr-only">{t.textareaLabel}</span>
                                <textarea
                                    ref={textareaRef}
                                    className="relative focus:z-1 w-full h-20 text-small md:text-pmobile text-neutral-50 p-2 resize-none bg-neutral-900"
                                    name="chat-message"
                                    cols={3}
                                    maxLength={500}
                                    minLength={2}
                                    placeholder={t.textareaPlaceholder}
                                    required
                                >

                                </textarea>
                            </label>
                            <button 
                                disabled={isPending}
                                aria-disabled={isPending}
                                type="submit" 
                                aria-label={t.sendBtnAria}
                                className="relative focus:z-1 w-fit bg-lightgreen-500 text-small p-2 pr-3 h-20
                                flex flex-col justify-center items-center gap-1 bg-neutral-900 opacity-80 text-neutral-50"
                                onClick={()=>{
                                    textareaRef.current?.focus()
                                }}
                            >
                                <Image className="w-6 md:w-8" src={IconSend} alt="" />
                                {t.send}
                            </button>
                        </div>
                    </Form>
                </section>
            )}
        </>
    )
}