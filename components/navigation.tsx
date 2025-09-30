"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
    Menu, X,
    ScrollText, BrainCircuit, Milestone, Quote, Component, BadgeHelp
} from "lucide-react" // 1. Đã xóa Moon, Sun khỏi danh sách import
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme() // Vẫn giữ lại nếu bạn có thể cần dùng sau này

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // 2. Đã xóa hàm toggleDarkMode không cần thiết

    const navItems = [
        { href: "#tieu-su", label: "Tiểu sử", icon: ScrollText },
        { href: "#triet-ly", label: "Triết lý", icon: BrainCircuit },
        { href: "#dong-gop", label: "Đóng góp", icon: Milestone },
        { href: "#trich-dan", label: "Trích dẫn", icon: Quote },
        { href: "#ung-dung", label: "Ứng dụng", icon: Component },
        { href: "#quiz", label: "Quiz", icon: BadgeHelp },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <a href="#" className="flex items-center gap-3 group">
                        <Image
                            src="https://images.seeklogo.com/logo-png/25/3/fpt-university-logo-png_seeklogo-252587.png"
                            alt="Socrates Project Logo"
                            width={85}
                            height={85}
                        />
                        <span className="text-2xl font-serif font-bold text-primary">
                            Socrates
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 font-medium group"
                                >
                                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                                    <span>{item.label}</span>
                                </a>
                            )
                        })}
                        {/* 3. Đã xóa nút bấm Dark Mode ở đây */}
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center">
                        {/* 4. Đã xóa nút bấm Dark Mode ở đây */}
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-primary">
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 p-2 bg-card border border-border rounded-xl shadow-lg">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-4 px-4 py-3 rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </a>
                            )
                        })}
                    </div>
                )}
            </div>
        </nav>
    )
}