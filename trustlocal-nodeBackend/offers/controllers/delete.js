const { Offer } = require('../models/Offers');

exports.deleteOffer = async (req, res) => {
    try {
      const id = req.params.id;
      console.log('Deleting offer with ID:', id); // Debugging log
  
      const deletedOffer = await Offer.findByIdAndDelete(id).exec();
      console.log('Deleted offer:', deletedOffer); // Debugging log
  
      if (deletedOffer) {
        return res.status(200).json({ message: 'Offer deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Offer not found' });
      }
    } catch (error) {
      console.error('Error deleting offer:', error); // Debugging log
      res.status(500).json({ message: 'Error deleting offer' });
    }
  };