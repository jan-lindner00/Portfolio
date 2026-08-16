import Image from "next/image";

export default function SpecializationCard({title, description, imageSrc, imageAlt, greenBackground = false}:
    {title: string, description: string, imageSrc: string, imageAlt: string, greenBackground?: boolean}
){
    return (
        <section className={`${greenBackground ? "bg-lightgreen-500 text-neutral-900" : "bg-neutral-800 text-neutral-50"}
        flex flex-col w-full max-w-[345px] 2xl:max-w-[426px] hover:scale-105 transition-all duration-300 ease-in-out 
        hover:-translate-y-[1px] h-[277px] 2xl:h-[427px] p-4 2xl:p-8`}>
            <Image src={imageSrc} alt={imageAlt} className="w-14 2xl:w-20" width={100} height={100} />
            <h3 className="text-h3mobile md:text-h3desktop 2xl:text-h3desktop font-regular uppercase
            mt-8 mb-3 2xl:mt-14 2xl:mb-5">
                {title}
            </h3>
            <p className="text-pmobile 2xl:text-pdesktop max-w-[214px] md:max-w-[325px] opacity-80">
                {description}
            </p>
        </section>  
    )
}