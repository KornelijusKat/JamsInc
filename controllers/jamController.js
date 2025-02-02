const Jam = require('./../models/jamModel')
let jams = [];

exports.checkId = async (req, res, next) => {
    try{
        if (jams.length === 0) {
            console.log("Cache is empty, fetching from DB...");
            jams = await Jam.find().lean();
        }
        const jamExists = jams.some(jam => jam._id.toString() === req.params.id);
        if (!jamExists) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Invalid ID'
            });
        }
        next(); 
    }catch(error){
        res.status(500).json({ status: "Failed", message: error.message });
    }
}
exports.checkBody = (req, res, next) => {
    const { name, batchSize, sugarAmount } = req.body;
    if (!name || !batchSize || !sugarAmount) {
      return res.status(400).json({
        status: "Failed",
        message: "Please fill all required fields: name, batchSize, sugarAmount",
      });
    }
    next();
};
exports.createJam = async (req, res) => {
    try{
        const newJam = await Jam.create(req.body);
        jams.push(newJam)
        return res.status(201).json({
            status:'Success',
            data: newJam
        })
    }catch(error){
        return res.status(400).json({
            status:'Failed',
            message:error
        })
    }
}
exports.getJams = async (req,res) => {
    try{
        jams = jams.filter(Boolean);
        if(jams.length === 0)
            jams = await Jam.find();
        if(jams.length === 0){
            return res.status(404).json({
                status:'Failed',
                message: "No records found"
            })
        }
        return res.status(200).json({
            results: jams.length,
            status:"Success",
            data:{
                jams
            }
        }
        )
    }catch(error){
        return res.status(500).json({
            status:'Failed',
            message: error.message
        })
    }
}
exports.getJamById = async (req, res) =>{
    try{
        let jam = jams.find(j => j._id.toString() === req.params.id);
        if(!jam){
            jam = await Jam.findById(req.params.id);
        }
        if(!jam){
            return res.status(404).json({
                status:'Failed',
                message: "No record found"
            })
        }
        return res.status(200).json({
            status:"Success",
            data:{
                jam
            }
        })
    }catch(error){
        return res.status(500).json({
            status:'Failed',
            mesasge:error.message
        })
    }
}
exports.updateJam = async (req,res) => {
    try{
        const jam = await Jam.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        jams = jams.map(jam => 
            jam._id.toString() === req.params.id ? { ...jam, ...req.body } : jam
        );
        return res.status(200).json({
            status:"Success",
            data:{
                jam
            }
        })
    }catch(error){
        return res.status(400).json({
            status:'Failed',
            result: req.body,
            message:error.message
        })
    }
}
exports.deleteJam = async (req, res) =>{
    try{
        await Jam.findByIdAndDelete(req.params.id);
        const index = jams.findIndex(jam => jam._id.toString() === req.params.id);
        if (index !== -1) {
            jams.splice(index, 1);
        }
        if (jams.length === 0) {
            jams = []; 
        }
        return res.status(204).send();     
    }catch(error){
        return res.status(404).json({
            status:'Failed',
            result: req.body,
            message:error.message
        })
    }
}
exports.getEfficiency = async (req, res) => {
    try{
        const data = jams.length > 0 ? jams : await Jam.find().lean();
        const processedJams = data.map(jam => ({
            name: jam.name,
            Efficiency: jam.batchSize / jam.sugarAmount > 5 ? "Efficient" : "Inefficient"
        }));     
        return res.status(200).json({
            results: processedJams.length,
            status:"Success",
            data:{
                processedJams
            }
        })
    }catch(error){
        return res.status(500).json({ status: 'Failed', message: error.message });
    }
}