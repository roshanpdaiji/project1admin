import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorsList() {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()  // Fetch doctors when the token is available
    }
  }, [aToken, getAllDoctors])

  const handleAvailabilityChange = (doctorId) => {
    // Call changeAvailability function from context to update the doctor's availability
    changeAvailability(doctorId)
  }

  return (
    <div className="m-5 bg-gray-100 p-5 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-2">All Doctors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.image}
                alt={`${item.name}'s profile`}
                className="w-28 h-28 rounded-lg object-cover border border-gray-300"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center space-x-2">
                <input
                  onChange={() => handleAvailabilityChange(item._id)}  // Update availability on change
                  type="checkbox"
                  checked={item.available}
                  className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-300 border-gray-300 rounded"
                />
                <span className="text-gray-600">Available</span>
              </label>
              <p
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  item.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.available ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
