/*
 * MinerU Ecosystem Page — Three Tab Layout
 * Tab 1: Agent Skills 技能中心
 * Tab 2: 核心数据编排框架
 * Tab 3: 平台、应用与自动化
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TabAgentSkills from "@/components/TabAgentSkills";
import TabFrameworks from "@/components/TabFrameworks";
import TabPlatforms from "@/components/TabPlatforms";
import Footer from "@/components/Footer";

const tabContent = [TabAgentSkills, TabFrameworks, TabPlatforms];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveContent = tabContent[activeTab];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <HeroSection activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content with animation */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveContent />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
