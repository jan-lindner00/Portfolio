import Image from "next/image";

export default function SkillCard({name, imageSrc, imageAlt}:
    {name: string, imageSrc: string, imageAlt: string}
){
    return (
        <section className="relative flex flex-col gap-15 2xl:gap-5 h-[9rem] 2xl:h-[17.75rem] w-26 2xl:w-51
         bg-neutral-800 p-3 2xl:py-5 2xl:px-6 hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-[1px]">
            <h3 className="text-small 2xl:text-pdesktop uppercase">
                {name}
            </h3>
            <Image 
                src={imageSrc} 
                alt={imageAlt}
                className="w-9 2xl:w-17 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                width={128} 
                height={128}
             />
        </section>
    )
}