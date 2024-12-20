import "./globals.css";
import { Shippori_Mincho } from "next/font/google";

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: "400"
});

export const metadata = {
  title: "和風フラッシュカード | Wafuu Flashcards",
  description: "伝統的な日本風デザインのフラッシュカードアプリ"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${shipporiMincho.className} bg-[#f7f3e9] text-[#2c2c2c]`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="bg-[#8e354a] text-[#f7f3e9] p-4">
            <h1 className="text-2xl font-bold">和風フラッシュカード</h1>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-[#8e354a] text-[#f7f3e9] p-4 text-center">
            © 2023 和風フラッシュカード
          </footer>
        </div>
      </body>
    </html>
  );
}
