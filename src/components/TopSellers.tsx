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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthor) =>
      prevAuthor.map((author, i) =>
        index === i ? { ...author, isFollowed: !author.isFollowed } : author
      )
    );
  };

  return (
    <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

      <ul>
        {authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <section className="flex items-center justify-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-[25%] h-[25%] justify-center rounded-full"
              />
              <span className="ml-4">{author.name}</span>
            </section>

            <button
              onClick={() => {
                handleFollowClick(index);
              }}
              className={`py-1 px-3 rounded ${
                author.isFollowed
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
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
