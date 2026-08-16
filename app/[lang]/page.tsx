import Contact from "@/components/Contact"
import Experience from "@/components/Experience"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Home from "@/components/Home"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import { loadTranslations, createTranslator } from '@/app/i18n/utils'
import type { Locale } from '@/app/i18n/config'

export default async function Portfolio({params}: {params: Promise<{lang: Locale}>}){
    const {lang} = await params
    const translations = await loadTranslations(lang as Locale, ["home", "common", "projects"])
    const t = createTranslator(translations)
    const tContact = t("home.contact")
    const tHeader = t("common.header")
    return (
        <div className="flex flex-col items-center">
            <Header t={tHeader}/>
            <main className="w-full px-4 md:px-8 2xl:px-12 max-w-[1440px]">
                <Home t={t} />
                <Experience t={t} />
                <Skills t={t} />
                <Projects lang={lang} t={t} />
                <Contact t={tContact} />
            </main>
        </div>
    )
}