import type { Media } from "@/payload-types";
export function media(value: string | Media | null | undefined): Media | null {
  return value && typeof value === "object" ? value : null;
}
export const categoryLabels: Record<string, string> = {
  social: "Social Media",
  "key-visual": "Key Visual",
  print: "Print Design",
};
