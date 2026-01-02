import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  XMarkIcon,
  Bars3Icon,
  ShoppingCartOutlinedIcon,
  ImportContactsOutlinedIcon,
  ChevronDownIcon,
} from "../utils/icons";
import React, { useState, useEffect, useRef } from "react";
import { HeroSection } from "../Components/HeroSection";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import CartSlideOver from "../Components/Cart/CartSlideOver";
import { Button } from "../Components/common/Button";
import auth from "../Pages/Auth/auth";
import axiosInstance from "../api/axiosinstance";
import functions from "../utils/GlobalFunctions";
import { FallingLines, RotatingLines } from "react-loader-spinner";

const navigation = {
  pages: [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "/shop" },
    { name: "Dashboard", href: "dashboard" },
  ],
};

export default function LayoutIndex() {
  const user_id = localStorage.getItem("user_id");
  const [open, setOpen] = useState(false);
  const childRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const userLoggedIn = localStorage.getItem("token");
  const user_name = localStorage.getItem("name");
  const role_id = localStorage.getItem("role_id");

  const [dataLoading, setDataLoading] = useState(true);

  const userNavigation = [{ name: "Your profile", href: "/dashboard/profile" }];

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [userData, setUserData] = useState();

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const res = await axiosInstance.get(`/api/auth/show_user/${user_id}`);
      setUserData(res?.data?.data);
    } catch (error) {
      // toast.error("Error: " + error.message);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchData();
    }
    if (
      window.location.hash == "" ||
      window.location.hash == "#/" ||
      window.location.hash == "/" ||
      window.location.hash == "/#/"
    ) {
      navigate("/home");
    }
  }, [user_id]);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-gray-900 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    key={page.name}
                    to={page.href}
                    className={classNames(
                      location.pathname === page.href
                        ? "bg-orange-500 text-white rounded-md"
                        : "text-white hover:bg-orange-500 rounded-md",
                      "-m-2 block p-2 font-medium text-white"
                    )}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative">
        {/* Top navigation */}
        <nav
          aria-label="Top"
          className="relative z-10 bg-white/70 backdrop-blur-xl backdrop-filter border-b border-gray-200"
        >
          <div className="md:ml-72 max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              {/* <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button> */}

              {/* <div className="ml-4 flex lg:ml-0">
                <Link to="/home">
                  <ImportContactsOutlinedIcon
                    className="block h-5 w-5 text-orange-500 hover:text-orange-600"
                    aria-hidden="true"
                  />
                </Link>
              </div> */}

              {/* Top navbar array */}
              {/* <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full items-center space-x-2">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className={classNames(
                        location.pathname === page.href
                          ? "bg-orange-500 text-white rounded-md"
                          : "text-white hover:bg-orange-500 rounded-md",
                        "flex items-center px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup> */}

              <div className="ml-auto flex items-center border-2 border-gray-800 p-1 rounded-md bg-gray-300">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {userLoggedIn && (
                    <Menu as="div" className="relative">
                      <MenuButton className="-m-1.5 flex items-center p-1.5">
                        <span className="sr-only">Open user menu</span>
                        {!dataLoading ? (
                          <img
                            alt="Profile Image"
                            src={functions.imageUrlGenerator(
                              userData?.image_url
                            )}
                            className="size-8 rounded-full bg-gray-50"
                          />
                        ) : (
                          <div>
                            <RotatingLines
                              visible={true}
                              height="32"
                              width="32"
                              color="#FF7B00"
                              strokeWidth="5"
                              ariaLabel="rotating-lines-loading"
                            />
                          </div>
                        )}

                        <span className="hidden lg:flex lg:items-center">
                          <span
                            aria-hidden="true"
                            className="ml-4 text-pretty font-semibold text-black"
                          >
                            {user_name}
                          </span>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="ml-2 size-5 text-black"
                          />
                        </span>
                      </MenuButton>
                      <MenuItems
                        transition
                        className="absolute right-0 z-50 mt-2.5 w-32 origin-top-right rounded-md bg-gray-300 py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            <Link
                              to={item.href}
                              className="block px-3 py-1 text-sm/6 text-gray-900 hover:text-lime-700  data-[focus]:bg-gray-50 data-[focus]:outline-none"
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                        <div className="m-1.5">
                          <Button
                            // color="green"
                            className={"rounded-xl w-full bg-lime-700 hover:bg-lime-600"}
                            onClick={async () => {
                              await auth.logout();
                              navigate("/login");
                            }}
                          >
                            sign out
                          </Button>
                        </div>
                      </MenuItems>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
