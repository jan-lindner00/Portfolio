import Image from "next/image"
import Me from "@/public/images/me.png"
import Link from "next/link"
import GoToProject from "@/public/images/gotoproject.svg"
import Counter from "@/components/Counter"
import TextWrite from "@/components/TextWrite"
import Reveal from "./Reveal"

export default async function Home({t}: {t: (key: string, params?: Record<string, string>) => string}){
    
    const lines = [t("home.hero.introductionLines")[0], 
    "Jan Niklas", "Lindner", 
    t("home.hero.introductionLines")[1], t("home.hero.introductionLines")[2]]

    return (
        <div>
            <section id="home" className="section grid gap-[3.475rem] pt-19 2xl:pt-44 md:grid-cols-[1fr_380px]
                2xl:grid-cols-[1fr_480px] md:items-end">
                <TextWrite 
                    lines={lines} 
                    speed={0.03}
                    className={"text-h1mobile md:text-[3.5rem] 2xl:text-hldesktop font-sora uppercase"} 
                />
                <section className="relative">
                    <Reveal delay={150}>
                    <Image 
                     src={Me} 
                     alt={t("home.hero.imgAlt")}
                     className="block w-[250px] h-[289px] md:w-[320px] md:h-[370px] 2xl:w-[387px] 2xl:h-[446px] ml-auto"
                     />
                     </Reveal>
                     <Reveal delay={450}>
                    <p className="text-small md:text-pmobile 2xl:text-pdesktop text-right mt-24 2xl:mt-30 opacity-80">
                        {t("home.hero.paragraph")[0]}<br></br>
                        {t("home.hero.paragraph")[1]}<br></br>
                        {t("home.hero.paragraph")[2]}
                    </p>
                    </Reveal>
                    <Reveal delay={300}>
                    <Link
                        href="#projects"
                        className="inline-block p-2 bg-lightgreen-500 rounded-full w-fit h-fit
                        absolute right-[178px] bottom-[73px] md:bottom-[68px] md:right-[230px] 2xl:bottom-[100px] 2xl:right-[291px]"
                    >
                        <Image 
                            className="w-31 md:w-36 2xl:w-42"
                            src={GoToProject} 
                            alt={t("home.hero.linkImgAlt")}
                         />
                    </Link>
                    </Reveal>
                </section>
            </section>
            <section className="flex flex-col lg:flex-row gap-8 lg:gap-24 2xl:gap-[9.25rem] mt-14 2xl:mt-35">
                <p className="leading-[1.25rem] 2xl:leading-[1.2] 2xl:text-[1.25rem] flex items-center gap-6 md:gap-14">
                    <span className="text-lightgreen-500 text-stats-mobile 2xl:text-stats-desktop font-sora">
                        {t("home.hero.apprentice")[0]}
                    </span>
                    {t("home.hero.apprentice")[1]}
                    <br></br>
                    {t("home.hero.apprentice")[2]}
                </p>
                <p className="leading-[1.25rem] 2xl:leading-[1.2] 2xl:text-[1.25rem] flex items-center gap-6 md:gap-10 2xl:gap-14">
                    <span className="text-lightgreen-500 text-stats-mobile 2xl:text-stats-desktop font-sora">
                        <Counter/>+
                    </span>
                    {t("home.hero.courses")[0]}
                    <br></br>
                    {t("home.hero.courses")[1]}
                </p>
            </section>
        </div>
    )
}