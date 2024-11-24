import { useFilter } from "../hooks/useFilter";
import { Product } from "./Sidebar";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import { useEffect, useState, useMemo } from "react";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, selectedKeyword } =
    useFilter();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedKeyword,
    filter,
  ]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let url = "https://dummyjson.com/products?limit=300";
        if (selectedKeyword) {
          url = `https://dummyjson.com/products/search?q=${selectedKeyword}`;
        }

        const response = await axios.get(url);
        setAllProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchAllProducts();
  }, [selectedKeyword]);

  const getFilteredProducts = useMemo(() => {
    let filteredProducts = [...allProducts];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }, [allProducts, selectedCategory, minPrice, maxPrice, searchQuery, filter]);

  const totalProducts = getFilteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const paginatedProducts = getFilteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    const maxButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="xl:w-[55rem]  lg:w-[45rem] sm:w-[100%] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-row justify-end">
          <div className="relative mb-5">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-2 rounded-full flex items-center"
              aria-label="Filter products"
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    setFilter("cheap");
                    setDropdownOpen(false);
                  }}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    setFilter("expensive");
                    setDropdownOpen(false);
                  }}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    setFilter("popular");
                    setDropdownOpen(false);
                  }}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <BookCard
                key={product.id}
                id={product.id}
                title={product.title}
                thumbnail={product.thumbnail}
                price={product.price}
              />
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>

        <div className="flex flex-row justify-between items-center mt-5">
          <button
            className="border px-4 py-2 mx-2 rounded-full"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="border px-4 py-2 mx-2 rounded-full"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
