// const data = require("../data/link.json");
import data from '../data/link.json'

const linkData = async (req, res)=>{
    try {

        const links = await data;
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch links', error: error.message });
    }
}

export {linkData}