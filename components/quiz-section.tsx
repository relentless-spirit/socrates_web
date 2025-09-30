"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react"

const quizQuestions = [
    {
        question: "Mục đích chính của 'phương pháp Socratic' (Elenchus) là gì?",
        options: [
            "Để chứng minh người đối thoại sai",
            "Để vạch trần sự thiếu hiểu biết của người đối thoại",
            "Để truyền đạt kiến thức của Socrates cho người khác",
            "Để giành chiến thắng trong các cuộc tranh luận"
        ],
        correct: 1,
        explanation: "Phương pháp Elenchus không nhằm mục đích dạy dỗ mà để người khác tự nhận ra sự mâu thuẫn và thiếu sót trong niềm tin của chính họ, coi đó là bước đầu tiên để hướng tới tri thức."
    },
    {
        question: "Câu nói 'Tôi chỉ biết một điều, đó là tôi không biết gì cả' thể hiện điều gì?",
        options: [
            "Sự hoài nghi tuyệt đối vào tri thức",
            "Một lời nói dối để tỏ ra khiêm tốn",
            "Sự khiêm tốn trí tuệ và nhận thức về giới hạn của bản thân",
            "Sự thất vọng về nền giáo dục Athens"
        ],
        correct: 2,
        explanation: "Đây là tuyên ngôn về sự khiêm tốn nhận thức. Socrates cho rằng trí tuệ thực sự bắt đầu khi ta nhận ra mình không biết những điều mình tưởng là mình biết."
    },
    {
        question: "Theo Socrates, tại sao con người lại làm những điều sai trái?",
        options: [
            "Vì bản chất con người là xấu xa",
            "Vì sự yếu đuối của ý chí không thể chống lại cám dỗ",
            "Vì họ thiếu hiểu biết về cái tốt thực sự",
            "Vì áp lực từ xã hội và gia đình"
        ],
        correct: 2,
        explanation: "Đây là cốt lõi của chủ nghĩa trí tuệ đạo đức. Socrates tin rằng 'không ai cố ý làm điều sai trái', mọi hành vi xấu đều do nhầm lẫn hoặc không biết đâu là điều tốt thực sự cho linh hồn."
    },
    {
        question: "Đối với Socrates, điều gì là quan trọng nhất để đạt được hạnh phúc (eudaimonia)?",
        options: [
            "Sức khỏe tốt và của cải vật chất",
            "Danh tiếng và sự kính trọng từ người khác",
            "Sự đức hạnh và hoàn thiện của linh hồn",
            "Sự thỏa mãn các ham muốn cá nhân"
        ],
        correct: 2,
        explanation: "Socrates lập luận rằng hạnh phúc đích thực không phụ thuộc vào các yếu tố bên ngoài, mà hoàn toàn đến từ trạng thái đạo đức bên trong của linh hồn. Đức hạnh là điều kiện đủ cho hạnh phúc."
    },
    {
        question: "Triết lý của Socrates bị coi là 'làm hỏng giới trẻ' vì lý do chính nào?",
        options: [
            "Ông dạy họ cách làm giàu nhanh chóng",
            "Ông khuyến khích họ nổi loạn chống lại cha mẹ",
            "Ông xúi giục họ rời bỏ Athens",
            "Ông khuyến khích họ chất vấn các giá trị và thẩm quyền truyền thống"
        ],
        correct: 3,
        explanation: "Bằng cách khuyến khích thanh niên tự suy nghĩ và đặt câu hỏi về mọi thứ, kể cả các giá trị lâu đời, Socrates bị chính quyền Athens xem là một mối đe dọa làm xói mòn trật tự xã hội."
    },
    {
        question: "Quan điểm 'Đức hạnh là Tri thức' có nghĩa là gì?",
        options: [
            "Người càng đọc nhiều sách thì càng đạo đức",
            "Để sống tốt, bạn cần phải có kiến thức về điều tốt",
            "Tri thức là con đường duy nhất dẫn đến sự giàu có",
            "Những người có học vị cao luôn là người tốt"
        ],
        correct: 1,
        explanation: "Socrates tin rằng đức hạnh là một loại kiến thức chuyên môn. Giống như một người thợ mộc cần biết về gỗ, một người muốn sống tốt cần phải có tri thức về công lý, lòng dũng cảm, và cái tốt."
    },
    {
        question: "Socrates quan niệm thế nào về của cải vật chất và danh vọng?",
        options: [
            "Chúng là mục tiêu cuối cùng của cuộc sống",
            "Chúng hoàn toàn xấu xa và cần phải tránh xa",
            "Chúng không có giá trị nội tại và không quyết định hạnh phúc",
            "Chúng là thước đo thành công của một người"
        ],
        correct: 2,
        explanation: "Ông không coi của cải là xấu, nhưng cho rằng chúng hoàn toàn thứ yếu so với việc chăm sóc cho linh hồn. Hạnh phúc không thể được tìm thấy trong những thứ bên ngoài."
    },
    {
        question: "'Daimonion' (dấu hiệu thần thánh) của Socrates có vai trò gì?",
        options: [
            "Một vị thần hộ mệnh luôn bảo vệ ông",
            "Một giọng nói mách bảo ông phải làm gì",
            "Một giọng nói chỉ ngăn cản ông làm những điều sai trái",
            "Một linh cảm giúp ông dự đoán tương lai"
        ],
        correct: 2,
        explanation: "Socrates mô tả daimonion như một tiếng nói bên trong chỉ có tác dụng ngăn cản, cảnh báo ông không nên thực hiện một hành động nào đó. Nó không bao giờ ra lệnh cho ông phải làm gì."
    },
    {
        question: "Theo Socrates, cuộc sống như thế nào thì 'không đáng sống'?",
        options: [
            "Một cuộc sống không có bạn bè",
            "Một cuộc sống trong nghèo khó",
            "Một cuộc sống không được xem xét và tự vấn",
            "Một cuộc sống không có tự do cá nhân"
        ],
        correct: 2,
        explanation: "Tại phiên tòa, Socrates tuyên bố 'cuộc sống không được xem xét thì không đáng sống', khẳng định rằng giá trị của cuộc sống nằm ở việc không ngừng tự phản tỉnh và tìm kiếm sự thật."
    },
    {
        question: "Thuật ngữ 'Maieutics' (thuật đỡ đẻ) mô tả khía cạnh nào trong phương pháp của Socrates?",
        options: [
            "Khả năng tranh luận sắc bén của ông",
            "Việc ông giúp người khác 'sinh ra' những ý tưởng của chính họ",
            "Việc ông loại bỏ những ý tưởng sai lầm",
            "Khả năng thu hút các học trò trẻ tuổi"
        ],
        correct: 1,
        explanation: "Socrates ví mình như một bà đỡ, không đưa kiến thức của mình cho người khác mà chỉ giúp họ thông qua các câu hỏi để tự mình khám phá và 'hạ sinh' những chân lý đã tiềm ẩn bên trong họ."
    },
]

