import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase/supabaseClient";
import { Mistral } from "@mistralai/mistralai";
import { MatchObj } from "@/lib/types";
import {z} from "zod"

const contentSchema = z.object({
    content: z.string()
})

type Content = z.infer<typeof contentSchema>

const mistral = new Mistral({ apiKey: process.env.NEXT_MISTRAL_API_KEY })

export async function POST(req: NextRequest){
    try{
        const body = await req.json()
        if(!body){
            return NextResponse.json({error: "Error 400 - Invalid form data"}, {status: 400})
        }
        const messages = [...body.messages]
        const language = body.lang
        const embeddingsBatchResponse = await mistral.embeddings.create({
            model: "mistral-embed",
            inputs: [body.newUserMessage],
        })

        const embedding = embeddingsBatchResponse?.data[0]?.embedding
        if(!embedding){
            return NextResponse.json({error: "Mistral-embed didn't return an embedding."}, {status: 500})
        }

        const {data, error} = await supabase.rpc(`${language === "de" ? "match_portfolio_de" : "match_portfolio_en"}`, {
            query_embedding: embedding,
            match_threshold: 0.5,
            match_count: 4
        })

        if(error){
            return NextResponse.json(error, {status: 500})
        }
        const match = data.map((obj: MatchObj) => obj.content).join("\n")
        
        messages.push({
            role: "user",
            content: `Context: ${match || ""} Question: ${body.newUserMessage}`
        })

        const result = await mistral.chat.parse({
            model: "mistral-medium-latest",
            messages: [
                {
                    role: "system",
                    content: `You're name is Tom. You are a colleague of Jan Niklas Lindner, who is an aspiring software developer from Germany. You know almost everything about Jan Niklas and his projects.
                    You will be given two pieces of information - some context about Jan Niklas and a question about him and his projects.The context is about where he lives, what he does or his projects, for which he did not use AI. 
                    Don't say he used AI for his projects.
                    Your main job is to formulate a short answer to the question using the provided context.
                    If the answer is not given in the context, find the answer in the conversation history if possible. If you are unsure and cannot find the answer, say, that you don't know the answer. 
                    In this case, ask if the user wants to know something else about Jan Niklas or his projects instead. Please do not make up the answer. Always speak as if you were chatting to a friend. Please answer in 
                    ${language === "de" ? "German" : "English"} language.`
                },
                {
                    role: "user",
                    content: "Context: He is based in Heidelberg, Germany. Question: Where does he live?"
                },
                {
                    role: "assistant",
                    content: "Jan Niklas currently lives in Heidelberg, Germany."
                },
                {
                    role: "user",
                    content: "Context: The project was built with Next.js and TypeScript. Question: What tech stack did he use for this project?"
                },
                {
                    role: "assistant",
                    content: `He used the following technologies for his project <project-name>: Next.js, TypeScript.`
                },
                ...messages
            ],
            responseFormat: contentSchema,
            temperature: 0.75,
            frequencyPenalty: 0.5
        })
        if (!result.choices || result.choices.length === 0) {
            throw new Error("No choices returned from Mistral API");
        }
        const message = result?.choices[0]?.message
        if(!message){
            return NextResponse.json({error: "Mistral chat completions didn't return a message."}, {status: 500})
        }
        return NextResponse.json({role: message.role, content: contentSchema.parse(message.parsed)?.content})

    }catch(error){
        const errorMsg = typeof error === "string" ? error : error instanceof Error ? error.message : "Unknown error"
        console.log(errorMsg)
        return NextResponse.json(
            {error: errorMsg},
            {status: 500}
        )
    }
}