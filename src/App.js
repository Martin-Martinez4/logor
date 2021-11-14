import './App.css';
import ContentArea from './components/ContentArea/ContentArea';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Link
} from "react-router-dom";
import Homepage from './components/Pages/Home';
import Landingpage from './components/Pages/Landingpage';
import BottomBar from './components/TopandBottom/BottomBar';
import TopBar from './components/TopandBottom/TopBar';
import Register from './components/Register/Register';
// import Card from './components/Card/Card';
// import PostList from './components/PostList/PostList';

function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Homepage/>} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="*" element={<Homepage/>} /> */}
      </ Routes>

    </div>
  );
}

export default App;
