"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

function SpotlightCard({ children, className = "", spotlightColor = "rgba(255,255,255,0.1)" }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-colors hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full w-full p-4 sm:p-5 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

const stackItems = [
  // Row 1
  {
    name: "TypeScript",
    type: "Language",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    color: "rgba(49, 120, 198, 0.15)",
    colSpan: "col-span-3 sm:col-span-2",
  },
  {
    name: "Rust",
    type: "Language",
    icon: "https://cdn.simpleicons.org/rust/white",
    color: "rgba(255, 255, 255, 0.1)",
    colSpan: "col-span-3 sm:col-span-2",
  },
  {
    name: "Go",
    type: "Language",
    icon: "https://cdn.simpleicons.org/go/00ADD8",
    color: "rgba(0, 173, 216, 0.15)",
    colSpan: "col-span-3 sm:col-span-2",
  },
  // Row 2
  {
    name: "JavaScript",
    type: "Language",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    color: "rgba(247, 223, 30, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "Python",
    type: "Language",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    color: "rgba(55, 118, 171, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "React",
    type: "Library",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    color: "rgba(97, 218, 251, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "Next.js",
    type: "Framework",
    icon: "https://cdn.simpleicons.org/nextdotjs/white",
    color: "rgba(255, 255, 255, 0.1)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "Astro",
    type: "Framework",
    icon: "https://cdn.simpleicons.org/astro/FF5D01",
    color: "rgba(255, 93, 1, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "CSS",
    type: "Language",
    icon: "https://cdn.simpleicons.org/css3/1572B6",
    color: "rgba(21, 114, 182, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  // Row 3
  {
    name: "Node.js",
    type: "Runtime",
    icon: "https://cdn.simpleicons.org/nodedotjs/339933",
    color: "rgba(51, 153, 51, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "Deno",
    type: "Runtime",
    icon: "https://cdn.simpleicons.org/deno/white",
    color: "rgba(255, 255, 255, 0.1)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "FastAPI",
    type: "Framework",
    icon: "https://cdn.simpleicons.org/fastapi/009688",
    color: "rgba(0, 150, 136, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "Docker",
    type: "Infra",
    icon: "https://cdn.simpleicons.org/docker/2496ED",
    color: "rgba(36, 150, 237, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "Cloudflare",
    type: "Platform",
    icon: "https://cdn.simpleicons.org/cloudflare/F38020",
    color: "rgba(243, 128, 32, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    name: "Supabase",
    type: "Database",
    icon: "https://cdn.simpleicons.org/supabase/3ECF8E",
    color: "rgba(62, 207, 142, 0.15)",
    colSpan: "col-span-2 sm:col-span-1",
  },
  // Row 4
  {
    name: "Kubernetes",
    type: "Infra",
    icon: "https://cdn.simpleicons.org/kubernetes/326CE5",
    color: "rgba(50, 108, 229, 0.15)",
    colSpan: "col-span-3 sm:col-span-2",
  },
  {
    name: "Terraform",
    type: "Infra",
    icon: "https://cdn.simpleicons.org/terraform/844FBA",
    color: "rgba(132, 79, 186, 0.15)",
    colSpan: "col-span-3 sm:col-span-2",
  },
  {
    name: "GitHub",
    type: "Platform",
    icon: "https://cdn.simpleicons.org/github/white",
    color: "rgba(255, 255, 255, 0.1)",
    colSpan: "col-span-6 sm:col-span-2",
  },
];

export function Stack() {
  return (
    <section id="stack" className="py-24 relative w-full bg-black text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight text-white"
          >
            Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Things I reach for.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-6 gap-3 sm:gap-4"
        >
          {stackItems.map((item, index) => (
            <SpotlightCard
              key={item.name}
              className={`${item.colSpan} min-h-[120px]`}
              spotlightColor={item.color}
            >
              <div className="mb-4 relative inline-block w-fit">
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full blur-[20px] z-0"
                  style={{ background: item.color.replace('0.15', '0.4').replace('0.1)', '0.3)') }}
                />
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  {item.type}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
