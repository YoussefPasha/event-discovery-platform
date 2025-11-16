"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface EventFiltersProps {
  categories: string[];
}

export default function EventFilters({ categories }: EventFiltersProps) {
  const t = useTranslations("filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for form inputs
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    country: searchParams.get("country") || "all",
    priceRange: searchParams.get("priceRange") || "all",
  });

  // List of available countries
  const countries = [
    "egypt",
    "saudi",
    "uae",
    "qatar",
    "kuwait",
    "bahrain",
    "jordan",
    "lebanon",
    "morocco",
    "tunisia",
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "") {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      country: "all",
      priceRange: "all",
    });

    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== "all"
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Search */}
        <div className="lg:col-span-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <Select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="all">{t("selectCategory")}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        {/* Country */}
        <div>
          <Select
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
          >
            <option value="all">{t("selectCountry")}</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {t(`countries.${country}`)}
              </option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            <option value="all">{t("allPriceRanges")}</option>
            <option value="free">{t("freeEvents")}</option>
            <option value="paid">{t("paidEvents")}</option>
          </Select>
        </div>

        {/* Action Buttons - Spanning last column */}
        <div className="flex items-end gap-2">
          <Button
            onClick={applyFilters}
            disabled={isPending}
            className="flex-1"
          >
            {isPending
              ? t("applyFilters").replace("Apply", "Applying") + "..."
              : t("applyFilters")}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={isPending}
            >
              {t("clearFilters")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
