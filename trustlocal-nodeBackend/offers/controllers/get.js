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
    const { id } = req.query; 

    if (!id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const offer = await Offer.findById(id).lean();

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    const now = new Date();
    const createdAt = new Date(offer.date);
    const daysSinceCreated = Math.round((now - createdAt) / (1000 * 60 * 60 * 24));
    offer.isNew = daysSinceCreated < 5 ? true : daysSinceCreated;

    res.status(200).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting offer' });
  }
};
