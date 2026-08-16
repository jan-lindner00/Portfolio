"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Logo from "@/components/Logo"
import NavLink from "@/components/NavLink"
import Hamburger from "@/public/images/icon-hamburger.svg"
import IconClose from "@/public/images/icon-x.svg"


export default function Header({t}:{t: Record<string, string>}){
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement | null>(null)
    
    useEffect(()=>{
        const sections = document.querySelectorAll(".section")
        const sectionsArr = Array.from(sections) as HTMLElement[]
        const navLinks = document.querySelectorAll(".navlink")
        const navLinksArr = Array.from(navLinks) as HTMLElement[]

        function setActiveLink(){
            let current: string | null = ""
            sectionsArr.forEach(section => {
                const sectionTop = section?.offsetTop
                if(pageYOffset >= sectionTop - 60){
                    current = section.getAttribute("id")
                }
            })
            navLinksArr.forEach(link => {
                link.classList.remove("active")
                if(link.classList.contains(current ?? "")){
                    link.classList.add("active")
                }
            })
        }

        window.addEventListener("scroll", setActiveLink)

        return () => window.removeEventListener("scroll", setActiveLink)

    }, [])

    return (
        <>
            <header className="w-full 2xl:hidden h-[3.475rem]">
                <section className="flex items-center justify-between
                h-[3.475rem] pl-4 pr-5 bg-lightgreen-500">
                    <Logo className="w-7 fill-neutral-900" />
                    <button 
                        aria-label={showMenu ? t.closeMenu : t.openMenu}
                        onClick={() => setShowMenu(prev => !prev)}
                    >
                        {showMenu ? <Image className="w-5" src={IconClose} alt="" /> :
                        (<Image className="w-6" src={Hamburger} alt="" />)}
                    </button>
                </section>
                {showMenu && (
                    <section 
                        ref={menuRef}
                        tabIndex={0}
                        className="menu-mobile relative z-100"
                        onKeyDown={(e)=>{
                            if(e.key === "Escape"){
                                setShowMenu(false)
                            }
                        }}
                        onBlur={(e)=>{
                            if(!menuRef.current?.contains(e.relatedTarget)){
                                setShowMenu(false)
                            }
                        }}
                    >
                        <nav className="p-6 flex flex-col gap-4 text-h3mobile 
                            bg-neutral-800 text-neutral-0"
                        >
                            <NavLink href="#home">{t.home}</NavLink>
                            <NavLink href="#experience">{t.experience}</NavLink>
                            <NavLink href="#skills">{t.skills}</NavLink>
                            <NavLink href="#projects">{t.projects}</NavLink>
                            <NavLink href="#contact">{t.contact}</NavLink>
                        </nav>
                    </section>
                )}
            </header>
            <header className="sticky z-1000 top-0 left-0 w-full p-[3.475rem] max-w-[1440px] hidden 2xl:flex items-center justify-between bg-neutral-900">
                <Logo className="w-15 fill-lightgreen-500"/>
                <nav className="flex gap-[3.475rem] text-neutral-50 text-pdesktop">
                    <NavLink className="navlink home active" href="#home">{t.home}</NavLink>
                    <NavLink className="navlink experience" href="#experience">{t.experience}</NavLink>
                    <NavLink className="navlink skills" href="#skills">{t.skills}</NavLink>
                    <NavLink className="navlink projects" href="#projects">{t.projects}</NavLink>
                </nav>
                <Link 
                    href="#contact"
                    className="text-[1.125rem] text-medium py-3 px-7 border border-neutral-50 hover:text-lightgreen-500 hover:border-lightgreen-500 
                    transition-all duration-300 ease-in-out rounded-full uppercase hover:translate-x-[1px] hover:-translate-y-[1px]"
                    >
                        {t.contact}
                </Link>
            </header>
        </>
    )
}