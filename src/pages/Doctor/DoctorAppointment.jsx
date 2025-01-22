import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';


function DoctorAppointment() {
  const { dToken, appointments, getAppointments ,completeAppointment,cancelAppointment} = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);


  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
  <table className="w-full table-auto">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-3 text-left">#</th>
        <th className="px-6 py-3 text-left">Patient</th>
        <th className="px-6 py-3 text-left">Payment</th>
        <th className="px-6 py-3 text-left">Age</th>
        <th className="px-6 py-3 text-left">Date & Time</th>
        <th className="px-6 py-3 text-left">Fees</th>
        <th className="px-6 py-3 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map((item, index) => (
        <tr key={index} className="border-t">
          {/* Appointment Index */}
          <td className="px-6 py-4">{index + 1}</td>

          {/* Patient Info */}
          <td className="px-6 py-4 flex items-center gap-4">
            <img
              className="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover"
              src={item.userData.image}
              alt="User"
            />
            <p className="text-lg font-medium text-gray-800">{item.userData.name}</p>
          </td>

  {/* Payment Status */}
<td className="px-6 py-4 text-center">
  <p
    className={`px-4 py-1 rounded-full text-sm ${
      item.payment
        ? 'bg-green-500 text-white border-green-600 hover:bg-green-600'
        : 'bg-yellow-100 text-gray-800 border-yellow-600 hover:bg-yellow-200'
    }`}
  >
    {item.payment ? 'Online' : 'Cash'}
  </p>
</td>


          {/* Age */}
          <td className="px-6 py-4 text-center">{calculateAge(item.userData.dob)} years</td>

          {/* Appointment Date & Time */}
          <td className="px-6 py-4 text-center">
            {slotDateFormat(item.slotDate)}, {item.slotTime}
          </td>

          {/* Fees */}
          <td className="px-6 py-4 font-semibold">{currency}{item.amount}</td>


          <td className="px-6 py-4 text-center">
  <div className="flex items-center gap-4 justify-center">
    {item.cancelled ? (
      <p className="text-red-500 text-xs font-medium">Cancelled</p> // Optionally style it
    ) : item.isCompleted ? (
      <p className="text-green-500 text-xs">Completed</p> // Optionally style it
    ) : (
      <>
        <img
          onClick={() => cancelAppointment(item._id)}
          src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
          alt="Cancel"
          className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform"
        />
        <img
          onClick={() => completeAppointment(item._id)}
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Tick"
          className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform"
        />
      </>
    )}
  </div>
</td>

        </tr>
      ))}
    </tbody>
  </table>
</div>


    </div>
  );
}

export default DoctorAppointment;
