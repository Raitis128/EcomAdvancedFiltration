import { Link } from "react-router-dom";

interface BookCardProps {
  id: number;
  price: number;
  title: string;
  thumbnail: string;
}

const BookCard = ({ id, price, title, thumbnail }: BookCardProps) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-32 object-cover mb-2"
        />

        <h2>{title}</h2>
        <p>${price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
