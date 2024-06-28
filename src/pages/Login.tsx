import { Link } from 'react-router-dom';
import FormAuth from '../components/FormAuth';

export default function Login() {
  return (
    <>
      <h2>Inicia sesión para comenzar</h2>
      <FormAuth />
      <section>
        <p>
          No tienes cuanta? <Link to='/register'>regístrate</Link>
        </p>
      </section>
    </>
  );
}
