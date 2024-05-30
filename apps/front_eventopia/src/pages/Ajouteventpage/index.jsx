import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Img } from "../../components";
import axios from "axios";

export default function AjouteventpagePage() {
  const [formData, setFormData] = useState({
    eventname: "",
    place: "",
    time: "",
    description: "",
    guests: "",
    staff: "",
    event_manager: "",
    poster: "",
    numberOfAttendees: "",
    sponsors: "",
    organizingClub: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/events", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Event</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="grid grid-cols-2 gap-5 w-[70%]">
          <div className="flex flex-col">
            <label htmlFor="eventname" className="text-xs">
              Event Name
            </label>
            <Input
              shape="round"
              name="eventname"
              id="eventname"
              type="text"
              value={formData.eventname}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="time" className="text-xs mt-[5px]">
              Event Date
            </label>
            <Input
              shape="round"
              name="time"
              id="time"
              type="date"
              value={formData.time}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="description" className="text-xs mt-[5px]">
              Description
            </label>
            <Input
              shape="round"
              name="description"
              id="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="guests" className="text-xs mt-[5px]">
              Guests
            </label>
            <Input
              shape="round"
              name="guests"
              id="guests"
              type="text"
              value={formData.guests}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="staff" className="text-xs mt-[5px]">
              Staff
            </label>
            <Input
              shape="round"
              name="staff"
              id="staff"
              type="text"
              value={formData.staff}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="organizingClub" className="text-xs mt-[5px]">
              Organizing Club
            </label>
            <Input
              shape="round"
              name="organizingClub"
              id="organizingClub"
              type="text"
              value={formData.organizingClub}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="place" className="text-xs">
              Place
            </label>
            <Input
              shape="round"
              name="place"
              id="place"
              type="text"
              value={formData.place}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="event_manager" className="text-xs mt-[5px]">
              Event Manager
            </label>
            <Input
              shape="round"
              name="event_manager"
              id="event_manager"
              type="text"
              value={formData.event_manager}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="poster" className="text-xs mt-[5px]">
              Poster URL
            </label>
            <Input
              shape="round"
              name="poster"
              id="poster"
              type="text"
              value={formData.poster}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="numberOfAttendees" className="text-xs mt-[5px]">
              Number Of Attendees
            </label>
            <Input
              shape="round"
              name="numberOfAttendees"
              id="numberOfAttendees"
              type="number"
              value={formData.numberOfAttendees}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <label htmlFor="sponsors" className="text-xs mt-[5px]">
              Sponsors
            </label>
            <Input
              shape="round"
              name="sponsors"
              id="sponsors"
              type="text"
              value={formData.sponsors}
              onChange={handleChange}
              className="rounded-[20px] bg-blue_gray-100 pb-[17px] pl-[14px] pt-[13px] shadow-xs"
            />

            <Button
              type="submit"
              color="blue_gray_100_7f"
              size="lg"
              variant="fill"
              rightIcon={<Img src="images/img_arrowleft.svg" alt="arrow_left" className="h-[20px] w-[20px]" />}
              className="mt-5 rounded-[23px] font-semibold"
            >
              Create Now
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
