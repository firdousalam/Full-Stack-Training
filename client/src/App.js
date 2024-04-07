import PostCreate from "./Components/PostCreate";
import PostList from "./Components/PostList";
function App() {
  
  return (
    <div className="container">
      <div className="App">
        Blog App
      </div>
      <PostCreate />
      <hr />
      <h3>Posts</h3>
      <PostList />
    </div>
  );
}

export default App;
