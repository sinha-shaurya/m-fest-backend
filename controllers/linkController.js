import Link from '../models/linkModel.js'; // Import the Link model

const linkData = async (req, res) => {
    try {
        // Fetch data from the MongoDB collection using Mongoose
        const links = await Link.find(); // Fetches all links from the collection
        res.status(200).json(links); // Return the data as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch links', error: error.message });
    }
};

export { linkData };
