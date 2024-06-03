import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "components";
import { Img } from "components";

const ExploreeventspagePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events")
      .then(async (response) => {
        const eventsData = response.data;
        const eventsWithDetails = await Promise.all(
          eventsData.map(async (event) => {
            try {
              const managerResponse = await axios.get(
                `http://localhost:3000/api/user/id/${event.event_manager}`
              );
              event.managerName = managerResponse.data.username;
              return event;
            } catch (error) {
              console.error("Error fetching user details:", error);
              return event;
            }
          })
        );
        setEvents(eventsWithDetails);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);


  return (
    <>
      <div className="mb-24 flex flex-col items-center">
        <header className="flex items-center justify-between gap-5 self-stretch md:flex-col">
        <div className="relative mb-[7px] h-[50px] w-[15%] sm:w-full">
            <Img src="images/img_frame.svg" alt="image" className="absolute left-10 top-10 m-auto h-[45px] w-[45px]" />
            <Text size="lg" as="p" className="absolute left-10 top-10 m-auto text-center lowercase">
                <a href="/">eventopia</a>
            </Text>
        </div>
        </header>
        
        <div className="mx-auto mt-[30px] flex w-full max-w-[90%] items-start justify-between gap-0 md:flex-col md:p-5">
          <div className="relative max-h-[100px] w-[70%] md:w-full">
          <div className="absolute top-[10px] left-20 top-10 right-0 m-auto flex w-[97%] rounded-[30px] bg-blue_gray-100_7f p-4 shadow-xs">
              {events.length > 0 ? (
                <div className="mb-3.5 mt-7 flex w-full flex-wrap items-right gap-4 md:w-full sm:flex-col">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="w-full rounded-[20px] bg-white p-4 shadow-lg"
                    >
                    <Text size="sm" as="p" className="text-left md:w-full">
                    <strong style={{ color: '#ed4c5c' }}>{event.name}</strong> hosted by{" "}
                    <strong>{event.managerName}</strong>. <br />
                    Join us with guests: {event.guests?.join(", ")}. <br />
                    Sponsored by: {event.sponsors?.join(", ")}. <br />
                    Staff: {event.staff?.join(", ")}. <br />
                    </Text>

                    </div>
                  ))}
                </div>
              ) : (
                <Text size="sm" as="p" className="w-full text-center md:w-full">
                  No events available.
                </Text>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ExploreeventspagePage;
