import Link from "next/link"
import clsx from "clsx"

export default function NavLink({href, className, children}:
    {href: string, className?: string, children: React.ReactNode}
){
    const clasName = clsx(
        className && className, 
        "font-inherit uppercase hover:text-lightgreen-500 hover:translate-x-[1px] hover:-translate-y-[1px]"
    )
     return (
        <Link 
            className={clasName}
            href={href}
        >
            {children}
        </Link>
     )
}