import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Hero Section */}
        <section
          className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20"
          style={{
            background: "linear-gradient(to right, #1e293b, #0f172a)",
          }}
        >
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Streamline Your Ticketing System
            </h1>
            <p className="text-lg text-gray-300 mt-4">
              Manage support tickets efficiently with our{" "}
              <span className="italic text-amber-300">Role based </span>
              ticketing system. Designed for{" "}
              <span className="italic text-amber-300">
                fast issue resolution
              </span>
              , seamless collaboration, and a smooth user experience.
            </p>
            <Link to="/signup">
              <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
                Get Started
              </button>
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <img
              src="/hero.png"
              alt="Ticketing System"
              className="rounded-lg"
              lazy="loading"
              width={400}
              height={400}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 md:px-16 py-20">
          <h2 className="text-3xl md:text-5xl font-bold text-center">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
              <h3 className="text-2xl font-semibold">Role-Based Access</h3>
              <p className="text-gray-400 mt-2">
                Assign specific roles to users for better control and workflow
                efficiency.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
              <h3 className="text-2xl font-semibold">Fast Issue Resolution</h3>
              <p className="text-gray-400 mt-2">
                Track and resolve issues faster with an optimized ticketing
                flow.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
              <h3 className="text-2xl font-semibold">Seamless Collaboration</h3>
              <p className="text-gray-400 mt-2">
                Communicate effortlessly with team members to resolve tickets
                efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="text-center py-16 bg-gradient-to-r from-gray-800 to-gray-900">
          <h2 className="text-3xl md:text-5xl font-bold">Join Us Today!</h2>
          <p className="text-gray-300 mt-3">
            Start managing your support tickets effortlessly.
          </p>
          <Link to="/signup">
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
              Sign Up Now
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

export default Home;
