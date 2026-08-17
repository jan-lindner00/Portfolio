import Link from "next/link";

export default function ProjectLinks({linkSite, linkGithub, t}:
    {linkSite: string, linkGithub: string, t: (key: string, params?: Record<string, string>) => string}
){
    return(
        <div className="mt-8 md:mt-16 flex gap-4 md:gap-8 flex-wrap text-small md:text-pdesktop font-semibold">
            <Link 
                href={linkSite}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 py-2 md:py-4 px-4 md:px-8 rounded-full bg-lightgreen-500 text-neutral-900 hover:bg-neutral-900
                hover:text-lightgreen-500 hover:border hover:border-lightgreen-500 uppercase"
            >
                {t("common.projects.viewSite")}
                <svg className="w-4 md:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 group-hover:stroke-lightgreen-500"/>
                </g>
                </svg>
            </Link>
            <Link 
                href={linkGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 py-2 md:py-4 px-4 md:px-8 rounded-full bg-neutral-900 text-neutral-50
                hover:text-lightgreen-500 border border-neutral-50 hover:border-lightgreen-500 uppercase"
            >
                {t("common.projects.viewSite")}
                <svg className="w-4 md:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-50 group-hover:stroke-lightgreen-500"/>
                </g>
                </svg>
            </Link>
        </div>
    )
}