import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import useAuth from "./components/useAuth/useAuth";
import Home from './components/Pages/Home';
import Landingpage from './components/Pages/Landingpage';
import Register from './components/Register/Register';
import SuccessPage from './components/SuccessPage/SuccessPage';
import Test from './components/TestPage/TestPage';

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = useAuth();

  // console.log(isAuthenticated);
  
  return isAuthenticated.authed ? children : <Navigate to="/" replace />;
}


function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={
        
            <RequireAuth>
              <Home/>
            </RequireAuth>
          } />
        <Route path="/register" element={<Register/>} />
        <Route path="/success" element={<SuccessPage/>} />

          <Route path="/test" element={<Test/>}
          />
        {/* <Route path="*" element={<Homepage/>} /> */}
      </ Routes>

    </div>
  );
}

export default App;
