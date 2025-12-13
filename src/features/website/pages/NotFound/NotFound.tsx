import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
 

  return (
    <>
    {/* no follow no index */}
    <Helmet>
      <title>404 | Page Not Found</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <h1 className="text-6xl font-bold text-red-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-opacity-90 hover:text-background  transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
    </>
  );
};

export default NotFound;
