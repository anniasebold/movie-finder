import { Button, Form as FormB } from 'react-bootstrap';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/apiFirebase';
import { translateError } from './ErrorAuth';
import Loading from '../../components/Loading/Loading';
import './Auth.scss';
import { AuthContext } from '../../context/Auth';
import { useContext, useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [ signInWithEmailAndPassword, user, loading, error ] = useSignInWithEmailAndPassword(auth);

  async function handleSignIn({ email, password }) {
    await signInWithEmailAndPassword(email, password);

    if(user) {
      navigate("/");
    };
  }

  useEffect(() => {
    if(currentUser) {
      navigate("/");
    }
  }, [ currentUser, navigate ]);

  
  if(loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center page">
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnMount
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Email inválido')
              .required('Obrigatório preencher o Email.'),
            password: Yup.string()
              .required('Obrigatório preencher a Senha.')
              .min(6, 'A senha deve ter no mínimo 6 caracteres.')
          })}
          onSubmit={handleSignIn}
        >
          {({ isValid }) => (
            <div className="card-login">
              <Form> 
                <h3>Login</h3>
                {error && (
                  <div className="error-message">{translateError(error.message)}</div>
                )}
                <div className="form-auth">
                  <FormB.Group controlId="email"name="email">
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" className="form-control"></Field>
                    <ErrorMessage name="email" component="div" className="alert-error"></ErrorMessage>
                  </FormB.Group >
            
                  <FormB.Group controlId="password" className="form-group" name="password">
                    <label htmlFor="password">Senha</label>
                    <Field type="password" name="password" className="form-control"></Field>
                    <ErrorMessage name="password" component="div" className="alert-error"></ErrorMessage>
                  </FormB.Group >
  
                  <FormB.Group>
                    <Button type="submit" className="btn-login" variant="danger" disabled={!isValid}>
                      Login
                    </Button>
                  </FormB.Group>
                </div>
                <span>
                  <span className="inline">Não é um usuário?</span>{" "}
                  <Link to="/register" className="text-form">
                    Crie sua conta
                  </Link>
                </span>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
