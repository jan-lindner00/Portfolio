import Image from "next/image";
import Link from "next/link";
import ExternalLink from "@/public/images/external-link.svg"

export default function ProjectCard({ title,imageSrc, imageAlt, technologies, linkHref, t }: 
    { title: string, imageSrc: string, imageAlt: string, technologies: string[], linkHref: string,
        t: (key: string, params?: Record<string, string>) => string
     }
) {
    return (
        <section className="group flex flex-col hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-[1px]
         text-neutral-50 relative max-w-[345px] 2xl:max-w-[652px]">
            <h3 className="text-small md:text-h3desktop 2xl:text-[1.5rem] font-regular uppercase
            mb-1 md:mb-4 2xl:mb-6 text-center md:text-left">
                {title}
            </h3>
             
            <Image src={imageSrc} alt={imageAlt} className="group-hover:opacity-100 h-[300px] 2xl:h-[566px] opacity-50 aspect-[1.15]
            transition-opacity duration-300 ease-in-out object-cover"
            width={1440} height={928}
            />
            <div className="flex flex-wrap gap-3 2xl:gap-4 p-4 absolute bottom-5 left-5 2xl:bottom-8 2xl:left-8">
                {technologies.map((tech: string, index: number) => {
                    return (
                        <p className="text-small 2xl:text-pdesktop px-5 py-2 2xl:px-7 2xl:py-3 bg-neutral-50 text-neutral-900 
                            rounded-full shadow-sm uppercase"
                            key={index}
                        >
                            {tech}
                        </p>
                    )
                })}
            </div>
            <Link
            className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full z-1000" 
                href={linkHref}
                aria-label={t("home.projects.link-aria", {title: title})}
             />
             <div
                aria-hidden 
                className="p-2 2xl:p-4 rounded-full bg-neutral-50 w-fit 
                absolute bottom-65 2xl:bottom-115 right-5 2xl:right-8 hidden group-hover:block"
            >
                <Image className="w-6 2xl:w-10" src={ExternalLink} alt="" />
             </div>
        </section>
    )
}
