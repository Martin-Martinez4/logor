import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Homepage from './components/Pages/Home';
import Landingpage from './components/Pages/Landingpage';
import Register from './components/Register/Register';
import SuccessPage from './components/SuccessPage/SuccessPage';


function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Homepage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/success" element={<SuccessPage/>} />
        {/* <Route path="*" element={<Homepage/>} /> */}
      </ Routes>

    </div>
  );
}

export default App;
