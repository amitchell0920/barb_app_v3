const Appt = require('../models/appointment');

exports.saveAppointment = function (req, res, next) {

    const email = req.body.user_email;
    const name = req.body.cl_name;
    const phone = req.body.cl_phone;
    const date = req.body.cl_date;
    const time = req.body.cl_time;
    const service = req.body.cl_service;
    const message = req.body.cl_message;

    // See if a Appointment exists in the database
    Appt.findOne({ email: email, date: date }, function (err, existingAppt) {
        if (err) { return next(err) }

        // If a Appt does exist, return an error
        if (existingAppt) {
            return res.status(422).send({ error: 'Appointment  for this date already exists' })
        }

        // If a user with appt does NOT exist, create and save user appt record
        const appt = new Appt({
            email: email,
            name: name,
            phone: phone,
            date: date,
            time: time,
            service: service,
            message: message
        });

        appt.save(function (err) {
            if (err) { return next(err) }
        });
    })
};

exports.readAppointment = function (req, res, next) {
    const email = req.body.user_email;
    Appt.aggregate(
        [
            {
                $match: { email: email }
            }
        ]).sort({ updatedAt: -1 })
        .then(function (savedAppt) {
            console.log(savedAppt);
            res.send({ payload: savedAppt })
        })
        .catch(function (err) {
            res.send("the user saved appointment lookup failed");
        });
};