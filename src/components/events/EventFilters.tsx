"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import { fetchCategories, fetchCountries } from "@/lib/api/client";

export default function EventFilters() {
  const t = useTranslations("filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    country: searchParams.get("country") || "all",
    priceRange: searchParams.get("priceRange") || "all",
  });

  const [shouldFetchCategories, setShouldFetchCategories] = useState(false);
  const [shouldFetchCountries, setShouldFetchCountries] = useState(false);

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: shouldFetchCategories,
  });

  const { data: countries = [], isLoading: isCountriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    enabled: shouldFetchCountries,
  });

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

        <div>
          <Dropdown
            value={filters.category}
            onChange={(value) => handleFilterChange("category", value)}
            options={[
              { value: "all", label: t("selectCategory") },
              ...categories.map((category) => ({
                value: category,
                label: category,
              })),
            ]}
            placeholder={t("selectCategory")}
            isLoading={isCategoriesLoading}
            onOpen={() => setShouldFetchCategories(true)}
          />
        </div>

        <div>
          <Dropdown
            value={filters.country}
            onChange={(value) => handleFilterChange("country", value)}
            options={[
              { value: "all", label: t("selectCountry") },
              ...countries.map((country) => ({
                value: country.key,
                label: country.name,
              })),
            ]}
            placeholder={t("selectCountry")}
            isLoading={isCountriesLoading}
            onOpen={() => setShouldFetchCountries(true)}
          />
        </div>

        <div>
          <Dropdown
            value={filters.priceRange}
            onChange={(value) => handleFilterChange("priceRange", value)}
            options={[
              { value: "all", label: t("allPriceRanges") },
              { value: "free", label: t("freeEvents") },
              { value: "paid", label: t("paidEvents") },
            ]}
            placeholder={t("allPriceRanges")}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={applyFilters}
            disabled={isPending}
            className="flex-1 h-[42px]"
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
              className="h-[42px]"
            >
              {t("clearFilters")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
