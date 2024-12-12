import "./App.css";
import { Navbar } from "./components/Layout/Navbar.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MvxContextProvider } from "./contexts/ContextProvider.tsx";
import { routes } from "./routes.ts";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="min-h-screen bg-[#0D0B1A] w-full flex items-center justify-center p-4">
          <Navbar />
          <MvxContextProvider>
            <Routes>
              {routes.map((route, index) => (
                <Route path={route.path} key={index} element={<route.component />} />
              ))}
            </Routes>
          </MvxContextProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
