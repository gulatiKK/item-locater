const express = require('express');
const Model = require('../model/model');
const Relation = require('../model/relation');
const router = express.Router()



//Post Method
router.post('/relation', async (req, res) => {
    const data = new Relation({
        item_name: req.body.item_name,
        container_name: req.body.container_name
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/allRelation', async (req, res) => {
    // get the parameters supplied with the call
    try{
        const data = await Relation.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

router.get('/oneRelation/:id', async (req, res) => {
    try{
        const data = await Relation.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Post Method
router.post('/item', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        discription: req.body.discription,
        type: req.body.type
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    // get the parameters supplied with the call
    try{ 
        let data;
    
        switch(req.query.type)
        {
            case'object': 
            data = await Model.find({ type: 'object' }); 
            break;
            case'container':
            data = await Model.find({ type: 'container' });
            break;
            default: 
            data = await Model.find();
            break;
        }
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.post('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        console.log(id);
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;