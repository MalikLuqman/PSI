import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  SendTimeExtensionIcon,
  BookOpenIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UploadFileOutlinedIcon,
  MenuBookOutlinedIcon,
  HomeOutlinedIcon,
  XMarkIcon,
  Bars3Icon,
  LocalShippingOutlinedIcon,
  CurrencyDollarIcon,
  ShoppingCartOutlinedIcon,
  ArchiveBoxIcon,
} from "../../utils/icons";
import SideNavbar from "../../Components/Dashboard/SideNavbar";
import { useState, useEffect } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import PSI_Logo from "../../../public/logos/PSI_Logo.png";
//Side Menus Dashboard
export default function DashboardIndex() {
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
            name: "Books for sale",
            href: "/dashboard/books-for-sale",
            icon: ShoppingCartOutlinedIcon,
            current: false,
          },
          {
            name: "Books Subjects",
            href: "/dashboard/books-subjects",
            icon: ShoppingCartOutlinedIcon,
            current: false,
          },
          {
            name: "All Transactions",
            href: "/dashboard/all-transactions",
            icon: CurrencyDollarIcon,
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div className=" m-0 p-0 flex">
                  <Link to="/home">
                    <img
                      src={PSI_Logo}
                      alt="Book Logo"
                      className="h-[7rem] w-auto "
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
                                  : "text-gray-300 hover:bg-lime-800 hover:text-white",
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
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <SideNavbar />

        {/* uncomment below code if you want to open side menu in mobile view */}
        <div className="lg:pl-72">
          {/* <div className=" top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />
          </div> */}

          <main className="py-2">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
