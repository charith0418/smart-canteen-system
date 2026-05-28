const Sale = require('../models/Sale');
const saleService = require('../services/saleService');

const createSale = async (req, res) => {
    try {
        const { items, subtotal, discount, total } = req.body;

        if (!items || items.lenght === 0) {
            return res.status(400).json({ message: 'No items in cart'});
        }

        const sale = new Sale({
            items,
            subtotal,
            discount,
            total,
            cashier: req.user ? req.user._id: null
        });
        const createdSale = await sale.save();
        res.status(201).json(createdSale);
    } catch (error) {
        res.status(500).json({ message: 'Error processing sale', error: error.message })
    }
};


const getReports = async (req, res) => {
    try{
        const { range, data } = req.query;
        const reportData = await saleService.generateReport(range, data);
        res.json(reportData);
    } catch (error) {
        res.status(500).json ({ message: 'Error generating reports', error: error.message });
    }
};

module.exports = {
    createSale,
    getReports
};