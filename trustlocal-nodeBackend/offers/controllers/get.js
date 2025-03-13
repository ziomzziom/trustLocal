const { Offer } = require('../models/Offers');

exports.getAll = async (req, res) => {
  try {
      const offers = await Offer.find().populate('createdBy').exec();

      // Sort by date descending (newest first)
      offers.sort((a, b) => new Date(b.date) - new Date(a.date));

      const now = new Date();
      offers.forEach((offer) => {
          const createdAt = new Date(offer.date);
          const daysSinceCreated = Math.round((now - createdAt) / (1000 * 60 * 60 * 24));
          offer.isNew = daysSinceCreated < 5 ? true : daysSinceCreated;
      });

      res.status(200).json(offers.map((offer) => ({ ...offer.toObject(), isNew: offer.isNew })));
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting all offers' });
  }
};

exports.getOne = async (req, res) => {
    try {
      const { query, province } = req.query;

      const queryObject = {};
      if (query) {
        queryObject.$or = [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ];
      }

      if (province) {
        queryObject['location.province'] = province;
      }

      const offers = await Offer.find(queryObject);

      if (!offers.length) {
        res.status(404).json({ message: 'No offers found' });
      } else {
        const now = new Date();
        offers.forEach((offer) => {
          const createdAt = new Date(offer.date);
          const daysSinceCreated = Math.round((now - createdAt) / (1000 * 60 * 60 * 24));
          offer.isNew = daysSinceCreated < 5 ? true : daysSinceCreated;
        });
        res.status(200).json(offers.map((offer) => ({ ...offer.toObject(), isNew: offer.isNew })));
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting offers' });
    }
};
