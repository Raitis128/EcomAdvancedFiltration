import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowed: boolean;
  image: string;
}

interface UserData {
  name: {
    first: string;
    last: string;
  };
  picture: {
    medium: string;
  };
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();
        const authorsData: Author[] = data.results.map((user: UserData) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowed: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowed: !author.isFollowed } : author
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-5 mx-5 mt-16 border w-[23rem] rounded">
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

      <ul>
        {authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <section className="flex items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-14 h-14 rounded-full"
              />
              <span className="ml-4 text-lg font-medium">{author.name}</span>
            </section>

            <button
              onClick={() => handleFollowClick(index)}
              className={`py-1 px-3 rounded transition-colors duration-200 ${
                author.isFollowed
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {author.isFollowed ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
