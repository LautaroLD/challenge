import { Link } from 'react-router-dom';
import FormAuth from '../components/FormAuth';

export default function Register() {
  return (
    <>
      <h2>Regístrate para comenzar</h2>
      <FormAuth />
      <section>
        <p>
          Ya tienes cuanta? <Link to='/login'>Inicia sesión</Link>
        </p>
      </section>
    </>
  );
}
