import express from "express";
import asyncHandler from "../utils/asyncWrapper.js";

import {
  getEventById,
  getAllEvents,
  addEventData,
} from "../controllers/event.controllers.js";

const router = express();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const events = await getAllEvents();
    res.status(200).json({ message: "Events found", data: events });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event with relevant id not found",
        error: "Event not found",
      });
    }
    res.status(200).json({ message: "Event found", data: event });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      eventTopic,
      eventDescription,
      eventType,
      eventHostedBy,
      eventSpeakers,
      eventTimings,
      eventVenueAndAddress,
    } = req.body;

    if (
      !eventTopic ||
      !eventDescription ||
      !eventHostedBy ||
      !Array.isArray(eventHostedBy) ||
      eventHostedBy.length === 0 ||
      !eventSpeakers ||
      !Array.isArray(eventSpeakers) ||
      eventSpeakers.length === 0 ||
      !eventTimings ||
      !eventTimings.eventEndTime ||
      !eventTimings.eventStartTime ||
      !eventVenueAndAddress
    ) {
      return res.status(400).json({
        message: "Please provide all the required fields!",
        error: "Missing one or more required fields.",
      });
    }

    if (eventType && !["offline", "online"].includes(eventType)) {
      return res.status(400).json({
        message: "Invalid eventType. Allowed: 'offline' or 'online'.",
        error: "Invalid eventType",
      });
    }

    const newEventData = await addEventData(req.body);
    if (!newEventData) {
      return res.status(400).json({
        message: "Error on save, Please try saving again.",
        error: "Error saving data!",
      });
    }
    res
      .status(200)
      .json({ message: "Event data added successfuly", data: newEventData });
  })
);
export default router;
