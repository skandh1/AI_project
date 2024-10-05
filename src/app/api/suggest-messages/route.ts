import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Define the expected structure for the request body
interface RequestData {
    body: string;
}

// Create an asynchronous function POST to handle POST request with parameters request and response
export async function POST(req: NextRequest) {
    try {
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it genAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

        // Initialize a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Retrieve the data received as part of the request body

        // Define a prompt variable
        const prompt =  "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();

        // Send the LLM output as a server response object
        return NextResponse.json({ output });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while generating content." }, { status: 500 });
    }
}
