import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, BarChart3, Shield, Users, Ticket } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-gray-900 dark:to-gray-800 z-0"></div>
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-20 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-80 h-80 bg-sky-400 rounded-full filter blur-3xl opacity-20 translate-y-1/2"></div>
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
                Role-Based Ticketing System
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Streamline Your <span className="text-indigo-600 dark:text-indigo-400">Support</span> Workflow
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                Manage support tickets efficiently with our intuitive role-based ticketing system. Designed for 
                <span className="text-indigo-600 dark:text-indigo-400 font-medium"> fast issue resolution</span>, 
                seamless collaboration, and exceptional user experience.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Log In
                </Link>
              </div>
              <div className="mt-8 flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                No credit card required
              </div>
            </div>
            
            <div className="relative flex justify-center md:justify-end animate-fade-in">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl blur opacity-30 dark:opacity-40"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src="/thicketing_system.PNG"
                    alt="Ticketing System Dashboard"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Powerful Features for Your Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Everything you need to manage support tickets efficiently and provide excellent service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-md transition-all duration-200 animate-fade-in">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Role-Based Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Assign specific roles to users for better control and workflow efficiency. Separate user and admin views.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="rounded-full bg-sky-100 dark:bg-sky-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <Ticket className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Fast Issue Resolution
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track and resolve issues faster with an optimized ticketing flow and intuitive status management.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Seamless Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Communicate effortlessly with team members to resolve tickets efficiently and provide better service.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Real-Time Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gain insights with detailed analytics and reporting to help improve your support processes.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Secure Authentication
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                JWT-based authentication ensures your data remains secure and accessible only to authorized users.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="rounded-full bg-pink-100 dark:bg-pink-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Responsive Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your ticketing system from any device with our fully responsive and modern UI design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 mb-6">
              Trusted by Teams
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Users Say
            </h2>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-sky-100 dark:from-indigo-900/20 dark:to-sky-900/20 rounded-2xl -z-10"></div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-lg text-gray-600 dark:text-gray-300 italic">
                  "RoleTix has transformed how we handle support tickets. The role-based system makes it easy to assign and track issues, and the analytics help us identify bottlenecks in our process."
                </p>
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Support Manager, TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-indigo-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to streamline your support process?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who have improved their ticket resolution time and customer satisfaction.
            </p>
            <Link to="/signup" className="btn bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
              Get Started Now <ArrowRight className="h-5 w-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
