import Over from "../models/over.model.js";
import Score from "../models/score.model.js";

const getCurrentOver = async (req, res) => {
  try {
    const score = await Score.findOne({}).select("currentOver");

    res.status(200).json(score);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch current over." });
  }
};

const getScore = async (req, res) => {
  try {
    const totalDocuments = await Score.countDocuments({});

    if (totalDocuments == 0) {
      const newScore = new Score();
      await newScore.save();
    }

    const score = await Score.aggregate([
      {
        $lookup: {
          from: "overs",
          localField: "overs",
          foreignField: "_id",
          as: "overDetails",
        },
      },

      { $unwind: "$overDetails" },

      { $unwind: "$overDetails.result" },

      {
        $group: {
          _id: null,
          totalRuns: {
            $sum: {
              $cond: [
                { $ne: ["$overDetails.result.outcome", "-1"] },
                { $toInt: "$overDetails.result.outcome" },
                0,
              ],
            },
          },
          totalWickets: {
            $sum: {
              $cond: [{ $eq: ["$overDetails.result.outcome", "-1"] }, 1, 0],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          totalRuns: 1,
          totalWickets: 1,
        },
      },
    ]);

    const over = await Score.findOne({}, { currentOver: 1 });

    const overs = await Over.find().sort({ overNumber: -1 }).limit(1);
    const overLength = overs[0]?.result.length || 0;

    res.status(200).json({
      totalRuns: score[0]?.totalRuns || 0,
      totalWickets: score[0]?.totalWickets || 0,
      currentOver: over.currentOver,
      overLength: overLength,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching score", error: error.message });
  }
};

export { getScore, getCurrentOver };
