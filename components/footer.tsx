export default function Footer() {
    const teamMembers = [
        { name: "Mai Hồng Thái", id: "SE183923" },
        { name: "Dương Hoàng Bảo Sơn", id: "SE182997" },
        { name: "Trần Huỳnh Anh Khoa", id: "SE183209" },
        { name: "Nguyễn Tống Thanh An", id: "SE183952" },
    ];

    const sources = [
        { name: "Socrates (Stanford Encyclopedia of Philosophy)", link: "https://plato.stanford.edu/entries/socrates/" },
        { name: "Socrates (Internet Encyclopedia of Philosophy)", link: "https://iep.utm.edu/socrates/" },
        { name: "Triết học Socrates (Wikipedia)", link: "https://vi.wikipedia.org/wiki/Socrates" },
    ];

    const aiUsed = [
        { name: "Google Gemini 2.5 Flash API", description: "Cung cấp khả năng đối thoại cho Trợ lý Socrates." },
        { name: "v0 (by Vercel)", description: "Công cụ AI tạo UI components từ mã." },
        // Thêm các công nghệ khác bạn sử dụng nếu muốn
    ];

    return (
        <footer className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <div className="text-3xl font-serif font-bold mb-4">Socrates</div>
                    <p className="text-primary-foreground/80 mb-8 max-w-3xl mx-auto text-pretty">
                        "Cuộc sống không được xem xét thì không đáng sống" - Một di sản trí tuệ vĩnh cửu cho nhân loại.
                    </p>
                </div>

                {/* Cột thông tin thành viên, nguồn và AI */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mt-8 mb-10 border-t border-b border-primary-foreground/20 py-8">

                    {/* Cột 1: Đội Ngũ Thực Hiện */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4 border-b border-accent pb-2">Đội Ngũ Thực Hiện</h4>
                        <ul className="space-y-2">
                            {teamMembers.map((member, index) => (
                                <li key={index} className="text-primary-foreground/90">
                                    <span className="font-medium">{member.name}</span> - <span className="text-primary-foreground/70 text-sm">{member.id}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 2: Nguồn Tham Khảo */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4 border-b border-accent pb-2">Nguồn Tham Khảo</h4>
                        <ul className="space-y-2">
                            {sources.map((source, index) => (
                                <li key={index}>
                                    <a
                                        href={source.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:text-accent/80 transition-colors duration-200 text-primary-foreground/90 hover:underline"
                                    >
                                        {source.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 3: AI và Công Nghệ Sử Dụng */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4 border-b border-accent pb-2">AI & Công Nghệ</h4>
                        <ul className="space-y-2">
                            {aiUsed.map((tech, index) => (
                                <li key={index} className="text-primary-foreground/90">
                                    <span className="font-medium">{tech.name}</span> - <span className="text-primary-foreground/70 text-sm">{tech.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="text-center text-sm text-primary-foreground/60 mt-8">
                    © {new Date().getFullYear()} Trang web về Socrates. Được tạo để tôn vinh di sản triết học vĩ đại.
                </div>
            </div>
        </footer>
    );
}