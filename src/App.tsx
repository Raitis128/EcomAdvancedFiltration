import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <Router>
      <div className="flex flex-col lg:flex-row h-screen">
        <div
          className={`lg:w-1/4 w-full bg-gray-200 transition-all duration-300 ease-in-out ${
            isSidebarVisible ? "block" : "hidden"
          } lg:block`}
        >
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row w-full overflow-auto mb-5">
          <button
            onClick={toggleSidebar}
            className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-gray-700 text-white rounded"
          >
            {isSidebarVisible ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>

          <div className="grid gap-4 sm:grid-cols-1 justify-items-stretch sm:justify-items-center md:grid-cols-2 lg:grid-cols-1 px-4 py-4">
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
