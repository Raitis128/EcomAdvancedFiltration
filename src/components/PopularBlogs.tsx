import { MessageCircle, ThumbsUp } from "lucide-react";

const blogs = [
  {
    title: "My Amazing Blog Title 1",
    author: "Jordan",
    likes: 142,
    comments: 44,
  },
  {
    title: "My Amazing Blog Title 2",
    author: "John",
    likes: 153,
    comments: 25,
  },
  {
    title: "My Amazing Blog Title 4",
    author: "HuXn",
    likes: 50,
    comments: 14,
  },
];

const PopularBlogs = () => {
  return (
    <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-5 text-gray-800">Popular Blogs</h2>
      <ul>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <li
              key={index}
              className="mb-4 p-3 border-b last:border-b-0 hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700 text-lg">
                  {blog.title}
                </span>
              </div>
              <span className="text-gray-600 text-sm">
                Published by {blog.author}
              </span>
              <div className="flex items-center mt-2 text-gray-500">
                <MessageCircle size={16} aria-label="Comments" />
                <span className="ml-1 mr-4">{blog.comments}</span>
                <ThumbsUp size={16} aria-label="Likes" />
                <span className="ml-1">{blog.likes}</span>
              </div>
            </li>
          ))
        ) : (
          <li>No popular blogs available</li>
        )}
      </ul>
    </div>
  );
};

export default PopularBlogs;
