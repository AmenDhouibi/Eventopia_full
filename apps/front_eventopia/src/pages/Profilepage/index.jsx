import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text } from "../../components";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export

export default function ProfilepagePage() {
  const [userDetails, setUserDetails] = useState(null);

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
      try {
        const userDetailsResponse = await axios.get(`http://localhost:3000/api/user/id/${user_id}`);
        setUserDetails(userDetailsResponse.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
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
      await axios.post('http://localhost:3000/api/sign-out', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
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
              <a href="/">eventopia</a>
            </Text>
          </div>

          <div className="ml-[84px] mt-[58px] flex flex-col items-start gap-5 self-stretch rounded-[30px] bg-blue_gray-100_7f pb-[45px] pl-[50px] pr-[126px] pt-[17px] shadow-xs md:ml-0 md:px-5 md:pb-5">
            <div className="flex w-full flex-col items-start">
              <Heading size="xs" className="uppercase">
                your information
              </Heading>
              <div className="">
                <Heading
                  size="xs"
                  className="mb-[27px] w-full !font-semibold !text-black-900"
                >
                  <span className="text-black-900">Username :&nbsp;</span>
                  <br />
                  <span className="font-light text-black-900">
                    {userDetails.username}
                    <br />
                  </span>
                  <span className="text-black-900">Email :&nbsp;</span>
                  <br />
                  <span className="font-light text-black-900">
                    {userDetails.email}
                    <br />
                  </span>
                  <span className="text-black-900">Phone :&nbsp;</span>
                  <br />
                  <span className="font-light text-black-900">+216 01 020 304</span>
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
                Delete profile
              </Button>
              <Button
                color="red_400_e5"
                shape="round"
                size="xs"
                className="w-full font-semibold sm:px-5"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          </div>

          <div className="ml-[84px] mt-9 flex flex-col items-start justify-center gap-[35px] self-stretch rounded-[30px] bg-blue_gray-100_7f pb-[202px] pl-[50px] pr-7 pt-[21px] shadow-xs md:ml-0 md:pb-5 md:pl-5 sm:p-5">
            <Heading size="xs" className="uppercase">
              your events
            </Heading>
            <div className="ml-[25px] flex items-end gap-3.5 self-stretch md:ml-0 md:flex-col">
              <div className="flex flex-col gap-[5px] shadow-xs">
                <div className="flex gap-[5px] self-start">
                  <Button color="blue_gray_900" size="xs" shape="square" className="min-w-[215px] font-bold uppercase sm:px-5">
                    id
                  </Button>
                  <Button color="blue_gray_900" size="xs" shape="square" className="min-w-[714px] font-bold uppercase sm:px-5">
                    event name
                  </Button>
                </div>
                <div className="flex items-center gap-[5px] self-start">
                  <Button
                    color="white_A700_7f"
                    size="xs"
                    shape="square"
                    className="min-w-[214px] font-bold uppercase sm:px-5"
                  >
                    001
                  </Button>
                  <Button color="white_A700_7f" size="xs" shape="square" className="min-w-[715px] font-bold uppercase sm:px-5">
                    <a href="/guestslistpage">hello world!</a>
                  </Button>
                </div>
              </div>
              <Button shape="round" size="xs" className="w-full flex-1 font-semibold md:self-stretch sm:px-5">
                <a href="/sendmailguestpage">Invite speaker</a>
              </Button>
              <Button shape="round" size="xs" className="w-full flex-1 font-semibold md:self-stretch sm:px-5">
                <a href="/sendmaildriverpage">Invite driver</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
