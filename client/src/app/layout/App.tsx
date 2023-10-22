import { Container } from 'semantic-ui-react';
import Navbar from './NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import AgeVerificationPage from '../../features/home/AgeVerificationPage';

export default function App() {
  // const { commonStore, userStore } = useStore();

  const location = useLocation();

  // useEffect(() => {
  //   if (commonStore.token) {
  //     userStore.getUser().finally(() => commonStore.setAppLoaded());
  //   } else {
  //     commonStore.setAppLoaded();
  //   }
  // }, [commonStore, userStore])

  // if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />


  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  )
};
