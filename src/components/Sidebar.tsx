import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";

export interface Product {
  id: number;
  category: string;
  price: number;
  title: string;
  rating: number;
  thumbnail: string;
  image: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setSelectedKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products/");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === "") {
      setMinPrice(value ? parseFloat(value) : undefined);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === "") {
      setMaxPrice(value ? parseFloat(value) : undefined);
    }
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordChange = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen bg-gray-100 shadow-md overflow-y-auto">
      <h1 className="text-2xl font-bold mb-10 mt-8">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-3 py-2 w-full mb-4"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border-2 px-4 py-2 w-full"
          placeholder="Min"
          value={minPrice ?? ""}
          onChange={handleMinPriceChange}
        />
        <input
          type="text"
          className="border-2 px-4 py-2 w-full ml-2"
          placeholder="Max"
          value={maxPrice ?? ""}
          onChange={handleMaxPriceChange}
        />
      </div>

      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        {loading ? (
          <div>Loading categories...</div>
        ) : (
          categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
                className="mr-2 w-[16px] h-[16px] cursor-pointer"
              />
              {category.toUpperCase()}
            </label>
          ))
        )}
      </div>

      <div className="mb-5 mt-4">
        <h2 className="text-xl font-semibold mb-3">Keywords</h2>
        <div>
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => handleKeywordChange(keyword)}
              className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 transition"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleResetFilters}
        className="w-full py-2 bg-black text-white rounded mt-5 hover:bg-gray-800 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;
