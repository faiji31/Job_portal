"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import ArrowUpRight from "@gravity-ui/icons/ArrowUpRight";

export default function Role() {
  // Change this path to use your own background image.
  const [bgImage, setBgImage] = useState("/images/role-globe.png");

  return (
    <section className="relative isolate flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-black px-5 py-20 text-white sm:min-h-[480px]">
      {/* Background image option */}
      {bgImage && (
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />
      )}

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-black/35" />

      {/* Purple glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-56 w-[80%] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

      {/* Content */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="max-w-2xl text-4xl font-medium leading-[1.12] tracking-[-0.045em] sm:text-5xl md:text-[56px]">
          Your next role is
          <br />
          already looking for you
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
          Build a profile in three minutes. The matches start arriving
          tomorrow morning.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            as={Link}
            href="/auth/signup"
            radius="lg"
            size="lg"
            className="min-w-[160px] bg-white px-5 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.03] hover:bg-white/90"
          >
            Create a free account
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>

          <Button
            as={Link}
            href="/pricing"
            radius="lg"
            size="lg"
            variant="bordered"
            className="min-w-[125px] border-white/15 bg-white/[0.04] px-5 text-sm font-normal text-white hover:bg-white/10"
          >
            View pricing
          </Button>
        </div>

        
        
      </div>
    </section>
  );
}