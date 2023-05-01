import { Product } from "types/Product";

export const TITLES: Record<string, string> = {
  fruit: "Fruit",
  vegetable: "Vegetable",
};

export const DEFAULT_PRODUCT: Product = {
  id: "",
  name: "",
  description: "",
};

export const TAG_COLORS: Record<string, string> = {
  "out-of-season": "#393053",
  fresh: "#5D9C59",
  bonus: "#E96479",
  organic: "#FDD36A",
};
