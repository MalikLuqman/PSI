import React from "react";
import { Link } from "react-router-dom";

const footerNavigation = {
  shop: [{ name: "All kind of books", to: "/shop" }],
};

export const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-0 xl:grid xl:grid-cols-3 xl:gap-8">
          {/* <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Shop</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.shop.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link
                        to={item.to}
                        className="text-gray-700 hover:text-gray-600"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div> */}
          {/* <div className="mt-16 md:mt-16 xl:mt-0">
            <h3 className="text-sm font-medium text-gray-900">
              Sign up for our newsletter
            </h3>
            <p className="mt-6 text-sm text-gray-700">
              The latest deals and savings, sent to your inbox weekly.
            </p>
            <form className="mt-2 flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="text"
                required
                autoComplete="email"
                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-indigo-500 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div className="ml-4 shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-orange-500 bg-orange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-white hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div> */}
        </div>

        <div className="text-center border-t border-gray-200 py-5">
          <p className="text-sm text-gray-700">
            Copyright &copy; 2025 Book Portal, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};
