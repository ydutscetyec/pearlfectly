import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "PEARLfectly Pearls",
  description: "A soft luxury pearl jewelry storefront and admin atelier.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#FFF8EF] text-[#1B1411]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
