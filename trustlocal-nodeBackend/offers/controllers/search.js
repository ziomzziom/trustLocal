const { Offer } = require('../models/Offers');

exports.search = async (req, res) => {
  try {
    const { searchQuery, provinceName } = req.query;
    const query = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { 'location.city': { $regex: searchQuery, $options: 'i' } }
      ];
    }

    if (provinceName) {
      query['location.province'] = { 
        $regex: new RegExp(provinceName, 'i') 
      };
    }

    const offers = await Offer.find(query);
    offers.sort((a, b) => new Date(b.date) - new Date(a.date));


    const now = new Date();
    const offersWithIsNew = offers.map(offer => {
      const offerObject = offer.toObject();
      const createdAt = new Date(offer.date);
      const daysSinceCreated = Math.round((now - createdAt) / (1000 * 60 * 60 * 24));
      offerObject.isNew = daysSinceCreated < 5 ? true : daysSinceCreated;
      return offerObject;
    });

    res.status(offersWithIsNew.length ? 200 : 404).json(offersWithIsNew);
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
};
