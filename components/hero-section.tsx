"use client"

import { useEffect, useState } from "react"
import Image from "next/image" // Import component Image của Next.js

export default function HeroSection() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 marble-texture"
                style={{
                    transform: `translateY(${scrollY * 0.5}px)`,
                }}
            />

            {/* Greek Pattern Overlay */}
            <div className="absolute inset-0 greek-pattern opacity-30" />

            {/* Content Container (Center Aligned) */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full"> {/* Tăng max-w lên 6xl */}
                {/* Main Content Area - Split into two columns on large screens */}
                <div className="glass rounded-3xl p-8 md:p-12 marble-texture flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

                    {/* Image Column */}
                    <div className="md:w-1/2 flex justify-center items-center order-first md:order-none"> {/* Order-first trên mobile */}
                        {/* Đây là nơi bạn sẽ thêm ảnh của Socrates.
                Sử dụng component Image của Next.js để tối ưu hóa ảnh.
                Hãy thay thế 'socrates.png' bằng đường dẫn thực tế đến ảnh của bạn.
                Đảm bảo ảnh có tỷ lệ khung hình tốt (ví dụ: hình vuông hoặc chân dung)
                để nó hiển thị đẹp trong container.
            */}
                        <div className="relative w-full max-w-sm h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/50">
                            <Image
                                src="/Socrates.png"
                                alt="Chân dung triết gia Socrates"
                                layout="fill"
                                objectFit="cover"
                                // className="hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                        </div>
                    </div>

                    {/* Text Content Column */}
                    <div className="md:w-1/2 text-left md:text-left"> {/* Căn lề trái cho nội dung chữ */}
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-4 text-balance">Socrates</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty">
                            Nhà Triết Học Vĩ Đại của Hy Lạp Cổ Đại
                        </p>
                        <p className="text-lg md:text-xl text-foreground/80 text-pretty mb-8">
                            "Tôi chỉ biết một điều, đó là tôi không biết gì cả" - Khám phá cuộc đời và triết lý của người thầy vĩ đại
                            nhất trong lịch sử triết học phương Tây.
                        </p>

                        {/* Classical Column Decoration */}
                        <div className="flex justify-start md:justify-start mt-8 space-x-6 opacity-70">
                            <div className="w-2 h-14 bg-gradient-to-b from-accent to-primary rounded-full" />
                            <div className="w-2 h-18 bg-gradient-to-b from-primary to-accent rounded-full" />
                            <div className="w-2 h-14 bg-gradient-to-b from-accent to-primary rounded-full" />
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    )
}