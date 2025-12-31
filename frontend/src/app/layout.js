import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Homepage/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "RecruitATS",
  description: "Modern Recruitment ATS Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* Fixed Header */}
        <Header />

        {/* Spacer for Fixed Header */}
        <div className="h-16 md:h-20" />

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
