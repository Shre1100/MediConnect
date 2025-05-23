import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import Calendar from "../../components/Calendar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { aToken, getDashboardData, cancelAppointments, dashData } =
    useContext(AdminContext);
  const navigate = useNavigate();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    );
  };

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  return (
    dashData &&
    dashData.latestAppointments && (
      <div className="w-full flex">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full grid grid-cols-2 gap-5 mt-1">
            <div className="rounded-2xl p-3 bg-white cursor-pointer hover:scale-105 duration-150">
              <div className="flex gap-5 items-center">
                <img
                  className="rounded-full w-[50px]"
                  src={assets.doctor_icon}
                  alt="doctor icon"
                />
                <p className="text-gray-600 font-semibold text-lg">
                  Total Doctors
                </p>
              </div>
              <p className="text-3xl p-3">{dashData.doctors}</p>
            </div>

            <div className="rounded-2xl p-3 bg-white cursor-pointer hover:scale-105 duration-150">
              <div className="flex gap-5 items-center">
                <img
                  className="rounded-full w-[50px]"
                  src={assets.doctor_icon}
                  alt="request icon"
                />
                <p className="text-gray-600 font-semibold text-lg">
                  Pending Requests
                </p>
              </div>
              <p className="text-3xl p-3">3</p>
            </div>

            <div className="rounded-2xl p-3 bg-white cursor-pointer hover:scale-105 duration-150">
              <div className="flex gap-5 items-center">
                <img
                  className="rounded-full w-[50px]"
                  src={assets.appointments_icon}
                  alt="appointments icon"
                />
                <p className="text-gray-600 font-semibold text-lg">
                  Total Appointments
                </p>
              </div>
              <p className="text-3xl p-3">{dashData.appointments}</p>
            </div>

            <div className="rounded-2xl p-3 bg-white cursor-pointer hover:scale-105 duration-150">
              <div className="flex gap-5 items-center">
                <img
                  className="rounded-full w-[50px]"
                  src={assets.patients_icon}
                  alt="patient icon"
                />
                <p className="text-gray-600 font-semibold text-lg">
                  Total Users{" "}
                </p>
              </div>
              <p className="text-3xl p-3">{dashData.patients}</p>
            </div>
          </div>

          {/* for all appointments  */}
          <div className="bg-white mt-1 rounded-2xl">
            <div className="flex gap-3 border-b-3 border-b-gray-500 items-center p-4">
              <img className="w-5 h-5" src={assets.list_icon} alt="list icon" />
              <p className="text-lg font-semibold">Recent Bookings</p>
              <button
                onClick={() => navigate("/all-appointments")}
                className="ml-auto px-4 bg-gray-200 py-1 rounded-2xl font-semibold text-sm cursor-pointer hover:bg-gray-400 hover:text-white"
              >
                More
              </button>
            </div>

            <div className="pt-2">
              {dashData.latestAppointments.map((item, idx) => (
                <div
                  className="px-4 border-b cursor-pointer py-2 flex items-center gap-3"
                  key={idx}
                >
                  <img
                    className="w-[50px] bg-slate-200 rounded-full"
                    src={item.docData.image}
                    alt="doctor image"
                  />

                  <div className="min-w-2/3 ml-3">
                    <p className="text-[17px]">{item.docData.name}</p>
                    <p className="text-sm font-semibold text-gray-500">
                      {" "}
                      Scheduled on :- {slotDateFormat(item.slotDate)}
                    </p>
                  </div>

                  {item.cancelled ? (
                    <p className="px-2 py-1 bg-gray-200 rounded-2xl cursor-not-allowed">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <button className="px-1 py-1 border-green-400 border-2 text-green-400 rounded-2xl cursor-default font-semibold">
                      Completed
                    </button>
                  ) : (
                    <button
                      onClick={() => cancelAppointments(item._id)}
                      className="px-4 py-1 bg-red-400 rounded-2xl cursor-pointer hover:bg-red-600 text-white font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/4">
          <Calendar />
        </div>
      </div>
    )
  );
};

export default Dashboard;
