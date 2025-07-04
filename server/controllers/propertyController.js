const property= require('../models/BatDongSan');

const propertyController = {  
    // GET property
    getAllproperty : async(req,res)=>{
        try {
            const properties = await property.find().populate('nguoi_dung_id');
            res.status(200).json(properties)
        }catch(err){
            return res.status(500).json({message:err.message})
        }
    },
    // GET property by id
    getpropertyById: async(req,res)=>{
        try {
            const propertyId = req.params.id;
            const propertyData = await property.findById(propertyId).populate('nguoi_dung_id');
            if (!propertyData) {
                return res.status(404).json({message: "Property not found"});
            }
            res.status(200).json(propertyData);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    // POST create property
    createProperty : async(req,res)=>{
        try {
            const newProperty = new property(req.body);
            const savedProperty = await newProperty.save();
            res.status(201).json(savedProperty);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    // PUT update property
    updateProperty : async(req,res)=> {
        try {
            const propertyId = req.params.id;
            const updatedProperty = await property.findByIdAndUpdate(propertyId, req.body, { new: true });
            if (!updatedProperty) {
                return res.status(404).json({message: "Property not found"});
            }
            res.status(200).json(updatedProperty);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    // DELETE property
    deleteProperty : async(req,res)=> {
        try {
            const propertyId = req.params.id;
            const deletedProperty = await property.findByIdAndDelete(propertyId);
            if (!deletedProperty) {
                return res.status(404).json({message: "Property not found"});
            }
            res.status(200).json({message: "Property deleted successfully"});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

}
module.exports = propertyController;