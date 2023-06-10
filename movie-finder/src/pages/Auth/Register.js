import { Button, Form as FormB } from 'react-bootstrap';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/apiFirebase';
import { translateError } from './ErrorAuth';
import Loading from '../../components/Loading/Loading';
import './Auth.scss';

function Login() {
  const [isSuccess, setIsSuccess] = useState(false);

  const [ createUserWithEmailAndPassword, user, loading, error ] =
  useCreateUserWithEmailAndPassword(auth);

  async function handleSingUp({ email, password }, { resetForm }) {
    const response = await createUserWithEmailAndPassword(email, password);

    if(response) {
      console.log(response);
      setIsSuccess(true);
      resetForm();

      localStorage.setItem("token", response._tokenResponse.idToken)
      localStorage.setItem("email", response.user.email)
    }
  }

  if(loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Cadastro</title>
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
          onSubmit={handleSingUp}
        >
          {({ isValid }) => (
            <div className="card-login">
              {isSuccess ? (
                <>
                  <div className='success-message'>
                    <h5>Usuário criado com sucesso!</h5>
                    <Link to="/">Voltar para o início</Link>
                  </div>
                </>
              ) : (
              <Form> 
                <h3>Cadastro</h3>
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
                      Criar conta
                    </Button>
                  </FormB.Group>
                </div>
                <span>
                  <span className="inline">Já é um usuário?</span>{" "}
                  <Link to="/login" className="text-form">
                    Faça seu Login
                  </Link>
                </span>
              </Form>
              )}
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
