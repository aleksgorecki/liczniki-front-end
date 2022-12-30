import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './components/homepage';
import { Container } from '@mui/system';
import { UserHomepage } from './components/userHomepage';
import { EmployeeHomepage } from './components/employeeHomepage';
import { NoMatch } from './components/noMatch';
import { Navbar } from './components/navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userType, getCurrentUser, setCurrentUser } from './userType';

const theme = createTheme({
  palette: {
      primary: {
          main: '#7ec3a6',
          contrastText: '#fff',
      },
      secondary: {
          main: '#ffa89a',
          contrastText: '#fff',
      },
  },
});

const renderHomepage = () => {
  console.log(getCurrentUser())
  switch(getCurrentUser()) {
    case userType.client:
      return <UserHomepage />
    case userType.employee:
      return <EmployeeHomepage />
    case userType.none:
      return <Homepage />
    default:
      return <Homepage />
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={renderHomepage()}/>
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
