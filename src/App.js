import './App.css';
import ContentArea from './components/ContentArea/ContentArea';
import Post from './components/Posts/Post';
import SideCard from './components/SideCards/SideCard';
import BottomBar from './components/TopandBottom/BottomBar';
import TopBar from './components/TopandBottom/TopBar';
// import Card from './components/Card/Card';
// import PostList from './components/PostList/PostList';

function App() {
  return (
    <div className="App container">
        <TopBar />
        {/* <div className="content"style={{display:"flex"}}>
          <SideCard side="leftSide" /> 
          <Post /> 
          <SideCard side="rightSide"  /> 

        </div> */}
        <ContentArea />
        <BottomBar /> 

    </div>
  );
}

export default App;
