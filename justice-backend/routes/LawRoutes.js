const express = require('express');
const router = express.Router();
const Law = require('../models/Law');

router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.q;


        if (!keyword) {
            return res.status(400).json({ 
                success: false, 
                message: "Search term is required" 
            });
        }

        console.log(`Executing database search for keyword: "${keyword}"`);

        
        const searchResults = await Law.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { sectionNumber: { $regex: keyword, $options: 'i' } }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Fetching law details for Section search',
            data: searchResults 
        });

    } catch (error) {
        console.error("MongoDB Query Error:", error);
        res.status(500).json({
            success: false,
            message: "Database exploration failed",
            error: error.message,
            data: [] 
        });
    }
});

module.exports = router;