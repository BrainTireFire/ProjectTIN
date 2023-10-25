import { Container } from 'semantic-ui-react';
import Navbar from './NavBar';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/api/users/useCurrentUser';
import { useEffect, useState } from 'react';

export default function App() {
  const jwtToken = localStorage.getItem('jwt');

  return (
    <div>
      {jwtToken ? (
        <>
          <Navbar />
          <Container>
            <Outlet />
          </Container>
        </>
      ) : (
        <Navigate to={"/home"} />
      )}
    </div>
  );
};
