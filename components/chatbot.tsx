"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    text: string
    isUser: boolean
    timestamp: Date
}

// Chuyển đổi message sang định dạng history cho API
const formatMessagesForApi = (messages: Message[]) => {
    // Bỏ qua tin nhắn chào mừng đầu tiên
    return messages.slice(1).map(msg => ({
        role: msg.isUser ? "user" : "model",
        parts: [{ text: msg.text }]
    }));
}


export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Chào bạn! Ta là Socrates. Hãy cùng ta đối thoại để tìm kiếm chân lý. Ngươi muốn hỏi ta điều gì?",
            isUser: false,
            timestamp: new Date(),
        },
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // File: Chatbot.tsx
// ... (giữ nguyên các phần import và state)

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            isUser: true,
            timestamp: new Date(),
        };

        // Thêm tin nhắn của người dùng và tin nhắn rỗng của bot để cập nhật sau
        const newMessages = [...messages, userMessage];
        const botMessageId = (Date.now() + 1).toString();
        const botMessagePlaceholder: Message = {
            id: botMessageId,
            text: "", // Bắt đầu với text rỗng
            isUser: false,
            timestamp: new Date(),
        };

        setMessages([...newMessages, botMessagePlaceholder]);
        setInputValue("");
        setIsTyping(true);

        try {
            const history = formatMessagesForApi(newMessages);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: inputValue, history }),
            });

            if (!response.ok || !response.body) {
                throw new Error("API request failed");
            }

            // Đọc dữ liệu từ stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                fullResponse += decoder.decode(value, { stream: true });

                // Cập nhật tin nhắn của bot một cách liên tục
                setMessages(prev => prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
                ));
            }

        } catch (error) {
            console.error("Failed to fetch from Gemini API:", error);
            const errorMessage: Message = {
                id: botMessageId,
                text: "Hỡi ôi, dường như có một sự xáo trộn trong vũ trụ khiến ta không thể đối thoại lúc này. Hãy thử lại sau.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? errorMessage : msg));
        } finally {
            setIsTyping(false);
        }
    };

// ... (giữ nguyên các phần còn lại của component và JSX)

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // Giao diện JSX giữ nguyên, không cần thay đổi phần render.
    // ... Dán toàn bộ phần return (...) của component cũ vào đây ...
    return (
        <>
            {/* Floating Chat Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-[9998] h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
                    "bg-primary", // Sử dụng màu từ theme
                    "dark:bg-primary",
                    isOpen && "scale-0 opacity-0",
                )}
                size="icon"
            >
                <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </Button>

            {/* Desktop Chat Window */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 z-[9999] w-full max-w-sm transition-all duration-300 transform origin-bottom-right",
                    "md:w-96",
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
                )}
            >
                <Card className="h-[60vh] md:h-[70vh] max-h-[700px] flex flex-col bg-card/80 backdrop-blur-lg border-border shadow-2xl rounded-xl">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">Σ</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Socrates</h3>
                                <p className="text-xs text-muted-foreground">Đối thoại để tìm chân lý</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsOpen(false)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={cn("flex items-end gap-2", message.isUser ? "justify-end" : "justify-start")}>
                                {!message.isUser && (
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary-foreground font-bold text-xs">Σ</span>
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        "max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm",
                                        message.isUser
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-muted text-muted-foreground rounded-bl-none",
                                    )}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary-foreground font-bold text-xs">Σ</span>
                                </div>
                                <div className="bg-muted rounded-lg px-3 py-2 shadow-sm rounded-bl-none">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-border bg-card">
                        <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Đặt một câu hỏi..."
                                className="flex-1 bg-background"
                                disabled={isTyping}
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                size="icon"
                                className="bg-primary hover:bg-primary/90"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}