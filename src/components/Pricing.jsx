
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Crown, ChartColumn, Bolt, Plus, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Crown,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: false,
  },
  {
    name: "Growth",
    icon: ChartColumn,
    monthlyPrice: 17,
    yearlyPrice: 12.75,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: true,
  },
  {
    name: "Premium",
    icon: Bolt,
    monthlyPrice: 99,
    yearlyPrice: 74.25,
    description: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    featured: false,
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-md text-center sm:mb-12"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-1.5 w-1.5 bg-[#7860ff]" />
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-gray-300">
              Pricing
            </span>
            <span className="h-1.5 w-1.5 bg-[#7860ff]" />
          </div>

          <h2 className="text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </motion.div>

        {/* Billing Toggle */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-[#202020] p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-xs transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs transition-all duration-200 ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Yearly
              <span className="rounded-full bg-fuchsia-600 px-2 py-0.5 text-[10px] text-white">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price =
              billing === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -4 }}
                className={`flex min-h-[300px] flex-col rounded-2xl border p-4 sm:p-5 ${
                  plan.featured
                    ? "border-white/[0.12] bg-gradient-to-br from-[#222222] to-[#111111] shadow-[0_10px_40px_rgba(255,255,255,0.04)]"
                    : "border-white/[0.12] bg-black"
                }`}
              >
                {/* Plan Header */}
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] bg-[#101010]">
                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className="text-[#e8b5ff]"
                      />
                    </div>

                    <h3 className="text-sm font-normal text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1 whitespace-nowrap">
                    <motion.span
                      key={`${plan.name}-${billing}`}
                      initial={{ opacity: 0.4, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl font-medium tracking-tight sm:text-[34px]"
                    >
                      ${price === 0 ? "0" : Number(price.toFixed(2))}
                    </motion.span>

                    <span className="text-[9px] text-gray-400">
                      /month
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-3 text-[11px] leading-5 text-white">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="mb-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[11px] leading-4 text-[#a6a6a6]"
                    >
                      <span className="mt-[-1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] border border-white/[0.06] bg-[#292929]">
                        <Plus size={11} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `/sign-up?plan=${plan.name.toLowerCase()}&billing=${billing}`;
                  }}
                  className={`mt-auto flex w-full items-center justify-between rounded-lg px-3.5 py-3 text-[10px] font-medium transition-all duration-200 ${
                    plan.featured
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-[#292929] text-white hover:bg-[#383838]"
                  }`}
                >
                  Choose This Plan
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}