import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import SetAvatar from './Pages/SetAvatar';
import Logout from './Components/Logout';

function App() {
  return (
   <BrowserRouter>
      <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/setavatar' element={<SetAvatar/>}/>
            <Route path='/' element={<Chat/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='*' element={<Login/>}/>



      </Routes>
   </BrowserRouter>
  );
}

export default App;
