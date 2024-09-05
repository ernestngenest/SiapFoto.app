import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainPage() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="hero bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Image */}
          <div className="flex justify-center">
            <img
              src="../../public/main.png"
              alt="AI Enhanced Studio Photo"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
          {/* Right Column: Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Transform Your Phone Photos into Studio-Quality Images
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our AI-powered web app enhances your everyday photos to make them
              look like they were shot in a professional studio. Upload,
              enhance, and share effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="feature-card bg-gray-50 p-6 rounded-lg shadow-lg text-center">
            <img
              src="../../public/ajiehim.jpg"
              alt="Enhance"
              className="w-30   mx-auto mb-4 "
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              AI Enhancement
            </h3>
            <p className="text-gray-600">
              Our cutting-edge AI transforms lighting, sharpness, and clarity to
              give your photos a professional touch.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card bg-gray-50 p-6 rounded-lg shadow-lg text-center">
            <div className="w-30 ">
              <img
                src="../../public/ajieori.jpg"
                alt="Edit"
                className="w-30 mx-auto mb-4"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              One-Click Edits
            </h3>
            
            <p className="text-gray-600">
              Upload your photo, hit enhance, and let our AI do the rest. No
              manual adjustments required.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card bg-gray-50 p-6 rounded-lg shadow-lg text-center">
            <div className="w-30">
              <img
                src="../../public/nice.jpg"
                alt="Share"
                className="w-30 mx-auto mb-4"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Instant Sharing
            </h3>
            <p className="text-gray-600">
              Download and share your enhanced photos instantly with just one
              click. No more waiting.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta py-20 px-4 bg-blue-50 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Enhance Your Photos?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your first photo now and see the magic happen in seconds.
          </p>
          <Link to={`/login`}>
          <button className="transition-all font-bold border border-blue-400 hover:ring-2 hover:ring-yellow-400 px-4 py-2 text-center text-sm text-blue-800 after:transition-all after:duration-500 hover:after:bg-blue-400 lg:border lg:text-base relative after:content-[''] after:block after:absolute after:w-full after:h-full after:top-2 after:left-2 after:bg-blue-400/20 after:z-[-1] hover:after:inset-0">
            Try It Now
          </button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 px-4 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Ernest Christca. All rights reserved.</p>
      </footer>
    </div>
  );
}
