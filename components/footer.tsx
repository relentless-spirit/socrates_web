export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-3xl font-serif font-bold mb-4">Socrates</div>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto text-pretty">
            "Cuộc sống không được xem xét thì không đáng sống" - Một di sản trí tuệ vĩnh cửu cho nhân loại.
          </p>

          {/* Classical Column Decoration */}
          <div className="flex justify-center space-x-4 mb-8 opacity-60">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <div className="w-1 h-16 bg-primary-foreground rounded-full" />
            <div className="w-1 h-12 bg-accent rounded-full" />
          </div>

          <div className="text-sm text-primary-foreground/60">
            © 2025 Trang web về Socrates. Được tạo để tôn vinh di sản triết học vĩ đại.
          </div>
        </div>
      </div>
    </footer>
  )
}
