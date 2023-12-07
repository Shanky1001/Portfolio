import data from "./data/data.json";
import Home from "./page/home/Home.tsx";

function App() {
  return (
    <div className="bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden">
      <Home data={data} />
    </div>
  );
}

export default App;
