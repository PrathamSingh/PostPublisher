import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Loader,
} from 'semantic-ui-react';

import validateInput from '../validators/login';
import { loginUser } from '../store/actions/auth';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePassword: '',
      confirmPassword: '',
      errors: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        isLoading: false,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.loginUser(this.state, this.props.history);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  render() {
    const { errors, changePassword, confirmPassword, isLoading } = this.state;

    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Link to='/'>
              <Image src='/assets/images/logo.png' size='tiny' centered />
            </Link>

            <Header as='h2' color='teal' textAlign='center'>
              Change Password
            </Header>
            <Form
              size='large'
              onSubmit={this.onSubmit}
              error={errors.loginError ? true : false}
              autoComplete='off'
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  name='changePassword'
                  placeholder='change password'
                  defaultValue={changePassword}
                  error={errors.changePassword ? true : false}
                  onChange={this.onChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  name='confirmPassword'
                  placeholder='Password'
                  type='password'
                  defaultValue={confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  onChange={this.onChange}
                />

                <Message error content={errors.loginError} />

                <Button color='teal' fluid size='large' disabled={isLoading}>
                  {!isLoading ? (
                    'Login'
                  ) : (
                    <Loader active inverted inline size='small' />
                  )}
                </Button>
              </Segment>
            </Form>
            <Message>
              Don't have an account? <Link to='/sign-up'>Sign up!</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(ChangePassword);
