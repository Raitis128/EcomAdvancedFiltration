import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Product not found or failed to load.");
          setLoading(false);
          console.error(error);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
        <img
          src={product?.images[0]}
          alt={product?.title}
          className="w-full sm:w-[50%] h-auto rounded-lg shadow-md mb-4 sm:mb-0"
        />

        <div className="sm:w-[50%]">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product?.title}
          </h1>
          <p className="text-lg text-gray-700 mb-4">{product?.description}</p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-semibold text-gray-900">
              Price: ${product?.price}
            </span>
            <span className="text-xl text-yellow-500">
              Rating: {product?.rating}
            </span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
