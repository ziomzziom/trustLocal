const { Offer } = require('../models/Offers');

exports.update = async (req, res) => {
    try {
      const id = req.params.id;
      const offer = await Offer.findByIdAndUpdate(id, req.body, { new: true }).exec();
      if (!offer) {
        res.status(404).json({ message: 'Offer not found' });
      } else {
        res.status(200).json(offer);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating offer' });
    }
  };