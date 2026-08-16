import { Fragment } from "react/jsx-runtime"

export default function TextSplitter({text}: {text: string}){
    return (
        <>
            {text.split("<br>").map(p => {
                return (
                    <Fragment key={p}>
                        <p className="text-small md:text-pdesktop opacity-80 font-inter max-w-250">{p}</p>
                        <br></br>
                    </Fragment>
                )
            })}
        </>
    )
}