
import './App.css';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation
} from "react-router-dom";
import { useContext } from 'react';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import useAuth from "./components/useAuth/useAuth";
import { UserInfoContext } from './components/userContext/userContext';
import Home from './components/Pages/Home';
import Landingpage from './components/Pages/Landingpage';
import Register from './components/Register/Register';
import SuccessPage from './components/SuccessPage/SuccessPage';
import VisitorPage from './components/VisitorPage/VisitorPage';
import PageNotFound from "./components/404Page/PageNotFound";

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = useAuth();

  // console.log(isAuthenticated);
  
  return isAuthenticated.authed ? children : <Navigate to="/" replace />;
}

// Avoid prop drilling of loggedInUser
// let context = React.createContext(null);

function App() {

  // eslint-disable-next-line
  const [loggedInUser, setloggedInUser] = useContext(UserInfoContext);

  const loadUser = (data) => {

    // const [id, username, joined, nickname, profile_pic_url, description, header_img_url, location, links] = data;

    setloggedInUser({
        
            id: data.id,
            username: data.username,
            joined_date: data.joined_date,
            nickname: data.nickname,
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

        <Route path="/home/:id" element={

          <RequireAuth>
              <Home/>
          </RequireAuth>

          } />
          
        <Route path="/register" element={<Register loadUser={loadUser} />} />
        
        <Route path="/success" element={<SuccessPage/>} />
          
          <Route path="/users/:id" element={
            <ErrorBoundary>

              <VisitorPage/>
            </ErrorBoundary>
            } />
          <Route path="/tags/:id" element={<VisitorPage/>} />
          <Route path="/tags/name/:id" element={<VisitorPage/>} />
          <Route path="/users/nickname/:id" element={<VisitorPage/>} />

          <Route path="/comment/thread/:id" element={<VisitorPage/>} />

        {/* <Route path="/test" element={<VisitorPage/>}/> */}
        <Route path="*" element={<PageNotFound />} />
      </ Routes>

    </div>
  );
}

export default App;
