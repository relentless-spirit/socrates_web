"use client"

import { useEffect, useRef, useState } from "react"
import { Search, GraduationCap, Scale, Heart } from "lucide-react" // <-- Nhớ cập nhật dòng này

const applications = [
    {
        icon: GraduationCap,
        title: "Trong Giáo Dục & Học Tập (Góc nhìn học sinh)",
        description: "Chủ động biến lớp học thành một cuộc đối thoại, nơi học sinh là người tìm kiếm tri thức thay vì chỉ tiếp nhận một cách thụ động.",
        examples: [
            {
                method: "Chất vấn bài giảng",
                detail: "Thay vì chỉ ghi chép, học sinh tự đặt câu hỏi ngay trong lúc nghe giảng: 'Tại sao lại có kết luận này?', 'Giả định ngầm ở đây là gì?', 'Có ví dụ nào phản bác lại luận điểm này không?' và chủ động hỏi giáo viên."
            },
            {
                method: "Học tập dựa trên khám phá",
                detail: "Sử dụng những thắc mắc từ bài giảng làm điểm xuất phát để tự tìm hiểu sâu hơn sau giờ học. Sau đó, mang những kiến thức mới hoặc câu hỏi sâu sắc hơn quay trở lại thảo luận với giáo viên và bạn bè."
            },
        ],
    },
    {
        icon: Scale,
        title: "Trong Pháp Luật & Tranh Tụng",
        description: "Sử dụng kỹ thuật thẩm vấn chéo và phân tích logic để tìm ra sự thật và vạch trần các mâu thuẫn.",
        examples: [
            {
                method: "Thẩm vấn chéo kiểu Socratic",
                detail: "Luật sư đặt một chuỗi câu hỏi ngắn, có vẻ vô hại để dẫn dắt nhân chứng tự tiết lộ những điểm không nhất quán trong lời khai của họ, thay vì đối đầu trực tiếp."
            },
            {
                method: "Phân tích tiền lệ pháp",
                detail: "Luật sư kiểm tra một lập luận pháp lý bằng cách áp dụng nó vào các tình huống giả định khác nhau để xem liệu nó có dẫn đến kết quả vô lý hay mâu thuẫn hay không, tương tự cách Socrates kiểm tra một định nghĩa."
            },
        ],
    },
    {
        icon: Search, // <-- Thay thế Briefcase
        title: "Trong Tự Học & Nghiên Cứu",
        description: "Áp dụng phương pháp Socratic cho chính mình để biến việc tiêu thụ thông tin thành một quá trình khám phá và xây dựng kiến thức sâu sắc.",
        examples: [
            {
                method: "Đối thoại với tài liệu",
                detail: "Sau khi học từ một nguồn (video, AI, sách), hãy tóm tắt ý chính thành một 'niềm tin', sau đó tự mình tấn công niềm tin đó bằng các câu hỏi làm rõ, tìm bằng chứng, và xem xét các góc nhìn trái chiều."
            },
            {
                method: "Dùng sự bối rối làm la bàn",
                detail: "Khi các câu hỏi khiến bạn nhận ra sự thiếu sót trong hiểu biết của mình, hãy biến chính những câu hỏi đó thành từ khóa để tìm kiếm thông tin sâu hơn, đa chiều hơn, giúp xây dựng một kiến thức thực sự vững chắc."
            },
        ],
    },
    {
        icon: Heart,
        title: "Trong Tâm Lý Học & Phát Triển Cá Nhân",
        description: "Giúp cá nhân tự nhận thức và thay đổi những niềm tin cốt lõi gây cản trở thông qua liệu pháp đối thoại.",
        examples: [
            {
                method: "Đối thoại Socratic trong liệu pháp CBT",
                detail: "Nhà trị liệu giúp thân chủ kiểm tra những suy nghĩ tiêu cực tự động của họ bằng các câu hỏi như: 'Bằng chứng nào ủng hộ suy nghĩ này?', 'Mặt trái của việc tin vào điều này là gì?', 'Có cách diễn giải nào khác cho tình huống này không?'."
            },
            {
                method: "Tự phản tỉnh có cấu trúc",
                detail: "Tự đặt cho mình những câu hỏi Socratic để hiểu rõ bản thân: 'Niềm tin cốt lõi nào đang định hướng hành động của mình?', 'Hành động này có thực sự phù hợp với giá trị mà mình theo đuổi không?'."
            },
        ],
    },
]

export default function ApplicationsSection() {
    const [visibleCards, setVisibleCards] = useState<number[]>([])
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
                        setTimeout(() => {
                            setVisibleCards((prev) => [...prev, index].sort())
                        }, index * 150)
                    }
                })
            },
            { threshold: 0.2 },
        )

        const cards = sectionRef.current?.querySelectorAll(".application-card")
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
        // Thay đổi 1: Dùng nền `bg-card` cho section
        <section id="ung-dung" ref={sectionRef} className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Ứng Dụng Triết Lý</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Cách triết lý Socrates được áp dụng trong cuộc sống hiện đại
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {applications.map((app, index) => {
                        const Icon = app.icon
                        return (
                            <div
                                key={index}
                                data-index={index}
                                className={`application-card transition-all duration-500 ease-out ${
                                    visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            >
                                {/* Thay đổi 2: Áp dụng style thẻ nhất quán, dùng nền `bg-background` */}
                                <div className="bg-background border border-border rounded-xl p-8 h-full hover:scale-105 transition-transform duration-300 shadow-md">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                                            {/* `bg-accent` được đổi thành `bg-primary` cho nhất quán, dù màu là như nhau */}
                                            <Icon className="w-6 h-6 text-primary-foreground" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-semibold text-primary">{app.title}</h3>
                                    </div>

                                    <p className="text-foreground mb-6 text-pretty">{app.description}</p>

                                    <ul className="space-y-4">
                                        {app.examples.map((example, exampleIndex) => (
                                            <li key={exampleIndex}>
                                                <p className="font-semibold text-foreground text-sm mb-1">{example.method}:</p>
                                                <p className="text-muted-foreground text-sm text-pretty">{example.detail}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}