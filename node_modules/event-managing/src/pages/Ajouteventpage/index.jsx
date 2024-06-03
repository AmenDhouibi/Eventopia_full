import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Img } from "../../components";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export
import axios from "axios";

export default function AjouteventpagePage() {
  const [formData, setFormData] = useState({
    eventname: "",
    place: "",
    time: "",
    description: "",
    event_manager: "",
    poster: "",
    numberOfAttendees: "",
    sponsors: "",
    organizingClub: "",
  });

  const accessToken = localStorage.getItem('accessToken');

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'sponsors') {
      setFormData({ ...formData, [id]: value.split(',') });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = formData.event_manager;
      const response_id = await axios.get(`http://localhost:3000/api/user/${username}`);
      const manageruser = response_id.data;
      const event_manager = manageruser._id;
      let decodedToken;
      try {
        decodedToken = jwtDecode(accessToken);
        console.log('Decoded Token:', decodedToken);
      } catch (err) {
        console.error('Error decoding token:', err);
        throw new Error('Failed to decode token');
      }
      const { user_id } = decodedToken;
      if (user_id !== manageruser._id) {
        alert("You cannot create an event if you are not its manager");
        return;
      }

      const createEventDto = {
        name: formData.eventname,
        time: formData.time,
        description: formData.description,
        event_manager: event_manager,
        poster: formData.poster,
        numberOfAttendees: parseInt(formData.numberOfAttendees),
        sponsors: formData.sponsors,
        organizingClub: formData.organizingClub,
        place: formData.place,
      };

      const response = await axios.post("http://localhost:3000/api/events", createEventDto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userDetailsResponse = await axios.get(`http://localhost:3000/api/user/id/${user_id}`);
      const updatedUser = JSON.stringify(userDetailsResponse.data);
      // Set the updated user data in the local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      console.log(response.data);
      alert("Event Added !");
    } catch (error) {
      console.error(error);
      alert("Problem in adding the event");
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
