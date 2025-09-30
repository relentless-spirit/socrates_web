"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const contributions = [
    {
        title: "Sáng Lập Triết Học Đạo Đức",
        summary: "Chuyển hướng triết học từ nghiên cứu tự nhiên sang nghiên cứu con người và đạo đức",
        details: "Trước Socrates, các triết gia chủ yếu tập trung vào vũ trụ và thế giới tự nhiên. Ông đã thực hiện một cuộc cách mạng bằng cách đặt con người vào vị trí trung tâm, với câu hỏi cốt lõi 'Chúng ta nên sống như thế nào?'. Ông là người đầu tiên hệ thống hóa việc nghiên cứu các khái niệm như Công lý, Đức hạnh, và Cái tốt.",
        impact: "Socrates được coi là cha đẻ của triết học đạo đức phương Tây. Toàn bộ nền triết học đạo đức sau này, từ Plato, Aristotle cho đến các triết gia hiện đại, đều xây dựng trên nền móng mà ông đã đặt ra.",
    },
    {
        title: "Phương Pháp Socratic (Elenchus)",
        summary: "Phát triển một phương pháp đối thoại để kiểm chứng tri thức và phơi bày sự thiếu hiểu biết",
        details: 'Phương pháp của ông không phải là giảng dạy mà là đặt câu hỏi. Thông qua một chuỗi câu hỏi và câu trả lời logic, ông giúp người đối thoại nhận ra sự mâu thuẫn trong chính niềm tin của họ. Quá trình "nữ hộ sinh trí tuệ" (maieutics) này giúp họ tự "sinh ra" những ý tưởng rõ ràng hơn.',
        impact: "Phương pháp này là nền tảng của tư duy phê phán (critical thinking) và phương pháp khoa học. Nó được áp dụng rộng rãi trong giáo dục, luật pháp (thẩm vấn), tâm lý trị liệu và quản trị kinh doanh cho đến ngày nay.",
    },
    {
        title: "Chủ Thuyết 'Đức Hạnh là Tri Thức'",
        summary: "Đưa ra mối liên hệ chặt chẽ và bất khả phân ly giữa kiến thức và hành vi đạo đức",
        details: "Socrates lập luận rằng không ai cố ý làm điều sai trái. Mọi hành vi xấu xa đều bắt nguồn từ sự thiếu hiểu biết về cái tốt thực sự. Ông tin rằng nếu một người thực sự biết điều gì là đúng đắn và tốt đẹp cho linh hồn mình, họ sẽ không thể không làm điều đó.",
        impact: "Học thuyết này đã định hình các cuộc tranh luận về đạo đức, ý chí tự do và trách nhiệm trong suốt hai thiên niên kỷ. Nó thách thức quan niệm thông thường về 'sự yếu đuối của ý chí' và ảnh hưởng sâu sắc đến các hệ thống pháp luật và giáo dục đạo đức.",
    },
    {
        title: "Di Sản Thông Qua Các Học Trò",
        summary: "Truyền cảm hứng và định hình thế hệ triết gia vĩ đại kế cận",
        details: "Dù không viết lại bất cứ điều gì, di sản của Socrates được bảo tồn và phát triển rực rỡ qua các học trò của ông. Nổi bật nhất là Plato, người đã dùng hình ảnh Socrates làm nhân vật chính trong các tác phẩm đối thoại bất hủ của mình, qua đó truyền bá và mở rộng tư tưởng của thầy.",
        impact: "Thông qua Plato và học trò của Plato là Aristotle, tư tưởng của Socrates đã trở thành trụ cột của toàn bộ nền văn minh phương Tây. Hầu hết các nhánh triết học sau này đều có thể truy nguyên về những câu hỏi mà Socrates đã đặt ra lần đầu tiên.",
    },
]

export default function ContributionsSection() {
  const [expandedCards, setExpandedCards] = useState<number[]>([])

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section id="dong-gop" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Đóng Góp Chính</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Những di sản trí tuệ vĩnh cửu của Socrates cho nhân loại
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden marble-texture transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleCard(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-semibold text-primary mb-2">{contribution.title}</h3>
                  <p className="text-muted-foreground text-pretty">{contribution.summary}</p>
                </div>
                <div className="ml-4 text-primary">
                  {expandedCards.includes(index) ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </button>

              {expandedCards.includes(index) && (
                <div className="px-6 pb-6 border-t border-border/50">
                  <div className="pt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Chi tiết:</h4>
                      <p className="text-muted-foreground text-pretty">{contribution.details}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Tác động:</h4>
                      <p className="text-muted-foreground text-pretty">{contribution.impact}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
