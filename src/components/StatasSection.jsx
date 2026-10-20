"use client";
import React from "react";
import {
  Briefcase,
  ChartColumn,
  PersonMagnifier,
  Star,
} from "@gravity-ui/icons";
import { motion } from "motion/react";

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: Briefcase,
  },
  {
    value: "12K",
    label: "Companies",
    icon: ChartColumn,
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: PersonMagnifier,
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: Star,
  },
];

export default function StatsSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-black text-white">
      {/* Background Globe Image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] sm:h-[580px] lg:h-[1250px]"
      >
        <div
          className="absolute inset-0  bg-bottom bg-no-repeat opacity-90"
          style={{
            backgroundImage: "url('/assets/globe.png')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

        {/* Purple glow */}
        <div className="absolute bottom-0 left-1/2 h-64 w-[85%] -translate-x-1/2 rounded-full bg-[#4338ff]/20 blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[600px] w-full max-w-[1440px] flex-col justify-end px-4 pb-8 pt-24 sm:min-h-[680px] sm:px-6 sm:pb-10 lg:min-h-[720px] lg:px-10 lg:pb-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mx-auto mb-8 max-w-3xl text-center text-2xl font-normal leading-tight tracking-wide text-slate-200 sm:mb-12 sm:text-3xl lg:mb-16 lg:text-4xl"
        >
          Assisting over{" "}
          <span className="font-semibold text-white">15,000 job seekers</span>
          <br className="hidden sm:block" /> find their dream positions.
        </motion.h2>

        {/* Stats Cards */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => console.log("hover started!")}
        >
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className="flex min-h-[145px] flex-col justify-between rounded-xl border border-white/[0.09] bg-gradient-to-br from-[#080808]/95 to-[#191919]/95 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 sm:min-h-[160px] sm:p-5 lg:min-h-[140px] lg:p-4 xl:p-5"
                >
                  <Icon className="h-5 w-5 text-slate-300" />

                  <div>
                    <h3 className="mb-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {stat.value}
                    </h3>

                    <p className="text-[10px] font-medium text-slate-400 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}