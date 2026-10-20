import React from 'react';
import { Button, Chip } from '@heroui/react';
import { Search, MapPin, Briefcase, Code2, Database, Settings } from 'lucide-react';

const  Banner=()=> {
  return (
    <section className="relative min-h-[640px] w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#171a22] via-[#0d0e12] to-[#050608] text-white flex items-center justify-center px-4 py-16">
      
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
        {/* Left Side Icons */}
        <Database className="absolute top-[20%] left-[8%] w-6 h-6 text-slate-400" />
        <Code2 className="absolute top-[38%] left-[4%] w-7 h-7 text-slate-400" />
        <Database className="absolute bottom-[22%] left-[7%] w-6 h-6 text-slate-400" />
        <Code2 className="absolute bottom-[8%] left-[20%] w-6 h-6 text-slate-400" />

        {/* Right Side Icons */}
        <Code2 className="absolute top-[24%] right-[10%] w-7 h-7 text-slate-400" />
        <Settings className="absolute top-[40%] right-[6%] w-6 h-6 text-slate-400" />
        <Code2 className="absolute bottom-[28%] right-[5%] w-7 h-7 text-slate-400" />
        <Settings className="absolute bottom-[10%] right-[18%] w-6 h-6 text-slate-400" />

        {/* Subtle Background Stars/Dots */}
        <div className="absolute top-[14%] left-[24%] w-1.5 h-1.5 bg-slate-400 rounded-full blur-[0.5px]" />
        <div className="absolute top-[48%] left-[16%] w-1 h-1 bg-slate-500 rounded-full" />
        <div className="absolute top-[18%] right-[26%] w-1.5 h-1.5 bg-slate-400 rounded-full blur-[0.5px]" />
        <div className="absolute bottom-[20%] right-[22%] w-1 h-1 bg-slate-500 rounded-full" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#181a20]/90 border border-slate-800 shadow-inner mb-8">
          <div className="p-1 rounded bg-[#8c4b27]/40 text-[#e07a38]">
            <Briefcase className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs sm:text-sm tracking-wide text-slate-300 font-medium">
            <strong className="text-white font-bold">50,000+</strong> NEW JOBS THIS MONTH
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mb-10 leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl bg-[#12141a]/90 backdrop-blur-xl border border-slate-800 rounded-full p-2 pl-5 shadow-2xl flex flex-col sm:flex-row items-center gap-2 mb-8">
          
          {/* Job Title Input Field */}
          <div className="flex items-center gap-3 flex-1 w-full py-1">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none border-none"
            />
          </div>

          {/* Divider Line */}
          <div className="hidden sm:block w-[1px] h-7 bg-slate-800" />

          {/* Location Input Field */}
          <div className="flex items-center gap-3 flex-1 w-full py-1">
            <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none border-none"
            />
          </div>

          {/* Search Button */}
          <Button
            isIconOnly
            className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 shadow-md shadow-indigo-600/30"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Trending Position Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-slate-400">
          <span className="mr-1 text-slate-400">Trending Position</span>
          <Chip variant="flat" className="bg-[#181a22] text-slate-300 border border-slate-800 px-3 py-1 rounded-full text-xs">
            Product Designer
          </Chip>
          <Chip variant="flat" className="bg-[#181a22] text-slate-300 border border-slate-800 px-3 py-1 rounded-full text-xs">
            AI Engineering
          </Chip>
          <Chip variant="flat" className="bg-[#181a22] text-slate-300 border border-slate-800 px-3 py-1 rounded-full text-xs">
            Dev-ops Engineer
          </Chip>
        </div>

      </div>
    </section>
  );
}
export default Banner