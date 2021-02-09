const express = require("express");
const {
  eventList,
  fullList,
  searchList,
  eventDetails,
  eventCreate,
  eventUpdate,
  eventDelete,
} = require("../controllers/eventControllers");

const router = express.Router();

//List all Event
router.get("/", eventList);

//List full Events
router.get("/full", fullList);

//List full Events
router.get("/:query", searchList);

//Get Event Details
router.get("/:eventId", eventDetails);

//Create an Event
router.post("/", eventCreate);

//Update Event
router.put("/:eventId", eventUpdate);

//Delete Event
router.delete("/:eventId", eventDelete);

//Delete Event
router.delete("/", eventDelete);
module.exports = router;
