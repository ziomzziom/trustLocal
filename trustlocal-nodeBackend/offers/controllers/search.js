const { Offer } = require('../models/Offers');

exports.search = async (req, res) => {
    try {
      const { searchQuery, provinceName } = req.query;
  
      const query = {};
      if (searchQuery) {
        query.$or = [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ];
      }
  
      if (provinceName) {
        query['location.province'] = provinceName;
      }
  
const offers = await Offer.find(query).sort({ date: 1 });

  
      if (!offers.length) {
        return res.status(404).json([]);
      }
  
      res.status(200).json(offers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
