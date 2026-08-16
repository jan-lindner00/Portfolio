import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import type { Locale } from "@/app/i18n/config";
import type { Project } from "@/lib/types";


export default function Projects({lang, t}: 
    {lang: Locale, t: (key: string, params?: Record<string, string>) => any}
){
    const projects = t("projects.data") as Project[]
    return (
        <section id="projects" className="section mt-24 md:mt-38 2xl:mt-[calc(40rem/16)] 2xl:pt-[calc(156rem/16)]">
            <h2  className="text-center md:text-left text-h2mobile md:text-[3rem] 2xl:text-h2desktop font-sora uppercase text-balance
          mb-8 md:mb-11 2xl:mb-14">
            {t("home.projects.heading")[0]}
            <span className="text-lightgreen-500"> {t("home.projects.heading")[1]}</span>
          </h2>
          <div className="grid md:grid-cols-[repeat(2,_auto)] 2xl:grid-cols-2 gap-y-8 md:gap-y-12 md:gap-x-6 2xl:gap-y-24 justify-center">
            {projects.map((project, index) => {
                return (
                    <Reveal key={project.slug} delay={index * 150}>
                        <ProjectCard 
                            t={t}
                            title={project.name}
                            imageSrc={project.imageUrl}
                            imageAlt={project.imgAlt}
                            technologies={project.technologiesPreview}
                            linkHref={`/${lang}/projects/${project.slug}`}
                        />
                    </Reveal>
                )
            })}
          </div>
        </section>
    )
}