const Authentication = require('../controllers/authentication');
const Appointment = require('../controllers/appointment');
const Profile = require('../controllers/profile');

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'Token is valid' })
  });
  app.post('/api/v1/signin', requireSignin, Authentication.signin);
  app.post('/api/v1/signup', Authentication.signup);
  // --V Save user profile 
  app.post('/api/v1/save_profile', Profile.saveProfile);
  app.post('/api/v1/get_profile', Profile.readProfile);
  // --V Save user appointment
  app.post('/api/v1/save_appt', Appointment.saveAppointment);
  app.post('/api/v1/get_appt', Appointment.readAppointment);
  // --V Save user appointment
};
