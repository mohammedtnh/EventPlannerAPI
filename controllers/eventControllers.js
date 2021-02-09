const { Event } = require("../db/models");
const { Op } = require("sequelize");
const db = require("../db/models");

const queryInterface = db.sequelize.getQueryInterface();

exports.eventList = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      const events = await Event.findAll({
        attributes: ["id", "name", "image"],
        order: [
          ["date", "ASC"],
          ["name", "ASC"],
        ],
      });
      res.json(events);
    } else {
      const events = await Event.findAll({
        where: {
          date: { [Op.gt]: req.body.date },
        },
        attributes: ["id", "name", "image"],
        order: [
          ["date", "ASC"],
          ["name", "ASC"],
        ],
      });
      res.json(events);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.fullList = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        bookedSeats: { [Op.eq]: { [Op.col]: "numOfSeats" } },
      },
    });
    res.json(events);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.searchList = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        name: { [Op.iLike]: `%${req.params.query}%` },
      },
    });
    res.json(events);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.eventCreate = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      Event.bulkCreate(req.body, { validate: true });
      res.status(201).json(req.body);
    } else {
      const newEvent = await Event.create(req.body);
      res.status(201).json(newEvent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDetails = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      res.json(foundEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDelete = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      //   Event.destroy({
      //     where: {
      //       id: { [Op.in]: req.body },
      //     },
      //   });
      queryInterface.bulkDelete("Events", { id: { [Op.in]: req.body } }, {});
      res.status(204).end();
    } else {
      const foundEvent = await Event.findByPk(req.params.eventId);
      if (foundEvent) {
        await foundEvent.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
