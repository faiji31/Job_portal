import {
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
  
} from "@gravity-ui/icons";
import Link from "next/link";


const Footer = () => {
  const footerGroups = [
    {
      title: "Product",
      links: [
        { label: "Job discovery", href: "/jobs" },
        { label: "Worker AI", href: "/worker-ai" },
        { label: "Companies", href: "/companies" },
        { label: "Salary data", href: "/salary-data" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { label: "Help center", href: "/help" },
        { label: "Career library", href: "/career-library" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "/brand-guideline" },
        { label: "Newsroom", href: "/newsroom" },
      ],
    },
  ];

  const socialLinks = [
    {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <LogoFacebook />,
  },
  {
    name: "Github",
    href: "https://github.com",
    icon: <LogoGithub />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <LogoLinkedin />,
  },
  ];

  return (
    <footer className="w-full bg-black px-5 pb-6 pt-10 text-white sm:px-8 sm:pt-12 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              aria-label="HireLoop home"
              className="text-[30px] font-extrabold leading-none tracking-[-1.5px]"
            >
              <span className="text-[#0789ff]">hire</span>
              <span className="bg-gradient-to-r from-[#08a9ff] via-[#20c5e8] to-[#ff8500] bg-clip-text text-transparent">
                loop
              </span>
            </Link>

            <p className="mt-6 max-w-[290px] text-[13px] leading-6 text-white/35">
              The AI-native career platform. Built for
              people who take their work seriously.
            </p>
          </div>

          {/* Footer Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-[13px] font-medium text-[#6555ff]">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/35 transition-colors duration-200 hover:text-white/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.06] pt-5 sm:mt-16 lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:border-t-0 lg:pt-0">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
                  social.name === "Pinterest"
                    ? "bg-[#302c77] text-[#aaa5ff] hover:bg-[#403a99]"
                    : "bg-[#101010] text-white/45 hover:bg-white/10 hover:text-white"
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright and Legal */}
          <div className="flex flex-col gap-3 text-[12px] text-white/35 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3 lg:justify-end">
            <p>Copyright 2026 — HireLoop</p>

            <div className="flex flex-wrap items-center gap-x-1">
              <Link
                href="/terms"
                className="transition-colors hover:text-white/75"
              >
                Terms &amp; Policy
              </Link>

              <span aria-hidden="true">-</span>

              <Link
                href="/privacy"
                className="transition-colors hover:text-white/75"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;