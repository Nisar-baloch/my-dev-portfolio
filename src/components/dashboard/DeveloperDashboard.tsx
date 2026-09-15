"use client"

import { motion, Variants } from "framer-motion"
import { LocationEarth } from "./LocationEarth"
import { ScratchCard } from "./ScratchCard"
import { GitHubActivity } from "./GitHubActivity"
import { WakaTimeStats } from "./WakaTimeStats"
import { VSCodeCard } from "./VSCodeCard"
import { CoffeeCounter } from "./CoffeeCounter"
import { CodingHours } from "./CodingHours"
import { NowPlaying } from "./NowPlaying"
import { FavoriteTool } from "./FavoriteTool"
import { ConnectCard } from "./ConnectCard"
import { ToolsMarquee } from "./ToolsMarquee"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

export function DeveloperDashboard() {
  return (
    <section className="py-20 relative max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]"
      >
        {/* Row 1 & 2 */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 row-span-2 h-full">
          <LocationEarth />
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-1 row-span-1 md:row-span-2 h-full">
          <ScratchCard />
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-1 row-span-1 md:row-span-2 h-full">
          <GitHubActivity />
        </motion.div>

        {/* Row 3 */}
        <motion.div variants={itemVariants} className="col-span-1 row-span-1 h-full">
          <WakaTimeStats />
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 row-span-2 h-full hidden md:block">
          {/* VS Code card hidden on very small screens to save space, but visible from tablet up */}
          <VSCodeCard />
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-1 row-span-1 h-full">
          <CoffeeCounter />
        </motion.div>

        {/* Row 4 */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 row-span-1 h-full">
          <NowPlaying />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 row-span-1 h-full">
          <FavoriteTool />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 row-span-2 h-full">
          <ConnectCard />
        </motion.div>

        {/* Row 5 */}
        <motion.div variants={itemVariants} className="col-span-1 row-span-1 h-full">
          <CodingHours />
        </motion.div>
        
        {/* Row 6 */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-4 row-span-1 h-full">
          <ToolsMarquee />
        </motion.div>
      </motion.div>
    </section>
  )
}
