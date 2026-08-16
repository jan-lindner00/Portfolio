import Reveal from "@/components/Reveal"

export default function ProjectSection({children, headingText, underlinedText=""}: 
    {children: React.ReactNode, headingText: string, underlinedText?: string}
){
    return (
        <Reveal delay={150}>
            <section className="mt-8 md:mt-24">
                <h3 className="text-h3mobile md:text-h3desktop md:text-[2rem] mb-8 md:mb-16 font-sora uppercase">
                    {headingText}
                    {underlinedText && (<span 
                        className="relative after:absolute after:content-[''] after:-bottom-1/4 after:-left-0 after:w-full after:h-1/5
                        after:bg-lightgreen-500"
                    > 
                    {` ${underlinedText}`}
                    </span>)}
                    
                </h3>
                <div className="flex flex-wrap gap-3 2xl:gap-4 justify-center md:justify-start">
                    {children}
                </div>
            </section>
        </Reveal>
    )
}