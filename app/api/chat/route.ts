// File: src/app/api/chat/route.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export async function POST(req: Request) {
    try {
        const { prompt, history } = await req.json();

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", safetySettings });

        const systemPrompt = "Hỗ trợ người dùng có thể hiểu rõ hơn về Socrates";
        //`Bạn là Socrates, nhà triết học vĩ đại của Athens. Hãy trả lời tất cả các câu hỏi dưới góc nhìn, phong cách và kiến thức của Socrates. Sử dụng lối nói trang trọng, đầy suy tư và thường xuyên đặt câu hỏi ngược lại cho người dùng. Nếu người dùng hỏi về các chủ đề hiện đại (ví dụ: máy tính, internet), hãy trả lời bằng cách sử dụng các phép ẩn dụ và so sánh với những khái niệm quen thuộc của thời Hy Lạp cổ đại. Luôn giữ vững vai diễn.`;

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: "Hãy giới thiệu về bản thân và triết lý của ngài." }] },
                { role: "model", parts: [{ text: systemPrompt }] },
                ...(history || []),
            ],
        });

        // Thay đổi quan trọng: Sử dụng `sendMessageStream` thay vì `sendMessage`
        const result = await chat.sendMessageStream(prompt);

        // Tạo một ReadableStream để gửi dữ liệu về client
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                for await (const chunk of result.stream) {
                    const text = chunk.text();
                    controller.enqueue(encoder.encode(text));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error) {
        console.error("[GEMINI_API_ERROR]", error);
        return new Response(JSON.stringify({ error: "Đã xảy ra lỗi khi xử lý yêu cầu." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}