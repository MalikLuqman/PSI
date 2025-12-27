import React from "react";
import { Link } from "react-router-dom";
const products = [
  {
    id: 1,
    name: "Cambridge O-Level Mathematics Coursebook (3rd Edition)",
    category: "Mathematics",
    href: "#",
    price: "$1200",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0132/0583/1737/files/o-lwbvwmath.png?v=1722256435",
    imageAlt:
      "Master the subject of mathematics with the Cambridge O-Level Mathematics (4024) Coursebook (3rd Edition).",
  },

  {
    id: 3,
    name: "Cambridge IGCSE & O Level Computer Science",
    category: "Computer Science",
    href: "#",
    price: "$1200",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7SwNq2MkCt010ekjr9T_iLo-MUmeSKBi5Q&s",
    imageAlt:
      "Cambridge IGCSE & O Level Computer Science David Watson Hodder 2nd Edition by David Watson, Helen Williams",
  },
  {
    id: 4,
    name: "Cambridge IGCSE & O Level Computer Science",
    category: "Computer Science",
    href: "#",
    price: "$1200",
    imageSrc:
      "https://img.drz.lazcdn.com/static/pk/p/a56680ded4cae81ce7261f8977e3a325.jpg_720x720q80.jpg",
    imageAlt:
      "Cambridge IGCSE & O Level Computer Science David Watson Hodder 2nd Edition by David Watson, Helen Williams",
  },
  // More products...
];

export const OLevelSection = () => {
  return (
    <section aria-labelledby="category-heading" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2
            id="category-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Shop books
          </h2>
          <Link
            to="/shop"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Browse all books
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                >
                  <div className="w-full rounded-md bg-white/75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                    View Product
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                <h3>
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p>{product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <a
            href="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};
