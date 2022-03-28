const { json } = require('express');
const express = require('express');
const { findByIdAndDelete } = require('../models/hirdetes');
const router = express.Router();

const Hirdetes = require('../models/hirdetes');
const Kategoria = require('../models/kategoria');

router.post('/', function (req, res, next) {
    const _id = req.body._id;
    const kategoria = req.body.kategoria
    const cim = req.body.cim;
    const leiras = req.body.leiras;
    const hirdetesDatuma = req.body.hirdetesDatuma;
    const serulesmentes = req.body.serulesmentes;
    const arFt = req.body.arFt;
    const kepUrl = req.body.kepUrl;

    try {
        if (arFt % 1000 != 0) {
            throw Error("Az ár nem oszthato 1000-rel")
        }
        const hirdetes = new Hirdetes({ _id, kategoria, cim, leiras, hirdetesDatuma, serulesmentes, arFt, kepUrl });

        hirdetes
            .save()
            .then(res.status(200).json({ "status": "created" }))
            .catch(err => console.log(err))
    } catch (err) {
        res.status(400) - json({
            "error": err.message,
        })
    }


});

router.get('/', function (req, res, next) {
    Hirdetes
        .find()
        .then(hirdetesek => {
            res.json(hirdetesek);
        })
});


router.get("/:mezo", function (req, res, next) {
    const mezo = req.params.mezo;
    Hirdetes
        .find()
        .populate('kategoria', "nev")
        .sort({ [mezo]: 1 })
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err))
})

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;

    Hirdetes
        .findById(id)
        .then(response => {
            if (response === null) {
                return res.json({ "error": `A hirdetes ${id} azonositoval nem letezik` })
            }
            Hirdetes
                .findByIdAndDelete(id)
                .then(res.status(200).json({
                    "message": `A hirdetes ${id} azonositoval torlesre kerult!`
                }))
                .catch(err => console.log(err))
        })
})

module.exports = router;