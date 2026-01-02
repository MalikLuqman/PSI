import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosinstance";
import { useState, useEffect } from "react";
import functions from "../../utils/GlobalFunctions";
import { FallingLines, RotatingLines } from "react-loader-spinner";


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
        <div className="bg-gray-800 p-6">
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
                <p className="text-sm font-medium text-white">Welcome</p>
                <p className="text-xl font-bold text-lime-500 sm:text-2xl">
                  {userData?.name}
                </p>
                <p className="text-sm font-medium text-amber-500 italic">
                  {user_role === 1 ? "Admin" : ""}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <Link
                to="/dashboard/profile"
                className="flex items-center justify-center rounded-md bg-lime-700 px-3 py-2 text-sm font-semibold text-white shadow-md  hover:bg-lime-600"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}
