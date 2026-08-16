import Link from "next/link";
import Logo from "./Logo";

export default function HeaderProjects({t}: {t: (key: string, params?: Record<string, string>) => string}){
    return(
        <header className="w-full max-w-[1440px] flex items-center justify-between bg-neutral-900 p-4 md:p-[3.475rem]">
            <Logo className="w-7 md:w-15 fill-lightgreen-500"/>
            <Link 
                href="/"
                scroll={false}
                className="text-[.875rem] md:text-[1.125rem] text-medium py-1 md:py-3 px-4 md:px-7 border border-neutral-50 
                hover:text-lightgreen-500 hover:border-lightgreen-500 
                transition-all duration-300 ease-in-out rounded-full uppercase hover:translate-x-[1px] hover:-translate-y-[1px]"
                >
                    {t("common.header.homepage")}
            </Link>
        </header>
    )
}