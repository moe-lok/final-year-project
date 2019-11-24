const router = require('express').Router();
let Machine = require('../../models/machine.model')

router.route('/').get((req, res) => {
    Machine.find()
        .then(machines => res.json(machines))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const machineId = req.body.machineId;
    const machineName = req.body.machineName;
    const ordering = Number(req.body.ordering);
    const machineType = req.body.machineType;

    const newConfMach = new Machine({
        machineType,
        machineId,
        machineName,
        ordering,
    });

    newConfMach.save()
    .then(() => res.json('Machine added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/machinefindone/:id').get((req, res) => {
    
    Machine.findOne({machineId: req.params.id}).sort({'_id':-1}).limit(1)
    .then(status => res.json(status))
    .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;