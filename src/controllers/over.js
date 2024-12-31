import Over from "../models/over.model.js";
import User from "../models/user.model.js";
import Score from "../models/score.model.js";

const createOver = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "user name not provided" });
    }

    const isAdmin = await User.findOne({
      name: name,
      role: "admin",
    });
    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const totaldocs = await Over.countDocuments({});

    const overNumber = totaldocs + 1;
    if (overNumber < 1 || overNumber > 10) {
      return res
        .status(400)
        .json({ error: "cannot create more then 10 overs" });
    }

    const newOver = new Over({
      overNumber,
      result: [],
    });

    await newOver.save();

    await Score.updateOne(
      {},
      {
        $push: {
          overs: newOver._id,
        },
        currentOver: overNumber,
      }
    );

    res
      .status(201)
      .json({ message: "Over created successfully", over: newOver });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating over", error: error.message });
  }
};

const updateBallOutcome = async (req, res) => {
  try {
    const { overNumber, ballNumber, outcome, name } = req.body;
    if ((!overNumber || !ballNumber || !outcome, !name)) {
      return res.status(400).json({
        error: "over Number, ball Number , outcome and name is required",
      });
    }

    const isAdmin = await User.findOne({
      name: name,
      role: "admin",
    });
    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    if (overNumber < 1 || overNumber > 10) {
      return res
        .status(400)
        .json({ error: "Invalid over number choose between 1 and 10" });
    }

    if (ballNumber < 1 || ballNumber > 6) {
      return res
        .status(400)
        .json({ error: "Invalid ball number choose between 1 and 6" });
    }

    if (!["0", "1", "2", "3", "4", "6", "-1"].includes(outcome)) {
      return res.status(400).json({ message: "Invalid outcome value" });
    }

    const over = await Over.findOne({ overNumber });
    if (!over) {
      return res.status(404).json({ message: "Over not found" });
    }

    const ballIndex = over.result.findIndex((b) => b.ballNumber === ballNumber);

    if (ballIndex > -1) {
      over.result[ballIndex].outcome = outcome;
    } else {
      over.result.push({ ballNumber, outcome });
    }

    await over.save();

    res
      .status(200)
      .json({ message: "Ball outcome updated successfully", over });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ball outcome", error: error.message });
  }
};

const getOver = async (req, res) => {
  try {
    const { overNumber } = req.params;

    if (!overNumber) {
      return res.status(400).json({ error: "Over number not provided" });
    }

    const isOverExists = await Over.findOne({ overNumber: Number(overNumber) });
    if (!isOverExists) {
      return res.status(404).json({ error: "Over not found" });
    }

    const over = await Over.aggregate([
      {
        $match: {
          overNumber: Number(overNumber),
        },
      },
      {
        $unwind: "$result",
      },
      {
        $sort: {
          "result.ballNumber": 1,
        },
      },
      {
        $project: {
          overNumber: 1,
          result: 1,
        },
      },
    ]);

    if (over.length === 0) {
      return res.status(200).json({ overNumber: Number(overNumber), over: [] });
    }

    res.status(200).json({ overNumber: Number(overNumber), over });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching over", error: error.message });
  }
};

const getAllOvers = async (req, res) => {
  try {
    const overs = await Over.find().sort({ overNumber: 1 });
    res.status(200).json(overs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch all overs." });
  }
};

export { createOver, updateBallOutcome, getOver, getAllOvers };
