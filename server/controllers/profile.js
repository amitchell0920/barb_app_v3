const Prof = require('../models/profile');

exports.saveProfile = function (req, res, next) {

    const email = req.body.user_email;
    const name = req.body.pr_name;
    const address = req.body.pr_address;
    const city = req.body.pr_city;
    const state = req.body.pr_state;
    const zip = req.body.pr_zip;
    const btype = req.body.pr_btype;
    const pics = req.body.pr_pics;

    // See if a Itin with the given place_id exists
    Prof.findOne({ email: email, name: name }, function (err, existingProf) {
        if (err) { return next(err) }

        // If a Itin with place_id does exist, return an error
        if (existingProf) {
            return res.status(422).send({ error: 'Profile for this business already exists' })
        }

        // If a user with place_id does NOT exist, create and save user itinerary record
        const prof = new Prof({
            email: email,
            name: name,
            address: address,
            city: city,
            state: state,
            zip: zip,
            btype: btype,
            pics: pics
        });

        prof.save(function (err) {
            if (err) { return next(err) }
        });
    })
};

exports.readProfile = function (req, res, next) {
    const email = req.body.user_email;
    Prof.aggregate(
        [
            {
                $match: { email: email }
            }
        ]).sort({ updatedAt: -1 })
        .then(function (savedProf) {
            console.log(savedProf);
            res.send({ payload: savedProf })
        })
        .catch(function (err) {
            res.send("the user saved profile lookup failed");
        });
};