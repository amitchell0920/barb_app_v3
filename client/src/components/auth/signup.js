import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (this.props.authenticated) {
      localStorage.setItem('userEmail', this.props.values.email);
      this.context.router.history.push('/');
    };
  }

  handleFormSubmit (formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
    localStorage.setItem('userEmail', this.props.values.email);
    this.context.router.history.push('/');
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    };
  }
  renderLinks () {
    if (this.props.authenticated) {
      // show a link for user to go to Dashboard or Sign Out
      return [
        <li className='nav-item' key={1}>{this.props.message}
        </li>
        ,
        <li className='nav-item' key={2}>
          <Link className='btn btn-default tg-login__btn' to='/dashboard'>Dashboard</Link>
        </li>
        ,
        <li className='nav-item' key={3}>
          <Link className='nav-link' to='/signout'>Sign Out</Link>
        </li>
      ];
    } else {
      // show a link for user to Sign In or Sign Up
      return [
        <li className='nav-item'>
          <Link className='btn btn-default tg-login__btn' to='/signin' key={1}>Sign In</Link>
        </li>
        ,
        <li className='nav-item' key={2}>
          <Link className='btn btn-default tg-login__btn' to='/signup'>Sign Up</Link>
        </li>
      ];
    }
  };

  render () {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <div>
      <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">
          <strong>App Name Here</strong></a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
            <li><a href="#">Tab 2</a></li>
            <li><a href="#">Tab 3</a></li>

          </ul>
          <ul className="nav navbar-nav navbar-right">
            {this.renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
      <div className="tg-login__wrapper">
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input className='form-control' {...email} placeholder='Enter email' />
          {email.touched && email.error && <div className='error'>{email.error}</div>}        
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input className='form-control' {...password} type='password' placeholder='Enter password' />
          {password.touched && password.error && <div className='error'>{password.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <input className='form-control' {...passwordConfirm} type='password' placeholder='Enter password again' />
          {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}          
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign up!</button>
      </form>
      </div>
      </div>
    )
  }
};

function validate (formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  };

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  };

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  };

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  };

  return errors;
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
