import { Button, Form as FormB } from 'react-bootstrap';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import './Auth.scss';
import { Link } from 'react-router-dom';
import { db } from '../../services/apiFirebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function Login() {
  const [users, setUsers] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const usersCollectionRef = collection(db, 'users');

  async function onSubmit({ email, password }, { setFieldError, resetForm }) {
    const emailExists = users.some(user => user.email === email);
    if(emailExists) {
      setFieldError('email', 'Email já utilizado.');
      return;
    }
    await addDoc(usersCollectionRef, { email, password });
    setIsSuccess(true);
    resetForm();
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [ ]);

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
          })}
          onSubmit={onSubmit}
        >
          {({ isValid }) => (
            <div className='card-login'>
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
                <div className="form-auth">
                  <FormB.Group controlId="email"name="email">
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" className="form-control"></Field>
                    <ErrorMessage name="email" component="div" className="alert-error"></ErrorMessage>
                  </FormB.Group >
            
                  <FormB.Group
                    controlId="password"
                    className="form-group"
                    name="password"
                  >
                    <label htmlFor="password">Senha</label>
                    <Field type="password" name="password" className="form-control"></Field>
                    <ErrorMessage name="password" component="div" className="alert-error"></ErrorMessage>
                  </FormB.Group >
  
                  <FormB.Group>
                    <Button type="submit" className="btn-login" variant="danger" disabled={!isValid}>
                      Crie sua conta
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
