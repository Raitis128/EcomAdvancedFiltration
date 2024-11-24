import { createContext } from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  selectedKeyword: string;
  setSelectedKeyword: (keyword: string) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);
