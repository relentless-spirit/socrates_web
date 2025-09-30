"use client"

import { useEffect, useRef, useState } from "react"

const timelineEvents = [
    {
        year: "k. 470/469 TCN",
        title: "Chào đời tại Athens",
        description: "Socrates sinh ra tại Alopece, một quận của Athens. Cha ông là Sophroniscus, một nhà điêu khắc, và mẹ ông là Phaenarete, một bà đỡ. Nghề nghiệp của mẹ ông sau này được dùng làm hình ảnh ẩn dụ cho phương pháp triết học của ông.",
    },
    {
        year: "k. 450 - 430 TCN",
        title: "Thời niên thiếu và Nghĩa vụ quân sự",
        description: "Socrates được giáo dục như mọi công dân Athens khác. Ông đã tham gia tích cực vào nghĩa vụ quân sự, chiến đấu dũng cảm trong các trận đánh quan trọng của cuộc chiến Peloponnesian như Potidaea, Delium và Amphropolis.",
    },
    {
        year: "k. 430 TCN",
        title: "Lời sấm truyền từ đền Delphi",
        description: "Người bạn của Socrates, Chaerephon, đã hỏi nhà tiên tri ở đền Delphi rằng liệu có ai khôn ngoan hơn Socrates không. Lời đáp là 'không'. Sự kiện này đã thúc đẩy Socrates bắt đầu hành trình kiểm chứng lời sấm, đi khắp Athens để đối thoại và tìm kiếm người khôn ngoan.",
    },
    {
        year: "k. 430 - 400 TCN",
        title: "Hoạt động triết học tại Agora",
        description: "Socrates trở thành một nhân vật quen thuộc tại Agora (khu chợ và trung tâm công cộng của Athens). Ông dành thời gian đối thoại với mọi tầng lớp xã hội, phát triển và hoàn thiện phương pháp 'elenchus' (kiểm chứng và bác bỏ) hay còn gọi là phương pháp Socratic.",
    },
    {
        year: "423 TCN",
        title: "Bị chế giễu trong kịch 'The Clouds'",
        description: "Nhà soạn hài kịch Aristophanes đã mang hình ảnh Socrates lên sân khấu trong vở kịch 'The Clouds', châm biếm ông như một Sophist lập dị, chuyên dạy những lý luận ngụy biện. Vở kịch này đã góp phần định hình một hình ảnh tiêu cực về ông trong mắt công chúng.",
    },
    {
        year: "404 - 403 TCN",
        title: "Đối mặt với Bạo chúa",
        description: "Sau khi Athens thất bại trong cuộc chiến, phe Ba Mươi Bạo Chúa lên nắm quyền. Họ ra lệnh cho Socrates bắt giữ một người vô tội tên là Leon xứ Salamis, nhưng ông đã từ chối, bất chấp nguy hiểm đến tính mạng. Đây là minh chứng cho sự kiên định về đạo đức của ông.",
    },
    {
        year: "399 TCN",
        title: "Phiên tòa và Bản án tử hình",
        description: "Socrates bị ba công dân (Meletus, Anytus, và Lycon) kiện với hai tội danh chính: không tin vào các vị thần của thành bang (asebeia) và làm hư hỏng giới trẻ. Sau bài tự biện hộ nổi tiếng, ông bị kết tội và nhận bản án tử hình bằng cách uống độc dược hemlock.",
    },
    {
        year: "399 TCN",
        title: "Những ngày cuối cùng và cái chết",
        description: "Bạn bè và học trò đã sắp xếp một cuộc vượt ngục cho Socrates, nhưng ông từ chối. Ông cho rằng một công dân phải tuân thủ luật pháp của thành bang, ngay cả khi bản án bất công. Ông bình thản uống thuốc độc và qua đời, để lại một di sản triết học bất tử.",
    },
];


export default function BiographySection() {
    const [visibleItems, setVisibleItems] = useState<number[]>([])
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
                        setVisibleItems((prev) => {
                            if (prev.includes(index)) return prev
                            return [...prev, index].sort()
                        })
                    }
                })
            },
            { threshold: 0.2 }, // Giảm threshold một chút để animation mượt hơn với nội dung dài
        )

        const items = sectionRef.current?.querySelectorAll(".timeline-item")
        if (items) {
            items.forEach((item) => observer.observe(item))
        }

        return () => {
            if (items) {
                items.forEach((item) => observer.unobserve(item))
            }
        }
    }, [])

    return (
        <section id="tieu-su" ref={sectionRef} className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Tiểu Sử</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Hành trình cuộc đời của nhà triết học vĩ đại nhất thời cổ đại
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-border" />

                        {timelineEvents.map((event, index) => (
                            <div
                                key={index}
                                data-index={index}
                                // Thay đổi ở đây: items-center -> items-start
                                className={`timeline-item relative flex items-start mb-12 transition-all duration-700 ease-out ${
                                    visibleItems.includes(index)
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-foreground rounded-full border-4 border-primary shadow-lg z-10 mt-1" />

                                <div
                                    className={`ml-16 md:ml-0 md:w-5/12 ${
                                        index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                                    }`}
                                >
                                    <div className="rounded-xl p-6 bg-background border border-border shadow-md">
                                        <div className="text-foreground font-bold text-lg mb-2">{event.year}</div>
                                        <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                                            {event.title}
                                        </h3>
                                        <p className="text-muted-foreground text-pretty">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}