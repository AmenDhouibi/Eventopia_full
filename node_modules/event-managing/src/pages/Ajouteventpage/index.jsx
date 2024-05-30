import React from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Input, Text, DatePicker, Heading } from "../../components";

export default function AjouteventpagePage() {
  return (
    <>
      <header className="absolute left-0 right-0 top-[12.77px] m-auto flex w-[98%] items-center justify-between gap-5 sm:relative sm:flex-col">
        <div className="relative mb-[7px] h-[50px] w-[15%] sm:w-full">
          <Img
            src="images/img_frame.svg"
            alt="image"
            className="absolute left-0 top-0 m-auto h-[45px] w-[45px]"
          />
          <Text size="lg" as="p" className="absolute bottom-[-0.51px] right-0.45 m-auto text-center lowercase">
            eventopia
          </Text>
        </div>
        <Img src="images/img_frame_blue_gray_900.svg" alt="image_one" className="h-[45px] w-[5%] sm:w-full" />
      </header>

      <div className="absolute bottom-[2%] left-[35%] m-auto h-[1000px] w-[40%]">
        <div className="absolute bottom-[250px] right-[0.00px] m-auto flex flex-col items-center rounded-[20px] bg-blue_gray-100_7f p-[5px] shadow-xs sm:p-3 w-full">
          <Heading size="xs" className="text-center uppercase">
            Get Involved, Make Memories
          </Heading>

          <div className="mt-[5px] flex flex-col items-start w-full">
            <Text size="xs" as="p" className="ml-[3px] text-center md:lg-0">
              event name
            </Text>
            <Input shape="round" name="name" className="flex gap-[5px] self-stretch rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs sm:py-3 sm:pl-3 w-full" />
          </div>

          <div className="mt-[5px] flex flex-col items-start gap-[3px] w-full">
            <Text size="xs" as="p" className="ml-[3px] text-center md:ml-0">
              event date
            </Text>
            <DatePicker
              name="calendar"
              className="flex gap-[5px] self-stretch rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs sm:py-3 sm:pl-3 w-full"
            />
          </div>

          <div className="mt-[5px] flex flex-col items-start w-full">
            <Text size="xs" as="p" className="ml-2 text-center md:ml-0">
              event place
            </Text>
            <Input
              shape="round"
              name="grouptwo"
              prefix={
                <Img src="images/img_frame_blue_gray_900_20x20.svg" alt="Frame" className="h-[20px] w-[20px]" />
              }
              className="flex gap-[5px] self-stretch rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs sm:py-3 sm:pl-3 w-full"
            />
          </div>

          <div className="ml-2 mt-2 flex flex-col items-start gap-[3px] self-start w-full">
            <Text size="xs" as="p" className="ml-2 text-center md:lg-0">
              event affiche
            </Text>
            <Input
              shape="round"
              name="groupthree"
              prefix={<Img src="images/img_frame_20x20.svg" alt="Frame" className="h-[20px] w-[20px]" />}
              className="flex gap-[5px] self-stretch rounded-[10px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs sm:py-3 sm:pl-3 w-full"
            />
          </div>

          <a href="Guestslistpage/index.jsx" target="_blank">
            <Button
              color="blue_gray_100_7f"
              size="xs"
              variant="fill"
              rightIcon={<Img src="images/img_arrowleft.svg" alt="arrow_left" className="h-[20px] w-[20px]" />}
              className="mb-3 mr-[3px] mt-[35px] min-w-[200px] gap-[25px] self-end rounded-[23px] font-semibold md:mr-0 sm:px-3"
            >
              create now
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
