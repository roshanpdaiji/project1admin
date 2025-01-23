import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

function AllAppointments() {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, formatSlotTime, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <p className="mb-5 text-2xl font-semibold text-gray-800 border-b pb-3">All Appointments</p>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-sm text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-700 font-semibold uppercase">
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-4 py-3 text-center">#</th>
                <th className="border-r border-gray-300 px-4 py-3 text-center">Patient</th>
                <th className="border-r border-gray-300 px-4 py-3 text-center">Age</th>
                <th className="border-r border-gray-300 px-4 py-3 text-center">Date & Time</th>
                <th className="border-r border-gray-300 px-4 py-3 text-center">Doctor</th>
                <th className="border-r border-gray-300 px-4 py-3 text-center">Fees</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.length > 0 ? (
                appointments.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-all duration-200 border-b border-gray-300">
                    <td className="border-r border-gray-300 px-4 py-3 text-center">{index + 1}</td>
                    <td className="border-r border-gray-300 px-4 py-3 flex items-center gap-3">
                      <img
                        src={item.userData.image || '/default-avatar.png'}
                        alt={`${item.userData.name}'s avatar`}
                        className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                      />
                      <span className="text-lg font-medium">{item.userData.name}</span>
                    </td>
                    <td className="border-r border-gray-300 px-4 py-3 text-center">{calculateAge(item.userData.dob)}</td>
                    <td className="border-r border-gray-300 px-4 py-3 text-center">
                      {slotDateFormat(item.slotDate)}, {formatSlotTime(item.slotTime)}
                    </td>
                    <td className="border-r border-gray-300 px-4 py-3 flex items-center gap-3">
                      <img
                        src={item.docData.image || '/default-avatar.png'}
                        alt={`${item.docData.name}'s avatar`}
                        className="w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-gray-200"
                      />
                      <span className="text-lg font-medium">{item.docData.name}</span>
                    </td>
                    <td className="border-r border-gray-300 px-4 py-3 text-center font-semibold">
                      {currency}{item.amount}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        {item.cancelled ? (
                          <button className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-600 to-red-800 rounded-md cursor-not-allowed shadow-lg text-lg font-semibold hover:scale-105 transition-all duration-300 ease-in-out">
                            <img className="h-4 mr-2" src="https://cdn-icons-png.flaticon.com/512/5268/5268671.png" alt="Cancelled Icon" />
                            Cancelled
                          </button>
                        ) : item.isCompleted ? (
                          <p>Completed</p>
                        ) : (
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 shadow-md transition-all"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllAppointments;
