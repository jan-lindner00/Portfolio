import Image from "next/image";
import Link from "next/link";
import SRHLogo from "@/public/images/srh-bildung.svg"
import ScrimbaLogo from "@/public/images/scrimba.png"
import FadeIn from "./FadeIn";
import Reveal from "./Reveal";

export default function Experience({t}: {t: (key: string, params?: Record<string, string>) => string}){
  return(
    <section id="experience" className="section mt-24 md:mt-38 2xl:mt-[calc(40rem/16)] 2xl:pt-[calc(156rem/16)]">
      <section className="text-center">
        <FadeIn delay={150}>
          <h2  className="text-h2mobile md:text-[3rem] 2xl:text-h2desktop font-sora uppercase text-balance
          mb-3 md:mb-5 2xl:mb-6">
            {t("home.experience.quote")[0]} 
            <span className="text-lightgreen-500"> {t("home.experience.quote")[1]}</span>
          </h2>
          <span className="text-small md:text-[1.25rem] leading-[1.2] opacity-80 font-inter
          before:content-[''] before:absolute before:top-1/2 before:-left-[1.25rem] before:w-[.75rem] before:h-[1px] 
          before:bg-[rgba(255,255,255,0.8)] relative">
            Albert Einstein
          </span>
        </FadeIn>
        <FadeIn delay={300}>
          <p className="text-pmobile md:text-pdesktop mt-6 opacity-80 max-w-[820px] mx-auto text-center">
            {t("home.experience.aboutMe")}
          </p>
        </FadeIn>
      </section>
      
      <section className="mt-14 md:mt-20 2xl:mt-30">
        <h3 className="text-center md:text-left mb-8 md:mb-10 2xl:mb-14 text-[1.25rem] md:text-[2rem] 2xl:text-[3rem] leading-font-sora font-bold uppercase">
          {t("home.experience.education")}
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal delay={150}>
            <section className="flex flex-col md:flex-row gap-5 md:gap-10 2xl:gap-24 text-center">
              <h4 className="text-pmobile 2xl:text-[1.25rem] 2xl:leading-[1.2] font-bold uppercase text-lightgreen-500">
                2025 - {t("home.experience.present")}
              </h4>
              <div className="pb-8 md:pb-0 border-b md:border-b-0 md:border-r md:pr-24 border-[rgba(255,255,255,0.8)]">
                <p className="text-pmobile 2xl:text-[1.25rem] 2xl:leading-[1.2] mb-1 md:mb-2 opacity-80">
                  {t("home.experience.apprentice")[0]}<br></br> {t("home.experience.apprentice")[1]}
                </p>
                <p className="text-pmobile 2xl:text-pdesktop mb-3 leading-[2] opacity-80">SRH Neckargemünd</p>
                <Link href="https://www.srh-bbw-neckargemuend.de/" target="_blank" rel="noopener noreferrer"
                  aria-label="SRH Neckargemünd Website"
                >
                  <Image alt="SRH Neckargemünd Logo" src={SRHLogo} className="w-16 mx-auto"/>
                </Link>
              </div>
            </section>
          </Reveal>
          <Reveal delay={300}>
            <section className="flex flex-col md:flex-row gap-5 md:gap-10 2xl:gap-24 text-center">
              <h4 className="text-pmobile 2xl:text-[1.25rem] 2xl:leading-[1.2] font-bold uppercase text-lightgreen-500">
                2025 - {t("home.experience.present")}
              </h4>
              <div>
                <p className="text-pmobile 2xl:text-[1.25rem] 2xl:leading-[1.2] mb-1 md:mb-2 opacity-80">
                  Scrimba Student<br></br> {t("home.experience.onlineCourses")}
                </p>
                <p className="text-pmobile 2xl:text-pdesktop mb-3 leading-[2] opacity-80">Scrimba Plattform</p>
                <Link href="https://scrimba.com" target="_blank" rel="noopener noreferrer"
                  aria-label="Scrimba Website">
                  <Image alt="Scrimba Logo" src={ScrimbaLogo} className="w-16 mx-auto rounded-[.25rem]"/>
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </section>
    </section>
  )
}
