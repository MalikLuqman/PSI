import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosinstance";
import { useState, useEffect } from "react";
import functions from "../../utils/GlobalFunctions";
import { FallingLines, RotatingLines } from "react-loader-spinner";

const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];
const stats_2 = [
  { name: "Total Books", stat: "71,897" },
  { name: "Avg Selling", stat: "58.16%" },
  { name: "Avg Orders", stat: "24.57%" },
];

export default function DashboardHome() {
  const user_role = parseInt(localStorage.getItem("role_id"));
  const user_id = localStorage.getItem("user_id");

  const [userData, setUserData] = useState();
  const [dataLoading, setDataLoading] = useState(true);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const res = await axiosInstance.get(`/api/auth/show_user/${user_id}`);
      setUserData(res?.data?.data);
    } catch (error) {
    } finally {
      setDataLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log("data: ", userData);

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 id="profile-overview-title" className="sr-only">
          Profile Overview
        </h2>
        <div className="bg-gray-200 p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="shrink-0">
                {!dataLoading ? (
                  <img
                    alt=""
                    src={functions.imageUrlGenerator(userData?.image_url)}
                    className="mx-auto size-20 rounded-full"
                  />
                ) : (
                  <div>
                    <RotatingLines
                      color="#FF7B00"
                      height="42"
                      width="42"
                      visible={true}
                      ariaLabel="rotating-lines-loading"
                    />
                  </div>
                )}
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Welcome</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {userData?.name}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {user_role === 1 ? "Admin" : ""}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <Link
                to="/dashboard/profile"
                className="flex items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-md  hover:bg-orange-600"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-center text-sm font-medium"
            >
              <span className="text-gray-900">{stat.value}</span>{" "}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div> */}
      </div>
      {/* <div className="pb-4">
        <h3 className="text-base font-semibold text-gray-900">Last 30 days</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats_2.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-gray-200 px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div> */}
    </>
  );
}
