"use client";

import Form from "next/form"
import { useActionState, useState } from "react";
import Reveal from "./Reveal";

export default function Contact({t}:{t: Record<string, any>}) {
  const [messageSent, setMessageSent] = useState<string>("")

  const [error, submitAction, isPending] = useActionState(async(_:unknown, formData: FormData)=> {
    setMessageSent("")
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    if(!name || typeof name !== "string"){
      return new Error("Please tell me your name")
    }
    if(!email || typeof email !== "string"){
      return new Error("Please tell me your name")
    }
    if(!subject || typeof subject !== "string"){
      return new Error("Please tell me your matter")
    }
    if(!message|| typeof message !== "string"){
      return new Error("Please include a short message")
    }
    const data = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || t.error);
    }
    setMessageSent(t.sent)
    return null
  }, null)

  const classNameInput = `w-full px-3 py-2 md:px-5 md:py-4 2xl:px-7 2xl:py-6 font-inherit text placeholder:font-inherit 
  placeholder:opacity-80 border border-neutral-50`

  return (
    <section id="contact" className="section mt-24 md:mt-38 2xl:mt-[calc(40rem/16)] 2xl:pt-[calc(156rem/16)] mb-6 md:mb-12 2xl:mb-20">
          <h2  className="text-center md:text-left text-h2mobile md:text-[3rem] 2xl:text-h2desktop font-sora uppercase text-balance
          mb-8 md:mb-11 2xl:mb-14">
            {t.heading[0]}
            <span className="text-lightgreen-500"> {t.heading[1]}</span>
          </h2>
          <Reveal delay={160}>
            <Form action={submitAction} className="text-small md:text-pdesktop w-full flex justify-center md:justify-start">
              <div className="w-full grid grid-cols-1 gap-6 md:gap-10 2xl:gap-14 md:grid-cols-2 justify-center max-w-[600px] md:max-w-[1440px]">
                <div className="w-full flex flex-col gap-6 md:gap-10 2xl:gap-14">
                  <label>
                    <span className="sr-only">Name</span>
                    <input
                      name="name"
                      type="text"
                      max={150}
                      placeholder="Name"
                      required
                      className={classNameInput}
                    />
                  </label>
                  <label>
                    <span className="sr-only">Email</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      max={150}
                      required
                      className={classNameInput}
                    />
                  </label>
                  <label>
                    <span className="sr-only">{t.subject}</span>
                    <input
                      name="subject"
                      type="text"
                      max={150}
                      placeholder={t.subject}
                      required
                      className={classNameInput}
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col gap-6 md:gap-10 2xl:gap-14 h-full">
                  <label>
                    <span className="sr-only">{t.message}</span>
                    <textarea
                      name="message"
                      maxLength={1000}
                      placeholder={t.message}
                      required
                      className={`${classNameInput} h-38 md:h-40 2xl:h-52`}>
                    </textarea>
                  </label>
                  <button
                    type="submit"
                    disabled={isPending}
                    aria-disabled={isPending}
                    className="text-small md:text-pdesktop w-1/2 min-w-40 md:w-3/4 bg-neutral-50 text-neutral-900 rounded-full 
                    py-2 md:py-3 2xl:py-5 text-center"
                  >
                    {isPending ? t.sending[0] : t.sending[1]}
                  </button>
                  <div
                    role="status"
                    aria-live="polite"
                    className="text-small md:text-pmobile 2xl:text-pdesktop transition-opacity duration-300"
                  >
                    {messageSent && (
                      <p className="text-lightgreen-500">{messageSent}</p>
                    )}
                    {error && (
                      <p className="text-red-400">{error?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          </Reveal>
    </section>
  );
}
