import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Text, Heading } from "../../components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function StaffListPage() {
  const [staffList, setStaffList] = useState([]);
  const { eventId } = useParams(); // Use useParams hook to retrieve the eventId

  useEffect(() => {
    console.log("Fetching staff...");
    const fetchStaff = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:3000/api/events/${eventId}/staff`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const staffIds = response.data;
        console.log(staffIds)

        const staffWithUser = await Promise.all(
          staffIds.map(async (staffId) => {
            try {
              if (!staffId) {
                // Skip if staffId is null or undefined
                return null;
              }

              const staffResponse = await axios.get(
                `http://localhost:3000/api/staff/${staffId}`
              );
              const staff = staffResponse.data;
              console.log(staff)

              if (staff.userId) {
                const userDetailsResponse = await axios.get(
                  `http://localhost:3000/api/user/id/${staff.userId}`
                );
                staff.user = userDetailsResponse.data;
                return staff;
              } else {
                return null; // Skip staff if no user object is found
              }
            } catch (error) {
              console.error(`Error fetching data for staff ${staffId}:`, error);
              return null;
            }
          })
        );

        const filteredStaff = staffWithUser.filter((staff) => staff !== null);

        setStaffList(filteredStaff);
        console.log("Staff fetched:", filteredStaff);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, [eventId]);

  useEffect(() => {
    console.log("staffList updated:", staffList);
  }, [staffList]);

  return (
    <>
      <Helmet>
        <title>Staff List Page</title>
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

        <Link to="/guestslistpage">
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
            Guests' List
          </Button>
        </Link>
      </header>
      <div className="absolute left-[17%] m-auto h-[300px] w-[70%]">
        <div className="absolute bottom-[0.00px] right-[0.00px] m-auto flex flex-col items-center rounded-[20px] bg-blue_gray-100_7f p-[5px] shadow-xs sm:p-3 w-full">
          <Heading size="xs" className="text-center uppercase">
            Staff at your event
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
                    Staff ID
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Event ID
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Places
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Trunk Space
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    User ID
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    User Name
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staff._id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staff.eventId}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staff.places}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staff.trunk_space}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staff.userId}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staff.user.username || 'User data not available'}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staff.user.phoneNumber || 'No phone info'}
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
