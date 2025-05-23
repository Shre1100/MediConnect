import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { getDashData, setDashData,completeAppointment, cancelAppointment ,dashData, dToken } =
    useContext(DoctorContext);
    const {currency} = useContext(AppContext);

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
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData &&
    dashData.latestAppointments && (
      <div className="flex flex-col max-h-[86vh] md:flex-row w-full mr-10 p-5">
        {/* for data blocks  */}
        <div className="flex md:flex-col md:min-w-72 flex-wrap gap-10">
          <div className="flex flex-col rounded-2xl hover:scale-105 duration-200 hover:shadow-2xl justify-center gap-3 bg-white p-5">
            <div className="flex gap-5 items-center">
              <img src={assets.earning_icon} alt="" />
              <p className="text-lg font-semibold text-gray-600">
                Total Earnings
              </p>
            </div>

            <p className="text-2xl font-semibold text-gray-800 text-center p-2 bg-slate-200 rounded-2xl">
              {currency} {dashData.totalEarning}
            </p>
          </div>

          <div className="flex flex-col rounded-2xl hover:scale-105 duration-200 hover:shadow-2xl justify-center gap-3 bg-white p-5">
            <div className="flex gap-5 items-center">
              <img src={assets.appointments_icon} alt="" />
              <p className="text-lg font-semibold text-gray-600">
                Appointments
              </p>
            </div>
            <p className="text-2xl font-semibold text-gray-800 text-center p-2 bg-slate-200 rounded-2xl">
              {dashData.appointments}
            </p>
          </div>

          <div className="flex flex-col rounded-2xl hover:scale-105 duration-200 hover:shadow-2xl justify-center gap-3 bg-white p-5">
            <div className="flex gap-5 items-center">
              <img src={assets.patients_icon} alt="" />
              <p className="text-lg font-semibold text-gray-600">
                Number of Patients
              </p>
            </div>
            <p className="text-2xl font-semibold text-gray-800 text-center p-2 bg-slate-200 rounded-2xl">
              {dashData.patients}
            </p>
          </div>
        </div>

        {/* for recent appointments  */}
        <div className="ml-10 w-full bg-white p-5 rounded-2xl">
          <div className="flex gap-3 border-b-3 border-b-gray-500 items-center p-4">
            <img className="w-5 h-5" src={assets.list_icon} alt="list icon" />
            <p className="text-lg font-semibold">Recent Bookings</p>
            <button
              onClick={() => navigate("/doctor-appointments")}
              className="ml-auto px-4 bg-gray-200 py-1 rounded-2xl font-semibold text-sm cursor-pointer hover:bg-gray-400 hover:text-white"
            >
              More
            </button>
          </div>

          {dashData.latestAppointments.map((item, index) => (
            <div
              className="px-4 border-b cursor-pointer py-2 flex items-center gap-3"
              key={index}
            >
              <img
                className="w-[40px] bg-slate-200 rounded-full"
                src={item.userData.image}
                alt="doctor image"
              />

              <div className="min-w-2/3 ml-3">
                <p className="text-[17px]">{item.userData.name}</p>
                <p className="text-sm font-semibold text-gray-500">
                  {" "}
                  Scheduled on :- {slotDateFormat(item.slotDate)}
                </p>
              </div>

              {item.cancelled ? (
                <p className="text-red-700 cursor-default font-bold text-center">
                  Cancelled
                </p>
              ) : item.isCompleted ? (
                <p className="text-green-700 cursor-default font-bold text-center">
                  Completed
                </p>
              ) : (
                <div className="flex ml-[-20px] gap-2">
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-2 py-1 rounded-2xl bg-red-600 cursor-pointer hover:scale-105 duration-150 text-white font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => completeAppointment(item._id)}
                    className="px-2 py-1 rounded-2xl bg-green-600 cursor-pointer hover:scale-105 duration-150 text-white font-semibold"
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
