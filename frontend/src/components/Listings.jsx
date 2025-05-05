import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select, Card } from "antd";
import Navbar from "./Navbar";

const { Meta } = Card;

const Listings = () => {
  const [searchValue, setSearchValue] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventData, setEventData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const url = "http://localhost:5175/api/event";
      try {
        const res = await axios(url);
        setEventData(res.data.data);
      } catch (error) {
        throw error;
      }
    };
    fetchAllEvents();
  }, []);

  const renderEventCard = (data) => (
    <Card
      className="relative"
      key={data._id}
      hoverable
      cover={
        <div className="bg-cover overflow-hidden bg-no-repeat">
          <img
            alt={data.eventTopic}
            src={data.eventImageUrl}
            className="h-50 object-cover w-full"
          />
        </div>
      }
      onClick={() => navigate(`/event/${data._id}`)}
    >
      <p className="absolute top-2 right-2 bg-zinc-100/90 rounded-md py-1 px-2 capitalize">
        {data.eventType} Event
      </p>
      <p className="text-zinc-400 pb-1">
        {new Date(data.eventTimings.eventStartTime).toUTCString()}
      </p>
      <Meta title={data.eventTopic} />
    </Card>
  );

  return (
    <section>
      <div className="flex justify-between items-center border-b border-zinc-200">
        <Navbar />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="block border rounded-md px-4 py-1 border-zinc-300 focus:outline-none text-sm"
          placeholder="Search by event title and tags"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <h1 className="text-4xl font-semibold">Meetup Events</h1>
        <Select
          allowClear
          className="w-[160px]"
          placeholder="Select Event Type"
          onChange={(value) => setEventType(value)}
          options={[
            {
              value: "online",
              label: "Online",
            },
            {
              value: "offline",
              label: "Offline",
            },
          ]}
        />
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-start my-8">
        {eventData
          ? eventData
              .filter((event) =>
                searchValue
                  ? event.eventTopic
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    event.eventTags.some((tag) =>
                      tag.toLowerCase().includes(searchValue.toLowerCase())
                    )
                  : eventType
                  ? event.eventType.includes(eventType)
                  : true
              )
              .map((event) => renderEventCard(event))
          : "No data to display!"}
      </div>
    </section>
  );
};

export default Listings;
