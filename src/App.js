
import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from 'react';
import useAuth from "./components/useAuth/useAuth";
import { UserInfoContext } from './components/userContext/userContext';
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

// Avoid prop drilling of loggedInUser
// let context = React.createContext(null);

function App() {

  // const [loggedInUser, setloggedInUser] = useState({
  //     id:"",
  //     username:"",
  //     joined_date:"",
  //     tag:"",
  //     profile_pic_url:"",
  //     description:"",
  //     header_img_url:"",
  //     location:"",
  //     links:"",
  // });

  const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

  const loadUser = (data) => {

    // const [id, username, joined, tag, profile_pic_url, description, header_img_url, location, links] = data;

    setloggedInUser({
        
            id: data.id,
            username: data.username,
            joined_date: data.joined_date,
            tag: data.tag,
            profile_pic_url: data.profile_pic_url,
            description: data.description,
            header_img_url: data.header_img_url,
            location: data.location,
            links: data.links,
    })
  }

  
  return (
    <div className="App container">

      <Routes>
        <Route path="/" element={<Landingpage loadUser={loadUser} />} />

          
          <Route path="/home" element={

              
              <RequireAuth>
                  <Home/>
              </RequireAuth>
            } />
        <Route path="/register" element={<Register loadUser={loadUser} />} />
        <Route path="/success" element={<SuccessPage/>} />

          <Route path="/test" element={<Test/>}/>
        {/* <Route path="*" element={<Homepage/>} /> */}
      </ Routes>

    </div>
  );
}

export default App;
