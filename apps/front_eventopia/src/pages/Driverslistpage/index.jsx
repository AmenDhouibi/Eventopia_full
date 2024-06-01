import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Text, Heading } from "../../components";
import { FaTrashAlt } from "react-icons/fa";

export default function DriverslistpagePage({ drivers }) {
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    if (drivers) {
      setDriverList(drivers);
    }
  }, [drivers]);

  const handleDelete = (index) => {
    const newDriversList = [...driverList];
    newDriversList.splice(index, 1);
    setDriverList(newDriversList);
    // delete driver from db.event.drivers
  };

  return (
    <>
      <header className="absolute left-0 right-0 top-[12.77px] m-auto flex w-[98%] items-center justify-between gap-5 sm:relative sm:flex-col">
      <div className="relative mb-[7px] h-[50px] w-[15%] sm:w-full">
          <Img
            src="images/img_frame.svg"
            alt="image"
            className="absolute left-0 top-0 m-auto h-[45px] w-[45px]"
          />
          <Text size="lg" as="p" className="absolute bottom-[-0.51px] right-0.25 m-auto text-center lowercase">
            <a href="/">eventopia</a>
          </Text>
        </div>
        <Img src="images/img_frame_blue_gray_900.svg" alt="image_one" className="h-[45px] w-[5%] sm:w-full" />
      </header>
      <div className="absolute left-[17%] m-auto h-[300px] w-[70%]">
        <div className="absolute bottom-[0.00px] right-[0.00px] m-auto flex flex-col items-center rounded-[20px] bg-blue_gray-100_7f p-[5px] shadow-xs sm:p-3 w-full">
          <Heading size="xs" className="text-center uppercase">
            Drivers details
            <Img
              src="images/img_frame.svg"
              alt="image_two"
              className="absolute left-[0.00px] top-[0.00px] m-auto h-[50px] w-[50px]"
            />
          </Heading>
          <div className="w-full overflow-y-auto max-h-[400px] mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200 text-center">Driver</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-center">Phone</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-center">Trunk space</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-center">Available places</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-center">Guests</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {driverList.map((driver, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">{driver.user.name}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{driver.user.phoneNumber}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{driver.trunkSpace}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{driver.availablePlaces}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{driver.guests}</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                    <Button
                        size="xs"
                        variant="fill"
                        className="min-w-[50px] bg-red-500 text-white flex items-center justify-center"
                        onClick={() => handleDelete(index)}
                    >   Delete
                        <FaTrashAlt />
                    </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
