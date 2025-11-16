import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/events" className="flex items-center gap-2">
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              Event Discovery
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/events"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t("events")}
            </Link>
            <Link
              href="/tickets"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
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
