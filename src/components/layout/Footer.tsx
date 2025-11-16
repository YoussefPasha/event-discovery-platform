import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl text-white">
                Event Discovery
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Discover and book amazing events in your area. From concerts to
              conferences, find what inspires you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/events"
                  className="text-sm hover:text-white transition-colors"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets"
                  className="text-sm hover:text-white transition-colors"
                >
                  My Tickets
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  {t("privacy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  {t("terms")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
