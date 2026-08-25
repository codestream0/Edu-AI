"use client"

import { SuggestedPrompts } from "@/components/ai-tutor/suggestedPrompt";
import { TutorInput } from "@/components/ai-tutor/tutorInput";
import { TutorMessages } from "@/components/ai-tutor/tutorMessages";
import { Sparkles } from "lucide-react";

const AITutorPage = () => {
    const handleSend = (message: string) => {
        console.log("Message:", message);

        // send message to your AI backend
    };

    const handlePromptClick = (prompt: string) => {
        console.log("Selected prompt:", prompt);

        // put prompt inside TutorInput
    };
    return(
        <div className="flex min-h-[calc(100vh-140px)] flex-col rounded-2xl border bg-white dark:bg-slate-950">

            <div className="border-b p-5">
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    {/* ✨ */}
                    <Sparkles/>
                </div>

                <div>
                    <h1 className="font-semibold">AI Tutor</h1>
                    <p className="text-sm text-slate-500">
                    Your personalized learning assistant
                    </p>
                </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <TutorMessages/>
            </div>

            <div className="px-6 pb-4">
                <SuggestedPrompts onPromptClick={handlePromptClick} />
            </div>


            <div className="border-t p-4">
                <TutorInput onSend={handleSend} />
            </div>

        </div>
    )
}

export default AITutorPage;