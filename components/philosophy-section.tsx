"use client"

import { useEffect, useRef, useState } from "react"
import { Brain, Heart, Eye, Users } from "lucide-react"

const philosophyConcepts = [
    {
        icon: Brain,
        title: "Phương Pháp Elenchus",
        description: "Phương pháp thẩm vấn bác bỏ, cốt lõi của 'phương pháp Socratic', nhằm mục đích vạch ra sự mâu thuẫn trong niềm tin của người đối thoại.",
        details: "Socrates không trực tiếp giảng dạy câu trả lời. Thay vào đó, ông đặt câu hỏi liên tiếp để cho thấy sự thiếu hiểu biết của người khác, tin rằng việc nhận ra sự ngu dốt của chính mình là bước đầu tiên để đạt được trí tuệ.",
    },
    {
        icon: Heart,
        title: "Chủ nghĩa Trí tuệ Đạo đức",
        description: "Học thuyết cho rằng 'Đức hạnh là Tri thức' và do đó, 'Không ai cố ý làm điều sai trái'. Mọi hành vi xấu đều xuất phát từ sự thiếu hiểu biết.",
        details: "Đối với Socrates, nếu một người thực sự biết điều gì là tốt, họ sẽ tự động làm điều đó. Hành vi sai trái xảy ra khi người ta nhầm lẫn giữa cái tốt bề ngoài và cái tốt thực sự cho linh hồn của họ.",
    },
    {
        icon: Eye,
        title: "Sự Chăm Sóc Linh Hồn",
        description: 'Triết lý "Hãy biết chính mình" là lời kêu gọi con người ưu tiên việc chăm sóc cho linh hồn (psyche) hơn là của cải vật chất hay danh vọng.',
        details: "Socrates cho rằng nhiệm vụ quan trọng nhất của đời người là cải thiện và hoàn thiện linh hồn của mình thông qua việc trau dồi đức hạnh. Một linh hồn khỏe mạnh và có đạo đức là nguồn gốc của mọi điều tốt đẹp.",
    },
    {
        icon: Users,
        title: "Đức Hạnh là Hạnh Phúc",
        description: "Quan điểm cấp tiến rằng đức hạnh là điều kiện cần và đủ cho hạnh phúc (eudaimonia). Một người tốt không thể thực sự bị làm hại.",
        details: "Socrates tin rằng hạnh phúc đích thực không phụ thuộc vào các yếu tố bên ngoài như sức khỏe hay sự giàu có, mà hoàn toàn phụ thuộc vào trạng thái đạo đức của linh hồn. Vì vậy, theo đuổi đức hạnh cũng chính là theo đuổi hạnh phúc.",
    },
]

export default function PhilosophySection() {
    const [visibleCards, setVisibleCards] = useState<number[]>([])
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
                        // A staggered delay for the animation
                        setTimeout(() => {
                            setVisibleCards((prev) => [...prev, index].sort())
                        }, index * 150)
                    }
                })
            },
            { threshold: 0.2 },
        )

        const cards = sectionRef.current?.querySelectorAll(".philosophy-card")
        if (cards) {
            cards.forEach((card) => observer.observe(card))
        }

        return () => {
            if (cards) {
                cards.forEach((card) => observer.unobserve(card));
            }
        }
    }, [])

    return (
        <section id="triet-ly" ref={sectionRef} className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Triết Lý</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Những khái niệm triết học cốt lõi định hình tư tưởng phương Tây
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {philosophyConcepts.map((concept, index) => {
                        const Icon = concept.icon
                        return (
                            <div
                                key={index}
                                data-index={index}
                                className={`philosophy-card transition-all duration-500 ease-out ${
                                    visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            >
                                {/* Đã cập nhật lại style của thẻ để phù hợp với theme */}
                                <div className="bg-card border border-border rounded-xl p-8 h-full hover:scale-105 transition-transform duration-300 shadow-md">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                                            <Icon className="w-6 h-6 text-primary-foreground" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-semibold text-primary">{concept.title}</h3>
                                    </div>

                                    <p className="text-foreground mb-4 text-pretty">{concept.description}</p>

                                    <p className="text-muted-foreground text-sm text-pretty">{concept.details}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}