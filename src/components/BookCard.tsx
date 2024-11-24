import { Link } from "react-router-dom";

interface BookCardProps {
  id: number;
  price: number;
  title: string;
  thumbnail: string;
}

const BookCard = ({ id, price, title, thumbnail }: BookCardProps) => {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link
        to={`/product/${id}`}
        aria-label={`View details of ${title}`}
        className="block p-4"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg mb-3"
        />

        <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
          {title}
        </h2>

        <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default BookCard;
