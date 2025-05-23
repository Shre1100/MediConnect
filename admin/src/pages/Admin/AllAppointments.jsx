import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointments } =
    useContext(AdminContext);
  const { calcAge, currency } = useContext(AppContext);

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
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-5 bg-white w-full mr-10 rounded-xl flex flex-col gap-5">
      <p className="text-xl font-semibold">All Appointments</p>
      <hr />
      <div className="flex flex-col max-h-[80vh] overflow-y-scroll">
        <div className="bg-slate-200 font-semibold rounded-xl hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>S.no</p>
          <p className="text-center">Patient</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p className="text-center">Doctor</p>
          <p>Fee</p>
          <p className="text-center">Action</p>
        </div>

        {appointments.map((item, idx) => (
          <div
            className="flex flex-wrap items-center justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b"
            key={idx}
          >
            <p className="max-sm:hidden">{idx + 1}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-10 rounded-full"
                src={item.userData.image}
                alt="Patient Image"
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calcAge(item.userData.DOB)}</p>
            <p>
              {slotDateFormat(item.slotDate)} at {item.slotTime}
            </p>
            <div className="flex items-center gap-3">
              <img
                className="w-10 rounded-full"
                src={item.docData.image}
                alt="Patient Image"
              />
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
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
  );
};

export default AllAppointments;
