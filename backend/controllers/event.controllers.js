import { Event } from "../models/event.models.js";

export const getAllEvents = async () => {
  try {
    const events = await Event.find();
    if (!events || !events.length) {
      throw new Error("Events not found");
    }
    return events;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    if (eventId) {
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error("Event not found!");
      }
      return event;
    } else {
      throw new Error("Please provide event id!");
    }
  } catch (error) {
    throw error;
  }
};

export const addEventData = async (eventData) => {
  try {
    if (!eventData) {
      throw new Error("Please provide event data!");
    }
    const newEvent = new Event(eventData);
    await newEvent.save();
    return newEvent;
  } catch (error) {
    throw error;
  }
};
