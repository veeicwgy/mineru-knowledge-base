/*
 * Design: Obsidian Gradient — MinerU Agent Skills 技能中心
 * 完整页面：Navbar + Hero + Frameworks + Code + FAQ + Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FrameworkCards from "@/components/FrameworkCards";
import CodeShowcase from "@/components/CodeShowcase";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050510]">
      <Navbar />
      <HeroSection />
      <FrameworkCards />
      <CodeShowcase />
      <FAQSection />
      <Footer />
    </div>
  );
}
