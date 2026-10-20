
"use client";

import { motion } from "motion/react";
import {
  Magnifier,
  ChartLine,
  ChartColumn,
  Bookmark,
LayoutHeaderCursor,
  FileText,
  NutHex,
  ArrowUpRight,
} from "@gravity-ui/icons";

const features = [
  {
    icon: Magnifier,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLine,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: ChartColumn,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage applications & favorites on your dashboard.",
  },
  {
    icon: LayoutHeaderCursor,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: NutHex,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: ArrowUpRight,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeatureJob() {
  return (
    <section className="relative overflow-hidden bg-[#141414] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-md text-center sm:mb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-1.5 w-1.5 bg-[#7860ff]" />
            <span className="text-sm font-medium uppercase tracking-[0.12em] text-gray-300">
              Features Job
            </span>
            <span className="h-1.5 w-1.5 bg-[#7860ff]" />
          </div>

          <h2 className="text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-[42px]">
            Everything you need
            <br />
            to succeed
          </h2>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-9">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4"
              >
                {/* Icon Box */}
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-gradient-to-br from-black to-[#1c1c1c] transition-all duration-300 group-hover:border-[#7860ff]/50 group-hover:bg-[#211d35]">
                  <Icon
                    width={24}
                    height={24}
                    className="text-[#edb5ff] transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Feature Content */}
                <div className="min-w-0 pt-0.5">
                  <h3 className="mb-2 text-sm font-medium leading-5 text-white sm:text-[14px]">
                    {feature.title}
                  </h3>

                  <p className="max-w-[220px] text-xs leading-[1.7] text-[#a5a5a5] sm:text-[12px]">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}