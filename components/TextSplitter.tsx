export default function TextSplitter({text}: {text: string}){
    return (
        <>
            {text.split("<br>").map(p => {
                return (
                    <div key={p}>
                        <p className="text-small md:text-pdesktop opacity-80 font-inter max-w-250">{p}</p>
                        <br className="block content-[''] mt-2 md:mt-[1.25rem]"></br>
                    </div>
                )
            })}
        </>
    )
}