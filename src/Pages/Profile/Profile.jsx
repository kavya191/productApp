import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';
import { Link } from 'react-router-dom';
import '../Profile/Profile.css';

const Profile = () => {
  const { logout } = useContext(AppContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Container>
      <h1 >User Profile</h1>
      <div className='d-flex justify-content-center align-items-center mt-5 pb-5 mb-5'>
        <img className=' pro_img' src='https://i.postimg.cc/ZRZd9vpQ/images.png' alt='Profile'></img>
      </div>
      {user && (
        <>

          <p className='d-flex justify-content-center align-items-center'>Email: {user.email}</p>

        </>
      )}
      <div className='d-flex justify-content-center align-items-center'>
        <Link to='/'><button onClick={logout} className='border-0 bg-dark text-white'>Logout</button></Link>
      </div>
    </Container>
  );
};

export default Profile;
