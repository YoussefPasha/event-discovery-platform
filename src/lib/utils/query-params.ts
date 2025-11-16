/**
 * Converts URLSearchParams to a plain object
 * Useful for preserving query parameters during navigation
 */
export function mapParamsToObject(searchParams: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {};
  
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

