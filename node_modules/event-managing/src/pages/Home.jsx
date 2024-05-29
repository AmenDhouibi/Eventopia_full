import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Text, Button, Img, Heading } from "../components";
import SignInPopup from "../components/SignInPopup";
import SignUpPopup from "../components/SignUpPopup";

const Home = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openSignInPopup = () => {
    setSignInOpen(true);
    setSignUpOpen(false); // Ensure sign-up popup is closed
  };

  const closeSignInPopup = () => {
    setSignInOpen(false);
  };

  const openSignUpPopup = () => {
    setSignUpOpen(true);
    setSignInOpen(false); // Ensure sign-in popup is closed
  };

  const closeSignUpPopup = () => {
    setSignUpOpen(false);
  };
  return (
    <>
      <div className="mb-24 flex flex-col items-center">
        <header className="flex items-center justify-between gap-5 self-stretch md:flex-col">
          <div className="relative mb-[7px] h-[85px] w-[19%] md:w-full">
            <Img
              src="images/img_frame.svg"
              alt="image"
              className="absolute left-[0.00px] top-[0.00px] m-auto h-[75px] w-[75px]"
            />
            <Text
              size="lg"
              as="p"
              className="absolute bottom-[-0.51px] right-[0.25px] m-auto text-center lowercase"
            >
              eventopia
            </Text>
          </div>
          <div className="flex w-[25%] items-center justify-center md:w-full sm:flex-col">
          <Button
            size="xs"
            shape="square"
            className="m-[5px] w-full flex-1 font-medium lowercase sm:ml-0 sm:self-stretch sm:px-5"
            onClick={openSignInPopup}
          >
            sign in
          </Button>
          <SignInPopup isOpen={isSignInOpen} onClose={closeSignInPopup} />
            
          <Button
            size="xs"
            shape="square"
            className="m-[5px] w-full flex-1 font-medium lowercase sm:ml-0 sm:self-stretch sm:px-5"
            onClick={openSignUpPopup}
          >
            sign up
          </Button>
          <SignUpPopup isOpen={isSignUpOpen} onClose={closeSignUpPopup} />
            <Img
              src="images/img_frame_blue_gray_900.svg"
              alt="image_one"
              className="ml-[41px] h-[45px] w-[17%] sm:ml-0 sm:w-full"
            />
          </div>
        </header>
        <Heading
          as="h1"
          size="xs"
          className="text-shadow-ts mt-[35px] w-[71%] text-center uppercase md:w-full"
        >
          Your Passport to <br />
          Unforgettable Moments.
        </Heading>
        <Text
          size="xs"
          as="p"
          className="mt-5 w-[85%] text-center !font-normal !text-blue_gray-900_b2 md:w-full"
        >
          At Eventopia, we&#39;re dedicated to enriching your university
          experience through vibrant, engaging, and unforgettable events
        </Text>
        <div className="mx-auto mt-[10px] flex w-full max-w-[1000px] items-start justify-between gap-0 md:flex-col md:p-5">
          <div className="relative h-[350px] w-[54%] md:w-full">
            <div className="absolute bottom-[0.00px] left-0 right-0 m-auto flex w-[97%] rounded-[30px] bg-blue_gray-100_7f p-4 shadow-xs">
              <div className="mb-3.5 mt-7 flex w-[77%] items-center gap-[25px] md:w-full sm:flex-col">
                <div className="flex w-[18%] flex-col items-center gap-[60px] sm:w-full">
                  <Text
                    size="sm"
                    as="p"
                    className="w-[93%] text-center md:w-full"
                  >
                    <>
                      April <br />
                      5
                    </>
                  </Text>
                  <Text
                    size="sm"
                    as="p"
                    className="w-[93%] text-center md:w-full"
                  >
                    <>
                      April <br />
                      20
                    </>
                  </Text>
                  <Text
                    size="sm"
                    as="p"
                    className="w-[93%] text-center md:w-full"
                  >
                    <>
                      May <br />
                      3
                    </>
                  </Text>
                </div>
                <div className="flex flex-2 flex-col sm:self-stretch">
                  <Img
                    src="images/img_line_1.svg"
                    alt="lineone_one"
                    className="h-[10px] w-[44%]"
                  />
                  <Img
                    src="images/img_line_1.svg"
                    alt="linefour_one"
                    className="mt-6 h-[10px]"
                  />
                  <Img
                    src="images/img_line_1.svg"
                    alt="linetwo_one"
                    className="mt-12 h-[10px] w-[44%]"
                  />
                  <Img
                    src="images/img_line_1.svg"
                    alt="linefour_one"
                    className="mt-6 h-[10px]"
                  />
                  <Img
                    src="images/img_line_1.svg"
                    alt="linethree_one"
                    className="mt-[66px] h-[10px] w-[44%]"
                  />
                  <Img
                    src="images/img_line_1.svg"
                    alt="linesix_one"
                    className="mt-[31px] h-[10px]"
                  />
                </div>
              </div>
            </div>
            <Button
              color="red_400"
              size="xs"
              variant="fill"
              shape="round"
              className="absolute left-[0.00px] top-[0.00px] m-auto min-w-[83px] font-montserrat font-medium"
            >
              NEW
            </Button>
          </div>
          <div className="mt-[30px] flex w-[35%] flex-col items-left md:w-full">
            <Link
              to="/ajouteventpage"
              style={{ color: "#87CEFA", textDecoration: "none" }}
            >
              <Button
                color="blue_gray_100_7f"
                size="md"
                variant="fill"
                rightIcon={
                  <Img
                    src="images/img_arrowleft.svg"
                    alt="arrow_left"
                    className="h-[20px] w-[20px]"
                  />
                }
                className=" flex w-[130%] gap-[35px] rounded-[30px] font-regular sm:px-5"
              >
                create an event{" "}
              </Button>
            </Link>
            <>
              <br />
            </>
            <Text
              size="xs"
              as="p"
              className="mt-[29px] w-[120%] text-center  !text-blue_gray-900_b2 md:w-full"
            >
              <span className="text-blue_gray-900_b2">
                Discover a world of events tailored just for you. From academic
                forums to social mixers, there&#39;s something&nbsp;
              </span>
              <span className="font-bold text-blue_gray-900_b2">for everyone</span>
              <span className="text-blue_gray-900_b2">
                <>
                  .<br />
                  .<br />
                </>
              </span>
            </Text>
            <div style={{ marginLeft: "60px" }}>
              <Text size="xs" as="p" className="flex text-center !text-blue_gray-900_a0">
                <span className="font-medium text-blue_gray-900_a0">need help?&nbsp;</span>
                <a href="#" className="font-medium text-yellow_400_c9 underline">
                  contact us
                </a>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
