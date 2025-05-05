import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Clock, MapPin, IndianRupee, UserRound } from "lucide-react";

import Navbar from "./Navbar";

const Details = () => {
  const [eventIdDetails, setEventIdDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const url = `https://meezy-api.vercel.app/api/event/${id}`;
      try {
        const res = await axios.get(url);
        setEventIdDetails(res.data.data);
      } catch (error) {
        console.log("Error getting details", error);
        throw error;
      }
    };
    fetchEvent();
  }, [id]);

  if (!eventIdDetails) {
    return <p>Event details not found!</p>;
  }

  const {
    eventTopic,
    eventType,
    eventTimings,
    eventTags,
    eventSpeakers,
    eventDescription,
    eventEntryPrice,
    eventHostedBy,
    eventImageUrl,
    eventVenueAndAddress,
    eventAdditionalInfo,
  } = eventIdDetails;
  return (
    <section>
      <div className="border-b border-zinc-200">
        <Navbar />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 my-8 gap-5">
        <div>
          <h1 className="text-4xl font-semibold">{eventTopic}</h1>

          <div className="my-6">
            <p className="text-zinc-700">Hosted By:</p>
            <p className="font-semibold text-lg">{eventHostedBy}</p>
          </div>

          <img src={eventImageUrl} alt={eventTopic} className="w-xl" />

          <div className="my-6">
            <h2 className="text-xl font-bold">Details:</h2>
            <p className="w-xl my-4">{eventDescription}</p>

            {eventAdditionalInfo && (
              <div>
                <h2 className="text-xl font-bold">Additional Information:</h2>
                {eventAdditionalInfo.dressCode && (
                  <p className="my-2">
                    <span className="font-semibold text-md">Dress Code: </span>
                    {eventAdditionalInfo.dressCode}
                  </p>
                )}
                {eventAdditionalInfo.ageRestriction && (
                  <p>
                    <span className="font-semibold text-md">
                      Age Restrictions:{" "}
                    </span>
                    {eventAdditionalInfo.ageRestriction}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-xl font-bold">Event Tags:</p>
            <div className="my-4">
              {eventTags.map((tag) => (
                <span className="bg-orange-600 text-white rounded-md px-4 py-1 mr-4">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="justify-self-center">
          <div className="bg-zinc-100 p-12 rounded-lg space-y-4">
            <div className="items-center flex gap-4">
              <Clock />
              <div>
                <p className="text-sm">
                  {new Date(eventTimings.eventStartTime).toUTCString()}
                </p>
                <p className="text-sm">
                  {new Date(eventTimings.eventEndTime).toUTCString()}
                </p>
              </div>
            </div>
            <p className="flex items-center gap-4">
              <MapPin />
              <p>{eventVenueAndAddress}</p>
            </p>
            <p className="flex items-center gap-4">
              <IndianRupee />
              <p>{eventEntryPrice || "NA"}</p>
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-xl font-bold">
              Speakers: ({eventSpeakers.length})
            </h2>

            <div className="my-8">
              {eventSpeakers.map((speaker) => (
                <div className="bg-zinc-100 rounded-lg p-2 mr-6 inline-block flex flex-col justify-items-center">
                  <UserRound />
                  <p className="pt-2 font-semibold">{speaker}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
