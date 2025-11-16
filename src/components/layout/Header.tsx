"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const getLinkClassName = (path: string) => {
    const baseClasses = "font-medium transition-colors";
    const activeClasses = "text-blue-600 border-b-2 border-blue-600 pb-[2px]";
    const inactiveClasses = "text-gray-700 hover:text-blue-600";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Event Discovery Logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              Event Discovery
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={getLinkClassName("/")}
            >
              {t("events")}
            </Link>
            <Link
              href="/tickets"
              className={getLinkClassName("/tickets")}
            >
              {t("tickets")}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
