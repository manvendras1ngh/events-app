import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventTopic: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enums: ["offline", "online"],
      required: true,
    },
    eventHostedBy: [{ type: String, required: true }],
    eventSpeakers: [{ type: String, required: true }],
    eventTimings: {
      eventEndTime: {
        type: String,
        required: true,
      },
      eventStartTime: {
        type: String,
        required: true,
      },
    },
    eventVenueAndAddress: {
      type: String,
      required: true,
    },
    eventEntryPrice: {
      type: Number,
    },
    eventTags: [{ type: String }],
    eventImageUrl: {
      type: String,
    },
    eventAdditionalInfo: {
      dressCode: {
        type: String,
      },
      ageRestriction: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
