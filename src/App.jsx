import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import HomeProtector from '@/context/HomeProtector';
import { NotFound } from '@/pages/NotFound';
import { Signup } from '@/pages/Signup';
import { Login } from '@/pages/Login';
import AuthProtector from '@/context/AuthProtector';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <HomeProtector>
            <Home />
          </HomeProtector>
        } />
        <Route path='/login' element={
          <AuthProtector>
            <Login />
          </AuthProtector>
        } />
        <Route path='/signup' element={
          <AuthProtector>
            <Signup />
          </AuthProtector>
        } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
