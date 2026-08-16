import { NextRequest, NextResponse } from "next/server";
import type { ContactRequestBody } from "@/lib/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest){
  try {
        const body: ContactRequestBody = await request.json();

        if(!process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL){
            return Response.json({ error: "Server Error: Something went wrong." }, { status: 500 });
        }

        const {data, error} = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL,
            to: process.env.CONTACT_TO_EMAIL,
            subject: body.subject,
            text: `Hello Jan,
            I am ${body.name} and my email adress is ${body.email}.\n 
            ${body.message}`
        })

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    }catch(error){
        const errorMsg = typeof error === "string" ? error : error instanceof Error ? error.message : "Unknown error"
        console.log(errorMsg)
        return NextResponse.json(
            {error: errorMsg},
            {status: 500}
        )
    }
}