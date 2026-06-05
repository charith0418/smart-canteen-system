const Sale = require("../models/Sale");

const createSale = async (req, res) => {
  try {
    const { items, subtotal, total, discount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in cart" });
    }

    const itemsForDb = items.map(product => ({
      item: String(product.item),
      quantity: Number(product.quantity),
      priceAtSale: Number(product.priceAtSale || product.price) 
    }));

    const sale = await Sale.create({
      items: itemsForDb, 
      subtotal: Number(subtotal),
      total: Number(total),
      discount: discount || 0,
    });

    return res.status(201).json({
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    console.error("CREATE SALE ERROR DETAILS:", error); 
    return res.status(500).json({
      message: "Error processing sale",
      error: error.message,
    });
  }
};

/**
 * ============================================================================
 * 2. GET REPORTS 
 * ============================================================================
 * @desc    Fetch and calculate structured all-time & daily analytics matrices
 * @route   GET /api/sales/reports
 * @access  Private
 */
const getReports = async (req, res) => {
  try {
    // ✅ Note: Temporary deleteMany line remains completely omitted so new records accumulate normally.
    const sales = await Sale.find().sort({ createdAt: -1 });

    let overallIncome = 0;
    let overallTransactions = sales.length;
    let overallItems = 0;
    
    const dailyBreakdown = {};
    const overallItemMap = {}; 

    sales.forEach((sale) => {
      overallIncome += sale.total || 0;
      
      // FIXED: Build local date string format (YYYY-MM-DD) instead of raw UTC to match timestamps
      const saleDate = new Date(sale.createdAt || sale.date);
      const year = saleDate.getFullYear();
      const month = String(saleDate.getMonth() + 1).padStart(2, '0');
      const day = String(saleDate.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`; 

      if (!dailyBreakdown[dateKey]) {
        dailyBreakdown[dateKey] = {
          date: dateKey,
          totalIncome: 0,
          totalTransactions: 0,
          totalItems: 0,
          itemBreakdown: {}, 
          sales: []
        };
      }

      let saleItemsCount = 0;
      
      sale.items.forEach((nestedItem) => {
        const itemNameString = nestedItem.item; 
        const itemQuantity = nestedItem.quantity || 0;
        const itemPrice = nestedItem.priceAtSale || 0;

        overallItems += itemQuantity;
        saleItemsCount += itemQuantity;

        if (itemNameString) {
          const nameKey = itemNameString.trim(); // Capitalization preserved so cards display cleanly on dashboard

          // A. Accumulate stats into ALL-TIME Summary
          if (!overallItemMap[nameKey]) {
            overallItemMap[nameKey] = { 
              name: nameKey, 
              totalQty: 0, 
              totalRevenue: 0 
            };
          }
          overallItemMap[nameKey].totalQty += itemQuantity;
          overallItemMap[nameKey].totalRevenue += (itemPrice * itemQuantity);

          // B. Accumulate stats into DAILY Breakdown
          if (!dailyBreakdown[dateKey].itemBreakdown[nameKey]) {
            dailyBreakdown[dateKey].itemBreakdown[nameKey] = {
              name: nameKey,
              totalQty: 0,
              totalRevenue: 0
            };
          }
          dailyBreakdown[dateKey].itemBreakdown[nameKey].totalQty += itemQuantity;
          dailyBreakdown[dateKey].itemBreakdown[nameKey].totalRevenue += (itemPrice * itemQuantity);
        }
      });

      dailyBreakdown[dateKey].totalIncome += sale.total || 0;
      dailyBreakdown[dateKey].totalTransactions += 1;
      dailyBreakdown[dateKey].totalItems += saleItemsCount;
      dailyBreakdown[dateKey].sales.push(sale);
    });

    // Format maps back into arrays for frontend state loops
    const dailyReportsArray = Object.values(dailyBreakdown).map(day => {
      return {
        ...day,
        itemBreakdown: Object.values(day.itemBreakdown).sort((a, b) => b.totalQty - a.totalQty)
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    const overallItemBreakdownArray = Object.values(overallItemMap).sort(
      (a, b) => b.totalQty - a.totalQty
    );

    return res.json({
      overall: {
        totalIncome: overallIncome,
        totalTransactions: overallTransactions,
        totalItems: overallItems,
      },
      itemBreakdown: overallItemBreakdownArray, 
      dailyReports: dailyReportsArray, 
      sales,
    });

  } catch (error) {
    console.error("REPORT SYSTEM ERROR:", error);
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