import React from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text } from "../../components";

export default function ProfilepagePage() {

  const handleDeleteProfile = () => {
    console.log("Profile deleted");
    // axios.delete('/api/delete-profile').then(response => console.log(response)).catch(error => console.error(error));
  };

  const handleSignOut = () => {
    console.log("Signed out");
    // axios.post('/api/sign-out').then(response => console.log(response)).catch(error => console.error(error));
    window.location.href = "/";
  };

  return (
    <>
      <Helmet>
        <title>User Profile - Manage Your Information and Events</title>
      </Helmet>

      {/* profile section */}
      <div className="flex h-[70%] w-full items-center justify-center">
        <div className="flex w-full max-w-[70%] max-h-[70%] flex-col items-start">
          {/* header logo section */}
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
          {/* user information section */}
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
                    Nourhen Khechine
                    <br />
                  </span>
                  <span className="text-black-900">Email :&nbsp;</span>
                  <br />
                  <span className="font-light text-black-900">
                    nourhan.khechine@insat.ucar.tn
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

          {/* events section */}
          <div className="ml-[84px] mt-9 flex flex-col items-start justify-center gap-[35px] self-stretch rounded-[30px] bg-blue_gray-100_7f pb-[202px] pl-[50px] pr-7 pt-[21px] shadow-xs md:ml-0 md:pb-5 md:pl-5 sm:p-5">
            <Heading size="xs"  className="uppercase">
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
