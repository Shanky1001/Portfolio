import Cursor from "./components/cursor/Cursor";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="App bg-white text-black dark:bg-black dark:text-white relative">
      <Cursor />
      <NavBar />
    </div>
  );
}

export default App;
