const Vendor = require('../models/Vendor');
const Inventory = require('../models/inventory')
module.exports = {
  addVendor: async (vendorData) => {
    try {
      return await Vendor.insertMany(vendorData);
    } catch (error) {
      console.error("Error adding vendors:", error);
      throw new Error('Failed to add vendors to the database');
    }
  },
  // Other vendor-related controller functions...
};
// Function to find the nearest vendor based on user's current geopoint
const findNearestVendor = async (req, res) => {
  try {
    // Extract user's current geopoint from request body
    const { latitude, longitude, miles, vendor_types } = req.body;

    const pipeline = [
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          spherical: true,
        }
      },
      {
        $match: {
          distance: { $lte: miles * 1609.34 } // Convert miles to meters (1 mile = 1609.34 meters)
        }
      }
    ]
    // Conditionally add vendor_type filter to the pipeline
    if (vendor_types.length !== 0) {
      pipeline.push({
        $match: {
          vendor_type: { $in: vendor_types }
        }
      });
    }

    // Find the nearest vendor using $geoNear aggregation
    const nearestVendor = await Vendor.aggregate(pipeline);


    // Check if a nearest vendor is found
    if (nearestVendor.length === 0) {
      return res.status(404).json({ message: 'No nearest vendor found' });
    }

    // Return the nearest vendor
    res.status(200).json({ nearestVendor: nearestVendor });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

// Controller method to insert vendors' data with geopoints
const insertVendorWithGeopoint = async (req, res) => {
  try {

    // // Extract vendor data including geopoint from request body
    // const { vendorData } = req.body;
    // console.log(JSON.stringify(req.body))
    // // Create a new vendor instance
    const newVendor = new Vendor(req.body);

    // Save the vendor to the database
    await newVendor.save();

    res.status(201).json({ message: 'Vendor data with geopoint inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addVendorIdToProducts = async (req, res) => {
  try {
    const vendorId = req.body.vendorId;
    const vendor = await Vendor.find();

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    for (let index = 0; index < vendor.length; index++) {
      // Update each product with the vendorId
      const productsUpdate = vendor[index].products.map(async (skuId) => {
        return await Inventory.findOneAndUpdate(
          { skuId },
          { $set: { vendor_name: vendor[index].vendor_name } }
        );
      });

      // Wait for all the updates to complete
      await Promise.all(productsUpdate);
    }



    res.status(200).json({ message: 'Vendor ID added to products successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getVendorsByIds = async (req, res) => {
  try {
      const { vendorIds } = req.body; // Assuming vendor IDs are sent in the body of the request
      if (!Array.isArray(vendorIds)) {
          return res.status(400).json({ message: "vendorIds must be an array" });
      }

      const vendors = await Vendor.find({ vendorId: { $in: vendorIds } });
      res.status(200).json(vendors);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = { findNearestVendor, insertVendorWithGeopoint, addVendorIdToProducts, getVendorsByIds };
