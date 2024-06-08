import './App.css';
import { Routes, Route } from "react-router-dom";
import Quotes from './Pages/Quotes';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './components/Header';
import Profile from './Pages/Profile';
import CreateQuote from './Pages/CreateQuote';
import RandomeUserProfile from './Pages/RandomeUserProfile';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Quotes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createquotes' element={<CreateQuote />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:id' element={<RandomeUserProfile />} />
      </Routes>
    </>
  );
}

export default App;
