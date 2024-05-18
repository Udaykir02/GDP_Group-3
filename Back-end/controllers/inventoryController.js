const Inventory = require('../models/inventory')
const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');
// module.exports = {
//   addInventory: async (inventoryData) => {
//     try {
//       return await Product.insertMany(inventoryData);
//     } catch (error) {
//       console.error("Error adding inventory:", error);
//       throw new Error('Failed to add inventory to the database');
//     }
//   },
//   // Other inventory-related controller functions...
// };

// Controller method to insert vendors' data with geopoints
const insertInventory = async (req, res) => {
  try {
    // // Extract vendor data including geopoint from request body
    // const { vendorData } = req.body;
    // console.log(JSON.stringify(req.body))
    // // Create a new vendor instance
    const newProduct = new Inventory(req.body);

    // Save the vendor to the database
    await newProduct.save();

    res.status(201).json({ message: 'Inventory data inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryBySkuId = async (req, res) => {
  try {
    // Extract the SKU IDs and optional filters from the request body
    const { skuids, minPrice, maxPrice, categories, brand } = req.body;
    const query = {
      skuId: { $in: skuids }
    };

    // Add price range filter if provided
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    // Add categories filter if provided
    if (categories && categories.length > 0) {
      query.categories = { $in: categories };
    }

    // Add brand filter if provided
    if (brand && brand.length > 0) {
      query.brand = { $in: brand };
    }

    // Fetch inventory items that match the query
    const inventoryArray = await Inventory.find(query);

    // If inventory data exists, send it in the response
    if (inventoryArray.length > 0) {
      res.status(200).json({ success: true, data: inventoryArray });
    } else {
      // If no inventory data found, send an appropriate message
      res.status(404).json({ success: false, message: 'Inventory not found for the provided SKU IDs and filters' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getInventoryQty = async (req, res) => {
  try {
    // Extract the SKU ID from the request parameters
    const { skuid } = req.body;


    const inventory = await Inventory.findOne({ skuId: skuid });

    // If inventory data exists, send it in the response
    if (inventory) {
      res.status(200).json({ success: true, data: inventory });
    } else {
      // If no inventory data found, send an appropriate message
      res.status(404).json({ success: false, message: 'Inventory not found for the provided SKU IDs' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.log(error.message)
    res.status(500).json({ success: false, error: error.message });
  }
}


const updateInventory = async (req, res) => {
  try {
    // Extract inventory ID from request parameters
    const { skuId, item, price, size, features, description, categories, image, brand } = req.body;

    // Check if the inventory ID is valid
    if (!mongoose.Types.ObjectId.isValid(skuId)) {
      return res.status(400).json({ error: 'Invalid inventory ID' });
    }

    // Find the inventory by ID and update it with the new data from the request body
    await Inventory.findByIdAndUpdate(skuId, {
      skuId: skuId,
      item: item,
      price: price,
      qty: 3,
      size: size,
      features: features,
      description: description,
      categories: categories,
      image: image,
      brand: brand
    });

    res.status(200).json({ message: 'Inventory data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryAndVendorDetails = async (req, res) => {
  try {
    // Extract the SKU IDs and optional filters from the request body
    const { skuids, minPrice, maxPrice, categories, brand, searchTerm } = req.body;
    const query = {};
    if (skuids && skuids.length > 0) {
      query = {
        skuId: { $in: skuids }
      };
    }

    // Add price range filter if provided
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    // Add categories filter if provided
    if (categories && categories.length > 0) {
      query.categories = { $in: categories };
    }

    // Add brand filter if provided
    if (brand && brand.length > 0) {
      query.brand = { $in: brand };
    }

    // Add search term filter if provided
    if (searchTerm && searchTerm.trim() !== '') {
      const searchRegex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive
      query.$or = [
        { item: searchRegex },
        { description: searchRegex },
        { features: searchRegex },
        { vendor_name: searchRegex }
      ];
    }

    // Fetch inventory items that match the query
    const inventoryArray = await Inventory.find(query);

    // If inventory data exists, fetch the corresponding vendor details
    if (inventoryArray.length > 0) {
      const vendorIds = inventoryArray.map(item => item.vendorId);
      const vendors = await Vendor.find({ vendorId: { $in: vendorIds } });

      const vendorResults = [];

      // Combine the inventory items with their corresponding vendor details
      const inventoryResult = inventoryArray.map(item => {
        const vendor = vendors.find(v => v.vendorId === item.vendorId);
        vendorResults.push(vendor._id)
        return { ...item._doc };
      });

      const setArray = Array.from(new Set(vendorResults));
      
      const vendorsData = await Vendor.find({ _id: { $in: setArray } });
      console.log(vendorsData)
      // Send the combined result in the response
      res.status(200).json({ success: true, inventoryResult: inventoryResult, vendorResult: vendorsData });
    } else {
      // If no inventory data found, send an appropriate message
      res.status(404).json({ success: false, message: 'Inventory not found for the provided SKU IDs and filters' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};


const getInventoryQuantotyInArray = async (req, res) => {
  try {
    const { skuIds } = req.body; // Extract skuIds from request body
    if (!Array.isArray(skuIds)) {
      return res.status(400).json({ error: 'skuIds should be an array' });
    }

    // Find inventories with matching skuIds
    const inventories = await Inventory.find({ skuId: { $in: skuIds } }, 'skuId qty');

    // Map the results to include only skuId and qty
    const result = inventories.map(inventory => ({
      skuId: inventory.skuId,
      qty: inventory.qty,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching inventory quantities' });
  }
}
module.exports = { insertInventory, getInventoryBySkuId, updateInventory, getInventoryQty, getInventoryAndVendorDetails, getInventoryQuantotyInArray }