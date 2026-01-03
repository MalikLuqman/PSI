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
  SearchOutlinedIcon,
  LocationSearchingOutlinedIcon,
  AssignmentOutlinedIcon
} from "../../utils/icons";
import PSI_Logo from "../../../public/logos/PSI_Logo.png";

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
      name: "Subscriber Search",
      href: "/dashboard/subscriber",
      icon: SearchOutlinedIcon,
      current: false,
    },
          {
            name: "Bulk Lookup",
            href: "/dashboard/bulk-lookup",
            icon: LocationSearchingOutlinedIcon,
            current: false,
          },
          {
            name: "Logs",
            href: "/dashboard/all-transactions",
            icon: AssignmentOutlinedIcon,
            current: false,
          },
          // {
          //   name: "Users",
          //   href: "/dashboard/users",
          //   icon: UserGroupIcon,
          //   current: false,
          // },   
  ];

  useEffect(() => {}, [location.pathname]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-4 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="mt-0 p-0 flex justify-center items-center">
            <Link to="/dashboard">
              <img
                src={PSI_Logo}
                alt="PSI Logo"
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
                            ? "bg-lime-700 text-white"
                            : "text-gray-300 hover:bg-lime-600 hover:text-white",
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
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
