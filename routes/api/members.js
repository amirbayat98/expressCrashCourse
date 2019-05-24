const express = require('express');
const uuid = require('uuid');
let router = express.Router();
//const router = express.Router();
const member = require('../../Member');

router.get('/:id', function (req, res) {
    console.log("req : ", req.params.id);
    const found = member.some(member => member.id === parseInt(req.params.id));
    if (found){
        res.json(member.filter(function (member) {
            return member.id === parseInt(req.params.id);
        }));
    } else {
        res.status(400).json({msg : `member ${parseInt(req.params.id)} not found `});
    }
});

router.get('/', function (req, res) {
    res.json(member);
});
//create member
router.post('/', function (req, res) {
    console.log("req body :", req.body);

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if(!newMember.name || !newMember.email){
        res.status(400).json({msg: 'please include name and email'});
    } else {
        member.push(newMember);
        //res.json(member);
        res.redirect('/');
    }

});

//update member
router.put('/:id', function (req, res) {
    console.log("req : ", req.params.id);
    const found = member.some(member => member.id === parseInt(req.params.id));
    if (found) {
        let updMember = req.body;
        member.forEach(function (member) {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg : 'member updated', member});
            }
        });
    } else {
        res.status(400).json({msg : `member ${parseInt(req.params.id)} not found `});
    }
});

//delete memebr
router.delete('/:id', function (req, res) {
    console.log("req : ", req.params.id);
    const found = member.some(member => member.id === parseInt(req.params.id));
    if (found){
        res.json({
            msg: "memeber deleted",
            members: member.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg : `member ${parseInt(req.params.id)} not found `});
    }
});

module.exports = router;
