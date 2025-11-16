import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { LOCALE_COOKIE_KEY } from "@/constants/local-storage-keys";
import { DEFAULT_LOCALE, LOCALES } from "@/constants/locales";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  localeCookie: {
    name: LOCALE_COOKIE_KEY,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
