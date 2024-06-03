import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text } from "../../components";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export

export default function ProfilepagePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [firstEvent, setFirstEvent] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const accessToken = localStorage.getItem("accessToken");
      let decodedToken;
      try {
        decodedToken = jwtDecode(accessToken);
        console.log('Decoded Token:', decodedToken);
      } catch (err) {
        console.error('Error decoding token:', err);
        throw new Error('Failed to decode token');
      }

      const { user_id } = decodedToken;
      console.log('User ID:', user_id);

      try {
        const userDetailsResponse = await axios.get(`http://localhost:3000/api/user/id/${user_id}`);
        setUserDetails(userDetailsResponse.data);

        // Ensure user data is loaded properly
        const user = userDetailsResponse.data;
        console.log('User:', user);

        if (user && user.ownedEvents && user.ownedEvents.length > 0) {
          const eventId = user.ownedEvents[0]; // Assuming you want the first owned event
          const token = localStorage.getItem("accessToken");
          const eventResponse = await axios.get(`http://localhost:3000/api/events/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const event = eventResponse.data;
          console.log('Event Details:', event);
          setFirstEvent({ id: eventId, name: event.name, description: event.description });
        } else {
          console.log('No owned events found for the user.');
        }
      } catch (err) {
        console.error('Error fetching user details or events:', err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDeleteProfile = async () => {
    if (!userDetails || !userDetails.email) {
      console.error('User details or email not available');
      return;
    }


    try {
      localStorage.removeItem("accessToken");
      await axios.delete(`http://localhost:3000/api/user/delete`, {
        data: { email: userDetails.email },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("Profile deleted");
      window.location.href = "/";
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      alert("Signing out!");
      console.log("Signed out");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>User Profile - Manage Your Information and Events</title>
      </Helmet>

      <div className="flex h-[70%] w-full items-center justify-center">
        <div className="flex w-full max-w-[70%] max-h-[70%] flex-col items-start">
          <div className="relative mb-[7px] h-[50px] w-[15%] sm:w-full">
            <Img
              src="images/img_frame.svg"
              alt="image"
              className="absolute left-0 top-0 m-auto h-[45px] w-[45px]"
            />
            <Text size="lg" as="p" className="absolute bottom-[-0.51px] right-0.45 m-auto text-center lowercase">
              <a href="/">Eventopia</a>
            </Text>
          </div>

          <div className="ml-[84px] mt-[58px] flex flex-col items-start gap-5 self-stretch rounded-[30px] bg-blue_gray-100_7f pb-[45px] pl-[50px] pr-[126px] pt-[17px] shadow-xs md:ml-0 md:px-5 md:pb-5">
            <div className="flex w-full flex-col items-start">
              <Heading size="xs" className="uppercase">
                Your Information
              </Heading>
              <div className="">
                <Heading
                  size="xs"
                  className="mb-[27px] w-full !font-semibold !text-black-900"
                >
                  <span className="text-black-900">Username:&nbsp;</span>
                  <br />
                  <span className="font-light text-black-900">
                    {userDetails.username}
                    <br />
                  </span>
                  <span className="text-black-900">Email:&nbsp;</span>
                  <br />
                  <span className="font-light text-black-900">
                    {userDetails.email}
                    <br />
                  </span>
                  {/* <span className="text-black-900">Phone:&nbsp;</span>
                  <br />
                  <span className="font-light text-black-900">
                    {userDetails.phoneNumber}
                  </span> */}
                </Heading>
              </div>
            </div>
            <div className="flex w-full flex-col gap-[38px]">
              <Button
                color="blue_gray_100_7f"
                shape="round"
                size="xs"
                className="w-full font-semibold sm:px-5"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </Button>
              <Button
                color="red_400_e5"
                shape="round"
                size="xs"
                className="w-full font-semibold sm:px-5"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div className="ml-[84px] mt-9 flex flex-col items-start justify-center gap-[35px] self-stretch rounded-[30px] bg-blue_gray-100_7f pb-[202px] pl-[50px] pr-7 pt-[21px] shadow-xs md:ml-0 md:pb-5 md:pl-5 sm:p-5">
            <Heading size="xs" className="uppercase">
              Your Events
            </Heading>
            <div className="ml-[25px] flex items-end gap-3.5 self-stretch md:ml-0 md:flex-col">
              {firstEvent ? (
                <div className="flex gap-[5px] self-start bg-white rounded-lg p-3">
                  <div>
                    <Heading
                      size="xs"
                      className="mb-[27px] w-full !font-semibold !text-black-900"
                    >
                      <span className="text-black-900">Event Name:&nbsp;</span>
                      <br />
                      <span className="font-light text-black-900">{firstEvent.name}</span>
                      <br />
                      <span className="text-black-900">Description:&nbsp;</span>
                      <br />
                      <span className="font-light text-black-900">{firstEvent.description}</span>
                    </Heading>
                  </div>
                  <div className="ml-auto">
                    <Button shape="round" size="xs" className="font-semibold sm:px-5">
                      <a href={`/guestslistpage/${firstEvent.id}`}>Guests List</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div>No events found</div>
              )}
              <Button shape="round" size="xs" className="w-full flex-1 font-semibold md:self-stretch sm:px-5">
                <a href="/sendmailguestpage">Invite Speaker</a>
              </Button>
              <Button shape="round" size="xs" className="w-full flex-1 font-semibold md:self-stretch sm:px-5">
                <a href="/sendmaildriverpage">Invite Driver</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}