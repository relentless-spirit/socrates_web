"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const quotes = [
    {
        text: "Điều duy nhất tôi biết, là tôi không biết gì cả.",
        context: "Ghi lại trong tác phẩm 'Apology' của Plato, câu nói này là tuyên ngôn về sự khiêm tốn trí tuệ. Trí tuệ của Socrates không nằm ở việc sở hữu kiến thức, mà ở việc nhận thức rõ ràng giới hạn hiểu biết của chính mình.",
    },
    {
        text: "Một cuộc đời không được xem xét thì không đáng sống.",
        context: "Đây là lời biện hộ nổi tiếng của Socrates tại phiên tòa. Ông cho rằng mục đích cao cả nhất của con người là tự vấn, tự phản tỉnh và không ngừng kiểm tra các niềm tin của mình để chăm sóc cho linh hồn.",
    },
    {
        text: "Hãy biết chính mình.",
        context: "Dù là một câu ngạn ngữ được khắc ở đền Delphi, Socrates đã biến nó thành nền tảng triết học của mình. Với ông, việc hiểu rõ bản thân là điểm khởi đầu cho mọi hành trình tìm kiếm tri thức và đức hạnh.",
    },
    {
        text: "Tôi không thể dạy ai bất cứ điều gì; tôi chỉ có thể khiến họ suy nghĩ.",
        context: "Câu nói này thể hiện bản chất của phương pháp Socratic. Ông không phải là người truyền đạt thông tin, mà là người khơi gợi, kích thích tư duy để người khác tự tìm thấy chân lý bên trong chính họ, như một 'bà đỡ cho tâm trí'.",
    },
    {
        text: "Chăm sóc cho linh hồn của bạn hơn là của cải vật chất.",
        context: "Một chủ đề xuyên suốt triết lý của Socrates. Ông tin rằng sự giàu có thực sự không đến từ tiền bạc hay danh vọng, mà đến từ một linh hồn được trau dồi bởi đức hạnh, công lý và sự thật.",
    },
    {
        text: "Sự khôn ngoan bắt đầu từ sự ngạc nhiên.",
        context: "Trích từ Plato, câu nói này nhấn mạnh rằng động lực của triết học và sự học hỏi chính là khả năng cảm thấy kinh ngạc, tò mò trước thế giới. Khi ta ngừng cho rằng mình đã biết mọi thứ, ta mới bắt đầu học hỏi thực sự.",
    },
];

export default function QuotesSection() {
    const [currentQuote, setCurrentQuote] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const nextQuote = () => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsAutoPlaying(false)
    }

    const prevQuote = () => {
        setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)
        setIsAutoPlaying(false)
    }

    return (
        <section id="trich-dan" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Trích Dẫn Nổi Bật</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Những lời dạy bất hủ vẫn còn nguyên giá trị đến ngày hôm nay
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Thay đổi 1: Áp dụng style thẻ nhất quán */}
                    <div className="relative bg-card border border-border rounded-xl p-8 md:p-12 shadow-lg">
                        {/* Thay đổi 2: Chỉnh lại màu icon cho tinh tế hơn */}
                        <Quote className="absolute top-6 left-6 w-10 h-10 text-border" />

                        <div className="text-center min-h-[200px] flex flex-col justify-center">
                            <blockquote className="text-2xl md:text-3xl font-serif text-primary mb-6 text-balance">
                                "{quotes[currentQuote].text}"
                            </blockquote>

                            <p className="text-muted-foreground text-lg text-pretty max-w-2xl mx-auto">
                                {quotes[currentQuote].context}
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8">
                            <Button variant="ghost" size="icon" onClick={prevQuote} className="text-primary hover:bg-primary/10">
                                <ChevronLeft className="w-6 h-6" />
                            </Button>

                            {/* Dots Indicator */}
                            <div className="flex space-x-2">
                                {quotes.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentQuote(index)
                                            setIsAutoPlaying(false)
                                        }}
                                        // Thay đổi 3: Chỉnh lại màu cho dots
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentQuote
                                                ? "bg-primary scale-125"
                                                : "bg-border hover:bg-primary/50"
                                        }`}
                                    />
                                ))}
                            </div>

                            <Button variant="ghost" size="icon" onClick={nextQuote} className="text-primary hover:bg-primary/10">
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}