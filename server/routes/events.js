const express = require("express");
const router = express.Router();

// Mongoose
const mongoose = require("mongoose");
const Events = mongoose.model("events");
const FollowedEvents = mongoose.model("followed_events");

router.get("/", (req, res) => {
  res.send({
    path: "/",
    message: "Root GET working on /routes"
  });
});

router.post("/get_event_by_id", async (req, res) => {
  const { event_id } = req.body;

  try {
    const event_data = await Events.findOne({ _id: event_id });
    res.send(event_data);
  } catch (e) {
    res.status(404).send({
      err: e,
      message:
        "Something went wrong retrieving this event or this event does not exist."
    });
  }
});

router.post("/create_event", async (req, res) => {
  const {
    creator_uid,
    name,
    description,
    links,
    event_date,
    location,
    lineup
  } = req.body;

  const newEvent = new Events({
    creator_uid,
    name,
    description,
    links,
    event_date,
    location,
    lineup
  });

  await newEvent.save(err => {
    if (err) {
      res.status(500).send({
        message: "An error occurred while saving this event.",
        error: err
      });
    }
  });

  res.status(201).send({ creator_uid, name });
});

router.post("/get_events", (req, res) => {
  // TODO: implement search filter. get_events only returns all events currently.
  Events.find({}, (err, events) => {
    if (err)
      res.status(500).send({
        message: "There was an error finding events."
      });

    res.send(events);
  });
});

router.post("/my_events", (req, res) => {
  const { spotify_uid } = req.body;
  Events.find({ creator_uid: spotify_uid }, (err, events) => {
    if (err)
      res.status(500).send({
        message: "There was an error finding events."
      });

    res.send(events);
  });
});

router.post("/edit_event", (req, res) => {
  const { spotify_uid, event_id, properties } = req.body;
  Events.update(
    { _id: event_id, creator_uid: spotify_uid },
    { ...properties },
    (err, event) => {
      if (err)
        res.status(500).end({
          message: "An error occurred while updating this event",
          error: err
        });
      res.status(200).send(event);
    }
  );
});

router.post("/delete_event", async (req, res) => {
  const { event_id, spotify_uid } = req.body;

  const deletedEvent = await Events.deleteOne({
    _id: event_id,
    creator_uid: spotify_uid
  });

  if (deletedEvent.deletedCount === 0)
    res
      .status(500)
      .send({ message: "There was an error deleting this document" });

  res
    .status(200)
    .send({ message: "Event successfully deleted!", response: deletedEvent });
});

router.post("/followed_events", (req, res) => {
  const { spotify_uid } = req.body;
  FollowedEvents.find({ spotify_uid }, (err, followedEvents) => {
    if (err)
      res.status(500).send({
        err,
        message: "An error occurred while retrieving a user's followed events."
      });
    res.status(200).send(followedEvents);
  });
});

router.post("/follow_event", async (req, res) => {
  const { spotify_uid, event_id } = req.body;
  if (event_id === undefined)
    res.status(500).send({
      message: "event_id must not be undefined."
    });

  const identifier = spotify_uid + "_" + event_id;

  const newFollowedEvent = new FollowedEvents({
    spotify_uid,
    event_id,
    identifier
  });

  try {
    const saveFollowedEvent = await newFollowedEvent.save();
    res.status(201).send(saveFollowedEvent);
  } catch (error) {
    res.status(500).send({
      error,
      message: "An error occurred or the user has already followed this event."
    });
  }
});

router.post("/unfollow_event", async (req, res) => {
  const { spotify_uid, event_id } = req.body;
  const unfollowedEvent = await FollowedEvents.deleteOne({
    spotify_uid,
    event_id
  });

  if (unfollowedEvent.deletedCount === 0)
    res
      .status(500)
      .send({ message: "The event has not been unfollowed", unfollowedEvent });

  res.status(200).send({ unfollowedEvent });
});

module.exports = router;
