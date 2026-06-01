const Item = require('../models/Item'); 

const getItems = async (req, res) => {
    try {
        const items = await Item.find({ isActive: true }).select('-__v'); 
        res.json(items); 
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching item' }); 
    }
};

const createItem = async (req, res) => { 
    try {
        // Remove imageUrl from the initial destructuring
        const { name, price, category } = req.body; 
        
        let imageUrl = '';
        if (req.file) {
            imageUrl = `/images/${req.file.filename}`;
        } else if (req.body.imageUrl) {
            
            imageUrl = req.body.imageUrl;
        }

        const item = new Item ({ name, price, category, imageUrl }); 
        const createdItem = await item.save();  
        res.status(201).json(createdItem); 
    } catch (error) {
        res.status(400).json ({ message: 'Invalid item data'}); 
    }
};

module.exports = {
    getItems, 
    createItem 
};