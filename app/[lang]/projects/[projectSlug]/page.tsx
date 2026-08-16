import HeaderProjects from "@/components/HeaderProjects";
import ProjectLinks from "@/components/ProjectLinks";
import ProjectSection from "@/components/ProjectSection";
import Reveal from "@/components/Reveal";
import TextSplitter from "@/components/TextSplitter";
import { loadTranslations, createTranslator } from "@/app/i18n/utils";
import type { Locale } from "@/app/i18n/config";
import type { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect, RedirectType } from "next/navigation";
import { i18nConfig } from "@/app/i18n/config";

export async function generateStaticParams() {
  const slugs = ["fx-checker", "savings-tracker", "tictactoe", "hangman"]

  const params = i18nConfig.localesToPrerender.flatMap((locale) =>
    slugs.map((slug) => ({
      lang: locale,
      slug: slug,
    }))
  )

  return params
}

export default async function Project({params}: {params: Promise<{lang: string, projectSlug: string}>}){
    const {lang, projectSlug} = await params
    const translations = await loadTranslations(lang as Locale, ["common", "projects"])
    const t = createTranslator(translations)
    const projectsData = t("projects.data") as Project[]
    const project = projectsData.find(p => p.slug === projectSlug)
    if(!project){
        notFound()
    }
    const index = projectsData.findIndex(p => p.name === project.name)
    const previousProject = index === 0 ? null : projectsData[index-1]
    const nextProject = index === projectsData.length ? null : projectsData[index+1]

    return (
        <div className="flex flex-col items-center">
            <HeaderProjects t={t}/>
            <main className="w-full px-4 md:px-8 2xl:px-12 max-w-[1440px] mt-10 md:mt-20">
                <section className="grid md:grid-cols-[1fr_400px] 2xl:grid-cols-[1fr_550px] gap-4 items-center">
                <div>
                    <Reveal delay={150}>
                        <h1 className="text-h2mobile md:text-[3rem] 2xl:text-h2desktop font-sora uppercase text-balance
                        mb-6 md:mb-9 2xl:mb-12">
                            Project - 
                            <span className="text-lightgreen-500"> {project.name}</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={300}>
                        <h2 className="text-pmobile md:text-h3desktop leading-[1.4]">{project.description}</h2>
                    </Reveal>
                    <Reveal delay={450}>
                        <ProjectLinks linkGithub={project.linkGithub} linkSite={project.linkSite}/>
                    </Reveal>
                </div>
                <Reveal delay={150}>
                    <Image
                        src={project.imageUrl} 
                        alt={project.imgAlt} 
                        className="w-full object-cover max-w-[550px] mx-auto aspect-3/2" 
                        width={1440} 
                        height={920}
                        loading="eager"
                    />
                </Reveal>
                </section>
                <ProjectSection 
                    headingText={t("common.projects.works")[0]} 
                    underlinedText={t("common.projects.works")[1]} 
                >
                    <TextSplitter text={project.functionality}/>
                </ProjectSection>
                <ProjectSection 
                    headingText={t("common.projects.technologies")[0]}  
                    underlinedText={t("common.projects.technologies")[1]} 
                >
                    {project.technologies.map((tech: string, index: number) => {
                        return (
                            <Reveal key={index} delay={index * 150}>
                                <p 
                                    className="text-small md:text-pdesktop px-5 py-2 md:px-7 md:py-3 bg-neutral-50 
                                    text-neutral-900 rounded-full shadow-sm uppercase"
                                >
                                    {tech}
                                </p>
                            </Reveal>
                        )
                    })}
                </ProjectSection>
                <ProjectSection 
                    headingText={t("common.projects.learned")[0]}  
                    underlinedText={t("common.projects.learned")[1]} 
                >
                    <TextSplitter text={project.whatILearned}/>
                </ProjectSection>
                <ProjectSection headingText={t("common.projects.continued")[0]}  underlinedText={t("common.projects.continued")[1]} >
                    <TextSplitter text={project.continuedDevelopment}/>
                </ProjectSection>
                <Reveal delay={150}>
                <div className="w-full max-w-250 my-8 md:my-24 flex max-sm:flex-wrap gap-4 md:gap-6">
                    {previousProject && (
                        <Link 
                            aria-label={t("common.projects.ariaPrev")}
                            href={`/projects/${previousProject.slug}`}
                            className="group w-full min-w-60 max-w-122 p-3 md:p-6 flex items-center gap-2 md:gap-4 text-small md:text-pdesktop 
                            hover:text-lightgreen-500 border border-neutral-50 hover:border-lightgreen-500"
                        >
                            <svg className="w-5 md:w-9 fill-neutral-50 group-hover:fill-lightgreen-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z"/>
                            </svg>
                            {previousProject.name}
                            
                        </Link>
                    )}
                    {nextProject && (
                        <Link 
                            aria-label={t("common.projects.ariaNext")}
                            href={`/projects/${nextProject.slug}`}
                            className="group w-full ml-auto min-w-60 max-w-122 p-3 md:p-6 flex items-center justify-end gap-2 md:gap-4 text-small md:text-pdesktop 
                            hover:text-lightgreen-500 border border-neutral-50 hover:border-lightgreen-500"
                        >                            
                            {nextProject.name}
                            <svg className="w-5 md:w-9 fill-neutral-50 group-hover:fill-lightgreen-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z"/>
                            </svg>
                        </Link>
                    )} 
                </div>
                </Reveal>
            </main>
        </div>
    )
}