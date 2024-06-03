import React, { useState } from "react";
import { Img, Button, Input, Text, Heading } from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function DriverformpagePage() {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    trunk_space: "",
    available_places: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    const guestData = {
      user, 
      trunk_space: parseInt(formData.trunk_space),
      places: parseInt(formData.available_places),
 
    };
    try {
      const response = await axios.post(`http://localhost:3000/api/staff/${eventId}`, guestData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pass the token for authentication
        },
      });

      if (response.status === 201) {
        console.log(response.data);
        const staff = response.data;
        const staffId = staff._id;
        console.log(staff)
        console.log(staffId)

        try {
          const eventResponse = await axios.post(`http://localhost:3000/api/events/${eventId}/guests/${staffId}`, staff, {
            headers: {
              "Authorization": `Bearer ${token}`, // Pass the token for authentication
            },
          });

          if (eventResponse.status === 201) {
            console.log(eventResponse.data)
            alert("Form submitted successfully!");

          
          } else {
            alert("Failed to link driver to event. Please try again.");
          }
        } catch (eventError) {
          console.error("Error linking driver to event:", eventError);
          alert("An error occurred while linking the driver to the event. Please try again.");
        }
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <header className="absolute left-0 right-0 top-[2px] m-auto flex w-[98%] items-center justify-between gap-5 sm:relative sm:flex-col">
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
        <Img
          src="images/img_frame_blue_gray_900.svg"
          alt="image_one"
          className="h-[45px] w-[5%] sm:w-full"
        />
      </header>
      <div className="absolute bottom-[25%] left-[35%] m-auto h-[660px] w-[40%]">
        <form onSubmit={handleSubmit} className="absolute bottom-0 right-0 m-auto flex flex-col items-center rounded-[20px] bg-blue_gray-100_7f p-[80px] shadow-xs sm:p-3 w-full">
          <Heading size="xs" className="text-center uppercase">
            Welcome to our event! Please fill this form
          </Heading>
          <div className="mt-[5px] flex flex-col items-start w-full">
            <Text size="xs" as="p" className="ml-[3px] text-center">
            Number of available places
            </Text>
            <Input
              shape="round"
              name="available_places"
              value={formData.available_places}
              onChange={handleChange}
              className="flex gap-[5px] self-stretch rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs sm:py-3 sm:pl-3 w-full"
            />
          </div>
          <div className="mt-[5px] flex flex-col items-start gap-[3px] w-full">
            <Text size="xs" as="p" className="ml-[3px] text-center">
              Available trunk space
            </Text>
            <Input
              shape="round"
              name="trunk_space"
              value={formData.trunk_space}
              onChange={handleChange}
              className="flex gap-[5px] self-stretch rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs sm:py-3 sm:pl-3 w-full"
            />
          </div>
          <Button
            type="submit"
            color="blue_gray_100_7f"
            size="sm"
            variant="fill"
            rightIcon={<Img src="images/img_arrowleft.svg" alt="arrow_left" className="h-[20px] w-[20px]" />}
            className="mb-3 mr-[3px] mt-[35px] min-w-[200px] gap-[25px] rounded-[23px] font-semibold sm:px-3"
          >
            send
          </Button>
        </form>
      </div>
    </>
  );
}
