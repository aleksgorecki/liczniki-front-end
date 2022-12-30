import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './components/homepage';
import { Container } from '@mui/system';
import { UserHomepage } from './components/userHomepage';
import { EmployeeHomepage } from './components/employeeHomepage';
import { NoMatch } from './components/noMatch';
import { Navbar } from './components/navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='user' element={<UserHomepage />} />
        <Route path='employee' element={<EmployeeHomepage />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
