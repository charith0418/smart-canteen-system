const Sale = require("../models/Sale");

/**
 * =========================
 * CREATE SALE
 * =========================
 */
const createSale = async (req, res) => {
  try {
    const { items, subtotal, total, discount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in cart" });
    }

    const sale = await Sale.create({
      items,
      subtotal,
      total,
      discount: discount || 0,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    console.error("CREATE SALE ERROR:", error);
    return res.status(500).json({
      message: "Error processing sale",
      error: error.message,
    });
  }
};

/**
 * =========================
 * GET REPORTS (Grouped By Day)
 * =========================
 */
const getReports = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });

    let overallIncome = 0;
    let overallTransactions = sales.length;
    let overallItems = 0;
    
    const dailyBreakdown = {};

    sales.forEach((sale) => {
      overallIncome += sale.total || 0;
      
      let saleItemsCount = 0;
      sale.items.forEach((item) => {
        overallItems += item.quantity || 0;
        saleItemsCount += item.quantity || 0;
      });

      const dateKey = new Date(sale.createdAt).toISOString().split('T')[0];

      if (!dailyBreakdown[dateKey]) {
        dailyBreakdown[dateKey] = {
          date: dateKey,
          totalIncome: 0,
          totalTransactions: 0,
          totalItems: 0,
          sales: []
        };
      }

      dailyBreakdown[dateKey].totalIncome += sale.total || 0;
      dailyBreakdown[dateKey].totalTransactions += 1;
      dailyBreakdown[dateKey].totalItems += saleItemsCount;
      dailyBreakdown[dateKey].sales.push(sale);
    });

    const dailyReportsArray = Object.values(dailyBreakdown).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return res.json({
      overall: {
        totalIncome: overallIncome,
        totalTransactions: overallTransactions,
        totalItems: overallItems,
      },
      dailyReports: dailyReportsArray,
      sales,
    });

  } catch (error) {
    console.error("REPORT ERROR:", error);
    return res.status(500).json({
      message: "Error generating reports",
      error: error.message,
    });
  }
};

module.exports = {
  createSale,
  getReports,
};