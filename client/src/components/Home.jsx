import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome</h1>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded shadow text-lg font-semibold"
        >
          Register
        </Link>

        <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded shadow text-lg font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
