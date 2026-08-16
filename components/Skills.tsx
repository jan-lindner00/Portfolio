import SpecializationCard from "@/components/SpecializationCard"
import {skills} from "@/lib/utils"
import SkillCard from "./SkillCard"
import type { Skills } from "@/lib/types"
import Reveal from "@/components/Reveal"

export default function Skills({t}: { t: (key: string, params?: Record<string, string>) => string}){
    return(
        <section id="skills" className="section mt-24 md:mt-38 2xl:mt-49">
            <h2 className="text-h2mobile md:text-[3rem] text-center 2xl:text-h2desktop font-sora uppercase mb-8 md:mb-10 2xl:mb-14">
                {t("home.skills.heading")[0]} <span className="text-lightgreen-500">{t("home.skills.heading")[1]}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-5 2xl:gap-[1.625rem]">
                <Reveal delay={150}>
                    <SpecializationCard 
                        title={t("home.skills.cardOne.title")}
                        description={t("home.skills.cardOne.description")}
                        imageSrc={"/images/backend-development.png"}
                        imageAlt=""
                    />
                </Reveal>
                <Reveal delay={300}>
                    <SpecializationCard 
                        title={t("home.skills.cardTwo.title")}
                        description={t("home.skills.cardTwo.description")}
                        imageSrc={"/images/web-development.svg"}
                        imageAlt=""
                        greenBackground={true}
                    />
                </Reveal>
                <Reveal delay={450}>
                    <SpecializationCard 
                        title={t("home.skills.cardThree.title")}
                        description={t("home.skills.cardThree.description")}      
                        imageSrc={`/images/database.svg`}
                        imageAlt=""
                    />
                </Reveal>
            </div>
            <h2 className="text-h2mobile md:text-[3rem] text-center 2xl:text-h2desktop font-sora uppercase mb-8 md:mb-10 2xl:mb-14 mt-24 md:mt-38 2xl:mt-49">
                {t("home.skills.headingTwo")[0]} <span className="text-lightgreen-500">{t("home.skills.headingTwo")[1]} </span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-5 2xl:gap-[1.625rem]">
                {skills.map((skill: Skills, index: number) => (
                    <Reveal key={index} delay={index * 150}>
                    <SkillCard
                            name={skill.name}
                            imageSrc={skill.imageSrc}
                            imageAlt={skill.imageAlt}
                        />
                    </Reveal>
                ))}
            </div>
        </section>
    )
}