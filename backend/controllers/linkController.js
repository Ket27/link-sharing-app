const linkModel = require("../models/linkModel");
const userModel = require("../models/userModel");

module.exports.postUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, url } = req.body;

    const user = await linkModel.findOne({ userId: id });

    if (!user) {
      const link = await linkModel.create({
        userId: id,
        links: [{ platform, url }],
      });
      res.json({
        success: true,
        data: link,
      });
    } else {
      user.links.push({ platform, url });
      await user.save();
      res.json({
        message: "more links added",
        data: user.links,
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      error: "error.message",
    });
  }
};

module.exports.getUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await linkModel.findOne({ userId: id });
    if (user) {
      res.json({
        message: "links",
        data: user,
      });
    } else {
      res.json({
        message: "no url found",
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      error: "error.message",
    });
  }
};

module.exports.deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    const user = await linkModel.findOne({ userId: id });
    if (!user) {
      res.json({
        message: "no user",
      });
    } else {
      if (user.links.length == 0) {
        res.json({
          message: "user with No url",
        });
      } else {
        const linkIndex = user.links.findIndex((link) => link.url === url);

        if (linkIndex === -1) {
          return res.json({
            message: "Link not found",
          });
        }

        await linkModel.updateOne(
          { userId: id },
          { $pull: { links: { _id: user.links[linkIndex]._id } } }
        );
        res.json({
          message: "Link deleted",
          data: user.links,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
