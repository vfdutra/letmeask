import { useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';

import { usePersistedState } from './hooks/usePersistedState';

import {GlobalStyle} from "./styles/global";

import {light} from './styles/themes/light';
import {dark} from './styles/themes/dark';

export default function App() {
  const [theme, setTheme] = usePersistedState('theme', light);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme => currentTheme.title === 'light' ? dark : light);
  }, [setTheme]);

  function RoomWithToggle() {
    return <Room toggleTheme={toggleTheme} />;
  }

  function AdminRoomWithToggle() {
    return <AdminRoom toggleTheme={toggleTheme} />;
  }

  function HomeWithToggle() {
    return <Home toggleTheme={toggleTheme} />;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<HomeWithToggle />} />
            <Route path="/rooms/new" element={<NewRoom />} />
            <Route path="/rooms/:id" element={<RoomWithToggle />} />
            <Route path="/admin/rooms/:id" element={<AdminRoomWithToggle />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}