export default function QuizSection() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [highScore, setHighScore] = useState(0)

    useEffect(() => {
        const savedHighScore = localStorage.getItem("socrates-quiz-high-score")
        if (savedHighScore) {
            setHighScore(Number.parseInt(savedHighScore))
        }
    }, [])

    const handleAnswerSelect = (answerIndex: number) => {
        if (showResult) return
        setSelectedAnswer(answerIndex)
    }

    // Thay đổi 1: Cập nhật lại toàn bộ hàm này
    const handleNextQuestion = () => {
        if (selectedAnswer === null) return

        // Nếu chưa hiển thị kết quả -> đây là hành động "Kiểm tra đáp án"
        if (!showResult) {
            if (selectedAnswer === quizQuestions[currentQuestion].correct) {
                setScore(score + 1)
            }
            setShowResult(true)
            return
        }

        // Nếu đã hiển thị kết quả -> đây là hành động "Câu tiếp theo"
        if (showResult) {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer(null)
                setShowResult(false)
            } else {
                // Hoàn thành quiz
                setQuizCompleted(true)
                if (score > highScore) {
                    setHighScore(score)
                    localStorage.setItem("socrates-quiz-high-score", score.toString())
                }
            }
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setScore(0)
        setQuizCompleted(false)
    }

    const getScoreMessage = (finalScore: number) => {
        const percentage = (finalScore / quizQuestions.length) * 100
        if (percentage >= 90) return "Xuất sắc! Bạn là một chuyên gia về Socrates!"
        if (percentage >= 70) return "Tốt lắm! Bạn hiểu khá rõ về Socrates."
        if (percentage >= 50) return "Không tệ! Hãy tìm hiểu thêm về triết gia vĩ đại này."
        return "Hãy đọc lại về Socrates và thử lại nhé!"
    }

    // Màn hình kết quả (đã được đồng bộ style)
    if (quizCompleted) {
        return (
            <section id="quiz" className="py-20 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-background border border-border rounded-xl p-8 shadow-lg">
                            <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Hoàn thành Quiz!</h2>

                            <div className="text-6xl font-bold text-primary mb-4">
                                {score}/{quizQuestions.length}
                            </div>

                            <div className="text-xl text-muted-foreground mb-6">
                                {Math.round((score / quizQuestions.length) * 100)}%
                            </div>

                            <p className="text-lg text-foreground mb-6 text-pretty">{getScoreMessage(score)}</p>

                            {highScore > 0 && (
                                <p className="text-muted-foreground mb-6">
                                    Điểm cao nhất: {highScore}/{quizQuestions.length}
                                </p>
                            )}

                            <Button onClick={restartQuiz} size="lg">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Làm lại Quiz
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Màn hình câu hỏi (đã được đồng bộ style)
    return (
        <section id="quiz" className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Quiz Kiến Thức</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Kiểm tra hiểu biết của bạn về nhà triết học vĩ đại Socrates
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-background border border-border rounded-xl p-8 shadow-lg">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>
                  Câu hỏi {currentQuestion + 1}/{quizQuestions.length}
                </span>
                                <span>Điểm: {score}</span>
                            </div>
                            <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} />
                        </div>

                        {/* Question */}
                        <h3 className="text-2xl font-serif font-semibold text-primary mb-8 text-pretty">
                            {quizQuestions[currentQuestion].question}
                        </h3>

                        {/* Options */}
                        <div className="space-y-4 mb-8">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={showResult}
                                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 text-foreground ${
                                        selectedAnswer === index
                                            ? showResult
                                                ? index === quizQuestions[currentQuestion].correct
                                                    ? "border-green-500 bg-green-500/10"
                                                    : "border-red-500 bg-red-500/10"
                                                : "border-primary bg-primary/10"
                                            : showResult && index === quizQuestions[currentQuestion].correct
                                                ? "border-green-500 bg-green-500/10"
                                                : "border-border hover:border-primary/50 hover:bg-primary/5"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <span className="flex-1">{option}</span>
                                        {showResult && (
                                            <div className="ml-4">
                                                {index === quizQuestions[currentQuestion].correct ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                ) : selectedAnswer === index ? (
                                                    <XCircle className="w-5 h-5 text-red-500" />
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Explanation */}
                        {showResult && (
                            <div className="mb-6 p-4 bg-card rounded-xl border border-border">
                                <p className="text-muted-foreground text-pretty">
                                    <strong>Giải thích:</strong> {quizQuestions[currentQuestion].explanation}
                                </p>
                            </div>
                        )}

                        {/* Next Button */}
                        <Button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null}
                            className="w-full"
                            size="lg"
                        >
                            {/* Thay đổi 2: Cập nhật nội dung nút bấm linh hoạt */}
                            {!showResult
                                ? "Kiểm tra đáp án"
                                : currentQuestion === quizQuestions.length - 1
                                    ? "Hoàn thành"
                                    : "Câu tiếp theo"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}