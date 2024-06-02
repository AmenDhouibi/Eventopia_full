import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Text, Heading } from "../../components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function GuestslistpagePage() {
  const [guestList, setGuestList] = useState([]);
  const { eventId } = useParams(); // Use useParams hook to retrieve the eventId

  useEffect(() => {
    console.log("Fetching guests...");
    const fetchGuests = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:3000/api/events/${eventId}/guests`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const guestIds = response.data;

        const guestsWithUser = await Promise.all(
          guestIds.map(async (guestId) => {
            try {
              if (!guestId) {
                // Skip if guestId is null or undefined
                return null;
              }

              const guestResponse = await axios.get(
                `http://localhost:3000/api/guest/${guestId}`
              );
              const guest = guestResponse.data;

              if (guest.user) {
                const userDetailsResponse = await axios.get(
                  `http://localhost:3000/api/user/id/${guest.user}`
                );
                guest.user = userDetailsResponse.data;
                return guest;
              } else {
                return null; // Skip guest if no user object is found
              }
            } catch (error) {
              console.error(`Error fetching data for guest ${guestId}:`, error);
              return null;
            }
          })
        );

        const filteredGuests = guestsWithUser.filter((guest) => guest !== null);

        setGuestList(filteredGuests);
        console.log("Guests fetched:", filteredGuests);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };

    fetchGuests();
  }, [eventId]);

  useEffect(() => {
    console.log("guestList updated:", guestList);
  }, [guestList]);

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
          <Text
            size="lg"
            as="p"
            className="absolute bottom-[-0.51px] right-0.25 m-auto text-center lowercase"
          >
            <a href="/">eventopia</a>
          </Text>
        </div>

        <Link to="/driverslistpage">
          <Button
            color="blue_gray_100_7f"
            size="xs"
            variant="fill"
            rightIcon={
              <Img
                src="images/img_arrowleft.svg"
                alt="arrow_left"
                className="h-[20px] w-[20px]"
              />
            }
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
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Guest ID
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Luggage
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Flight ID
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Availability Status
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    User Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {guestList.map((guest, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {guest._id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {guest.luggage || 'No luggage info'}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {guest.flightId || 'No flight info'}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {guest.availabilityStatus || 'No availability info'}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {guest.user.username || 'User data not available'}
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
