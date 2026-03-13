/*
 * MinerU Ecosystem — LobeHub-inspired layout
 * Three tabs with shared search + sidebar navigation
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TabAgentSkills from "@/components/TabAgentSkills";
import TabFrameworks from "@/components/TabFrameworks";
import TabPlatforms from "@/components/TabPlatforms";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Reset search when switching tabs
  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <HeroSection
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Tab content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 0 && <TabAgentSkills searchQuery={searchQuery} />}
            {activeTab === 1 && <TabFrameworks searchQuery={searchQuery} />}
            {activeTab === 2 && <TabPlatforms searchQuery={searchQuery} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
