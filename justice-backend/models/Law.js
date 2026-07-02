const mongoose = require('mongoose');

const LawSchema = new mongoose.Schema({
    chapter: { type: String, required: true },
    sectionNumber: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" }
}, { collection: 'laws' });

module.exports = mongoose.model('Law', LawSchema);