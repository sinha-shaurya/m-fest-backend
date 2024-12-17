import Link from '../models/linkModel.js';
import fs from 'fs';
import path from 'path';

// Create new link
const createLink = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/links/${req.file.filename}`;
        
        const newLink = new Link({
            title: req.body.title,
            img: imageUrl,
            display: req.body.display === 'true'
        });

        if (req.body.link) {
            newLink.link = req.body.link;
        }

        const savedLink = await newLink.save();
        res.status(201).json({
            message: 'Link created successfully',
            link: savedLink,
            imageUrl: imageUrl
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating link',
            error: error.message
        });
    }
};

// Get all links
const getAllLinks = async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching links',
            error: error.message
        });
    }
};

// Get link by ID
const getLinkById = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching link',
            error: error.message
        });
    }
};

// Update link
const updateLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }

        let updateData = {
            title: req.body.title,
            display: req.body.display === 'true'
        };

        if (req.body.link) {
            updateData.link = req.body.link;
        }

        // If new image is uploaded
        if (req.file) {
            // Delete old image
            const oldImagePath = link.img.split('/uploads/links/')[1];
            if (oldImagePath) {
                const fullPath = path.join('uploads/links', oldImagePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }

            // Add new image URL
            updateData.img = `${req.protocol}://${req.get('host')}/uploads/links/${req.file.filename}`;
        }

        const updatedLink = await Link.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            message: 'Link updated successfully',
            link: updatedLink
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating link',
            error: error.message
        });
    }
};

// Delete link
const deleteLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }

        // Delete image file
        const imagePath = link.img.split('/uploads/links/')[1];
        if (imagePath) {
            const fullPath = path.join('uploads/links', imagePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        await Link.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting link',
            error: error.message
        });
    }
};

export {
    createLink,
    getAllLinks,
    getLinkById,
    updateLink,
    deleteLink
};
