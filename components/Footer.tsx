import Link from "next/link";
import { LanguagePicker } from "./LanguagePicker";
import type { Locale } from "@/app/i18n/config";

export default function Footer({lang, t}: 
  {lang: Locale, t: (key: string, params?: Record<string, string>) => string}) {
    const tPicker = t("common.footer.chooseLang")
    return (
    <footer className={`w-full px-4 md:px-8 2xl:px-12 max-w-[1440px] text-small md:text-pdesktop pb-8 md:pb-15 mx-auto`}>
      <Link 
        className="inline-block w-full text-center text-small md:text-left md:text-pdesktop opactity-80 mb-5 md:mb-8"
        aria-label={t("common.footer.emailAria")}
        href="mailto:mail.jan.lindner@gmail.com"
      >
        mail.jan.lindner@gmail.com
      </Link>
      <div className="border-t border-[#ffffff80] pt-5 md:pt-9 flex justify-between gap-3">
        <div className="flex flex-col md:items-center md:flex-row gap-4 md:gap-10">
        <LanguagePicker currentLocale={lang} t={tPicker}/>
          <nav className="text-lightgreen-500">
            <Link 
              className="py-1 pr-5 md:pr-8 border-r border-[#ffffff80]"
              href="https://www.linkedin.com/in/jan-niklas-lindner-705655425/"
              aria-label={`${t("common.footer.visit")} Linkedin`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </Link>
            <Link
              className="py-1 pl-5 md:pl-8" 
              href="https://github.com/jan-lindner00/"
              aria-label={`${t("common.footer.visit")} Github`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
          </nav>
        </div>
        <small className="text-small md:text-pdesktop max-w-26 md:max-w-105">
          © Jan N. Lindner. {t("common.footer.cpr")}
        </small>
      </div>
    </footer>
  );
}
