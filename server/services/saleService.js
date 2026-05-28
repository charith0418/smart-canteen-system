const Sale = require('../models/Sale');

const generateReport = async (range, dateString) => {
  const targetDate = dateString ? new Date(dateString) : new Date();
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  const overviewMetrics = await Sale.aggregate([
    { 
      $match: { 
        createdAt: { $gte: startOfDay, $lte: endOfDay } 
      } 
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$total" },
        totalTransactions: { $sum: 1 },
        totalDiscounts: { $sum: "$discount" },
        itemsSold: { $sum: { $sum: "$items.quantity" } }
      }
    }
  ]);

  const topItems = await Sale.aggregate([
    { 
      $match: { createdAt: { $gte: startOfDay, $lte: endOfDay } } 
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.item",
        totalQuantity: { $sum: "$items.quantity" },
        totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.priceAtSale"] } }
      }
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 }, // Top 5 items
    {
      $lookup: {
        from: 'items',
        localField: '_id',
        foreignField: '_id',
        as: 'itemDetails'
      }
    },
    { $unwind: "$itemDetails" },
    {
      $project: {
        _id: 0,
        name: "$itemDetails.name",
        quantity: "$totalQuantity",
        revenue: "$totalRevenue"
      }
    }
  ]);
  

  const defaultMetrics = { totalSales: 0, totalTransactions: 0, itemsSold: 0, totalDiscounts: 0 };
  
  return {
    overview: overviewMetrics.length > 0 ? overviewMetrics[0] : defaultMetrics,
    topSellingItems: topItems
  };
};

module.exports = {
  generateReport
};