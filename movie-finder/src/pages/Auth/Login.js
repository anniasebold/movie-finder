import { Button, Form as FormB } from 'react-bootstrap';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import './Auth.scss';
import { Link } from 'react-router-dom';

function Login() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>  
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center page">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Email inválido')
              .required("Obrigatório preencher o Email."),
            password: Yup.string()
              .required("Obrigatório preencher a Senha.")
          })} 
          onSubmit={handleSubmit}
        > 
        <div className="card-login">
          <h3>Login</h3>
          <Form>
            <div className="form-auth">
              <FormB.Group controlId="email">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control"></Field>
                <ErrorMessage name="email" component="div" className="alert-error"></ErrorMessage>
              </FormB.Group >
        
              <FormB.Group  controlId="password" className="form-group">
                <label htmlFor="password">Senha</label>
                <Field type="password" name="password" className="form-control"></Field>
                <ErrorMessage name="password" component="div" className="alert-error"></ErrorMessage>
              </FormB.Group >

              <FormB.Group>
                <Button className="btn-login" variant="danger">
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
        </Formik>
      </div>
    </>
  );
}

export default Login;
