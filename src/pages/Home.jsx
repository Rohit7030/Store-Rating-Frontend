import { Link } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Store Rating Application🚀</h1>
      <p className="text-lg text-gray-600 mb-6">
        A full-stack rating system for users, store owners, and admins.
      </p>

      {!user ? (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Register
          </Link>
        </div>
      ) : (
        <p className="text-green-600 font-medium text-lg">
          Hello, {user.name.split(" ")[0]}! You’re logged in as <strong>{user.role}</strong>.
        </p>
      )}
    </div>
  );
}
