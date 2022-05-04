import { useState, useContext } from 'react';
import { Navigate } from 'react-router';
import useForm from '../../hooks/useForm';
import validateLogin from '../../utils/validateLogin';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

function Login(props) {
  const authContext = useContext(AuthContext);
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
  );
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState();

  const {
    authState,
  } = authContext;

  const intialState = {
    email: '',
    password: '',
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useForm(intialState, validateLogin);

  const onSubmit = async (credentias) => {
    setLoginLoading(true);

    fetch('/users')
      .then(res => res.json())
      .then(({ data }) => {

        const user = data.find(user => user.email === credentias.email);
        if (user) {
          authContext.setAuthState(user);
          setTimeout(() => {
            setRedirectOnLogin(true);
          }, 700);
        } else {
          throw new Error('User not found');
        }
      })
      .catch(error => {
        setLoginLoading(false);
        setLoginError(error.message);
      });
  }


  return (
    <div>
      {(!!authState.userInfo || redirectOnLogin) && <Navigate to="/dashboard" />}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form__content">
          {loginError && (
            <p className="login-form__error"> {loginError} </p>
          )}
          <div className="login-form__header">Sign In</div>
          <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Your email"
            className="login-form__input"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <p className='login-form__error'> {errors.email} </p>}
          <input
            type="password"
            name="password"
            className="login-form__input"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && <p className='login-form__error'> {errors.password} </p>}
          {
            loginLoading ? <span>Loading...</span> : (
              <button type="submit" className="login-form__button" disabled={isSubmitting}>
                Login
              </button>
            )
          }
        </div>
      </form >
    </div >
  );
}

export default Login;
