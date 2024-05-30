import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Text, Heading } from "../../components";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function GuestslistpagePage({ guests, allGuests }) {
  const [guestList, setGuestList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGuestIndex, setSelectedGuestIndex] = useState(null);

  useEffect(() => {
    if (guests) {
      setGuestList(guests);
    }
  }, [guests]);

  const handleDelete = (index) => {
    // Remove the guest from db.event.guests
    const newGuestList = [...guestList];
    newGuestList.splice(index, 1);
    setGuestList(newGuestList);
  };

  const handleAddDriver = (index) => {
    setSelectedGuestIndex(index);
    setShowPopup(true);
  };

  const selectDriver = (driver) => {
    const newGuestList = [...guestList];
    newGuestList[selectedGuestIndex].driver = driver.name;
    setGuestList(newGuestList);
    setShowPopup(false);
  };

  return (
    <>
      <Helmet>
        <title>Guests List Page</title>
      </Helmet>
      <header className="absolute left-0 right-0 top-[12.77px] m-auto flex w-[98%] items-center justify-between gap-5 sm:relative sm:flex-col">
      <div className="relative mb-[7px] h-[50px] w-[15%] sm:w-full">
          <Img
            src="images/img_frame.svg"
            alt="image"
            className="absolute left-0 top-0 m-auto h-[45px] w-[45px]"
          />
          <Text size="lg" as="p" className="absolute bottom-[-0.51px] right-0.25 m-auto text-center lowercase">
            eventopia
          </Text>
        </div>
        
        <Link to="/driverslistpage">
          <Button
            color="blue_gray_100_7f"
            size="xs"
            variant="fill"
            rightIcon={<Img src="images/img_arrowleft.svg" alt="arrow_left" className="h-[20px] w-[20px]" />}
            className="mb-3 mr-[3px] mt-[35px] min-w-[200px] gap-[25px] self-end rounded-[23px] font-semibold md:mr-0 sm:px-3"
          >
            Drivers' List
          </Button>
        </Link>


      </header>
      <div className="absolute left-[17%] m-auto h-[300px] w-[70%]">
        <div className="absolute bottom-[0.00px] right-[0.00px] m-auto flex flex-col items-center rounded-[20px] bg-blue_gray-100_7f p-[5px] shadow-xs sm:p-3 w-full">
          <Heading size="xs" className="text-center uppercase">
            Guests coming to your event
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
                  <th className="px-4 py-2 border-b border-gray-200 text-left">Guest</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">Flight id</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">Phone</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">Luggage</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">Status</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">Driver</th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                {guestList.map((guest, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">{guest.user.name}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{guest.flightId}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{guest.user.phoneNumber}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{guest.luggage}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{guest.availibilityStatus}</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {guest.driver ? (
                        guest.driver
                      ) : (
                        <Button
                          size="xs"
                          variant="fill"
                          className="min-w-[50px] bg-green-500 text-white flex items-center justify-center"
                          onClick={() => handleAddDriver(index)}
                        >
                          Add
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <Button
                        size="xs"
                        variant="fill"
                        className="min-w-[50px] bg-red-500 text-white flex items-center justify-center"
                        onClick={() => handleDelete(index)}
                      >
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
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Select a Driver</h3>
            <ul>
              {allGuests.map((driver, index) => (
                <li key={index} className="mb-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => selectDriver(driver)}
                  >
                    {driver.name}
                  </button>
                </li>
              ))}
            </ul>
            <Button
              size="xs"
              variant="fill"
              className="min-w-[50px] bg-red-500 text-white flex items-center justify-center mt-4"
              onClick={() => setShowPopup(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
