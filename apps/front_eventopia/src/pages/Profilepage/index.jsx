import React from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text } from "../../components";

export default function ProfilepagePage() {
  return (
    <>
      <Helmet>
        <title>User Profile - Manage Your Information and Events</title>
      </Helmet>

      {/* profile section */}
      <div className="flex h-[1080px] w-full items-center justify-center px-[15px] pb-[87px] pt-[15px] md:h-auto md:pb-5">
        <div className="mx-auto flex w-full max-w-[1752px] flex-col items-start">
          {/* header logo section */}
          <div className="relative mb-[600px] h-[50px] w-[15%] sm:w-full">
            <Img
                src="images/img_frame.svg"
                alt="image"
                className="absolute left-0 top-10 m-auto h-[45px] w-[45px]"
            />
            <Text size="lg" as="p" className="absolute bottom-[-0.51px] right-0.25 m-auto text-center lowercase">
                eventopia
            </Text>
          </div>
          {/* user information section */}
          <div className="ml-[84px] mt-[58px] flex items-center justify-between gap-5 self-stretch rounded-[30px] bg-blue_gray-100_7f pb-[45px] pl-[50px] pr-[126px] pt-[17px] shadow-xs md:ml-0 md:flex-col md:px-5 md:pb-5">
            <div className="flex w-[69%] flex-col items-start md:w-full">
              <Heading as="h1" className="uppercase">
                your information
              </Heading>
              <div className="relative mt-[-1px] flex items-center justify-between gap-5 self-stretch md:flex-col">
                <Heading
                  as="h2"
                  className="mb-[27px] w-[65%] self-end !font-semibold leading-[60px] !text-black-900 md:w-full"
                >
                  <span className="text-black-900">Username :&nbsp;</span>
                  <span className="font-light text-black-900">
                    <>
                      Nourhen Khechine
                      <br />
                    </>
                  </span>
                  <span className="text-black-900">Email :&nbsp;</span>
                  <span className="font-light text-black-900">
                    <>
                      nourhan.khechine@insat.ucar.tn
                      <br />
                    </>
                  </span>
                  <span className="text-black-900">Phone :&nbsp;</span>
                  <span className="font-light text-black-900">+216 01 020 304</span>
                </Heading>
                <Img src="images/img_ellipse_1.png" alt="profile image" className="h-[266px] w-[266px] rounded-[50%]" />
              </div>
            </div>
            <div className="mb-14 flex w-[20%] flex-col gap-[38px] self-end md:w-full">
              <Button color="blue_gray_100_7f" shape="round" className="w-full font-semibold sm:px-5">
                Edit profile
              </Button>
              <Button color="red_400_e5" shape="round" className="w-full font-semibold sm:px-5">
                Sign out
              </Button>
            </div>
          </div>

          {/* events section */}
          <div className="ml-[84px] mt-9 flex flex-col items-start justify-center gap-[35px] self-stretch rounded-[30px] bg-blue_gray-100_7f pb-[202px] pl-[50px] pr-7 pt-[21px] shadow-xs md:ml-0 md:pb-5 md:pl-5 sm:p-5">
            <Heading as="h2" className="uppercase">
              your events
            </Heading>
            <div className="ml-[25px] flex items-end gap-3.5 self-stretch md:ml-0 md:flex-col">
              <div className="flex flex-col gap-[5px] shadow-xs">
                <div className="flex gap-[5px] self-start">
                  <Button color="blue_gray_900" shape="square" className="min-w-[215px] font-bold uppercase sm:px-5">
                    id
                  </Button>
                  <Button color="blue_gray_900" shape="square" className="min-w-[714px] font-bold uppercase sm:px-5">
                    event name
                  </Button>
                </div>
                <div className="flex items-center gap-[5px] self-start">
                  <Button
                    color="white_A700_7f"
                    size="md"
                    shape="square"
                    className="min-w-[214px] font-bold uppercase sm:px-5"
                  >
                    001
                  </Button>
                  <Button color="white_A700_7f" shape="square" className="min-w-[715px] font-bold uppercase sm:px-5">
                    hello world!
                  </Button>
                </div>
              </div>
              <Button shape="round" className="w-full flex-1 font-semibold md:self-stretch sm:px-5">
              <a href="/sendmailguestpage">Invite speaker</a>
              </Button>
              <Button>
              <a href="/sendmaildriverpage">Send mail</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
