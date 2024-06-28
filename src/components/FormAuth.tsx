import { TextField, Button } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

interface Inputs {
  email: string;
  password: string;
}

const inputsMessages = {
  required: 'Este campo es obligatorio',
  emailValidate: 'Ingrese un email valido',
  passwordLength: 'La contraseña debe tener al menos 8 caracteres',
};
export default function FormAuth() {
  const loc = useLocation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    if (!loc.pathname.includes('/register')) {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        setErrorMessage('Email o contraseña inválidos');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        navigate('/');
      } catch (error) {
        setErrorMessage('El email ya está en uso');
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='formAuth'>
      {errorMessage.length > 0 && (
        <div className='errorMessage'>
          <p>{errorMessage}</p>
        </div>
      )}
      <label>
        <TextField
          className='input'
          {...register('email', {
            required: {
              value: true,
              message: inputsMessages.required,
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: inputsMessages.emailValidate,
            },
          })}
          id='outlined-basic'
          label='Email'
          variant='outlined'
        />
        {errors.email && <p className='errorMessage'>{errors.email.message}</p>}
      </label>
      <label>
        <TextField
          className='input'
          {...register('password', {
            required: {
              value: true,
              message: inputsMessages.required,
            },
            minLength: {
              value: 8,
              message: inputsMessages.passwordLength,
            },
          })}
          id='outlined-basic'
          label='Contraseña'
          variant='outlined'
        />
        {errors.password && (
          <p className='errorMessage'>{errors.password.message}</p>
        )}
      </label>
      <Button type='submit' variant='contained'>
        {!loading && loc.pathname.includes('/register') && 'Registrarse'}
        {!loading && !loc.pathname.includes('/register') && 'iniciar sesión'}
        {loading && <HourglassBottomIcon />}
      </Button>
    </form>
  );
}
