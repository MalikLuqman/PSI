import React from "react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section aria-labelledby="sale-heading" className="relative">
      <div className="overflow-hidden bg-gray-50">
        <div className="bg-gray-800">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative pb-14 pt-14 sm:pb-14 text-center">
              {/* Heading */}
              <div>
                <h2
                  id="sale-heading"
                  className="text-3xl font-bold text-white md:text-5xl"
                >
                  Smooth
                  <br /> Process
                </h2>
                <div className="mt-4 text-lg">
                  <Link
                    to="/shop"
                    className="font-semibold text-white underline"
                  >
                    Shop <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Image Grid */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-6">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <img
                      alt="Book Logo"
                      src="https://thumbs.dreamstime.com/b/minimalist-book-logo-silhouette-white-background-minimalist-book-logo-silhouette-white-background-320585656.jpg"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg object-cover"
                    />
                    <img
                      alt="Money Logo"
                      src="https://www.shutterstock.com/image-vector/money-logo-design-vector-illustrative-600nw-1810454230.jpg"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
