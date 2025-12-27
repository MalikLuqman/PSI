import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import {
  MenuBookOutlinedIcon,
  HomeOutlinedIcon,
  LocalShippingOutlinedIcon,
  CurrencyDollarIcon,
  ShoppingCartOutlinedIcon,
  ImportContactsOutlinedIcon,
  RttOutlinedIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
} from "../../utils/icons";
import BookLogo from "../../../public/logos/BookLogo.png";

const SideNavbar = () => {
  const { id } = useParams();
  const location = useLocation();
  const role = localStorage.getItem("role_id");

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeOutlinedIcon,
      current: true,
    },
    {
      name: "Books",
      href: "/dashboard/books",
      icon: MenuBookOutlinedIcon,
      current: false,
    },
    ...(role === "1"
      ? [
          {
            name: "Books For Sale",
            href: "/dashboard/books-for-sale",
            icon: ShoppingCartOutlinedIcon,
            current: false,
          },
          {
            name: "Books Subjects",
            href: "/dashboard/books-subjects",
            icon: RttOutlinedIcon,
            current: false,
          },
          {
            name: "All Transactions",
            href: "/dashboard/all-transactions",
            icon: CurrencyDollarIcon,
            current: false,
          },
          {
            name: "Users",
            href: "/dashboard/users",
            icon: UserGroupIcon,
            current: false,
          },
        ]
      : []),
    ...(role === "2"
      ? [
          {
            name: "Transactions",
            href: "/dashboard/user-transactions",
            icon: CurrencyDollarIcon,
            current: false,
          },
        ]
      : []),
    {
      name: "Orders",
      href: "/dashboard/books-orders",
      icon: ArchiveBoxIcon,
      current: false,
    },
  ];

  useEffect(() => {}, [location.pathname]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-4 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="mt-0 p-0  flex">
            <Link to="/home">
              <img
                src={BookLogo}
                alt="Book Logo"
                className="h-[6rem] w-auto "
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-orange-500 text-white"
                            : "text-gray-300 hover:bg-orange-500 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-6 shrink-0"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-orange-500"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0"
                  />
                  Settings
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
