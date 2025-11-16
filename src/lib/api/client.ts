export interface Category {
  name: string;
}

export interface Country {
  key: string;
  name: string;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data.categories;
}

export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch("/api/countries");
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  const data = await response.json();
  return data.countries;
}
