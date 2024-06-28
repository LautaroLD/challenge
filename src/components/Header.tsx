import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
export default function Header() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);
  return (
    <header>
      <div className='userComponent'>
        <PersonIcon />
        <p>{isAuth?.email}</p>
      </div>
      <LogoutIcon
        className='logoutIcon'
        onClick={() => {
          signOut(auth), navigate('/');
        }}
      />
    </header>
  );
}
