import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import "./App.css" ;
function App() {
  
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-area">
        <Outlet />
      </main>
    </div>
  );
}

export default App
