import "./App.css";
import { Navbar } from "./components/Layout/Navbar.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MvxContextProvider } from "./contexts/ContextProvider.tsx";
import { routes } from "./routes.ts";
import { Home } from "./pages/Home/index.tsx";
import { Footer } from "./components/Layout/Footer.tsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background w-[99dvw] justify-center">
        <Navbar />
        <MvxContextProvider>
          <main className="flex-grow flex w-full justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              {routes.map((route, index) => (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    <div className="flex-grow flex items-center justify-center w-full">
                      <route.component />
                    </div>
                  }
                />
              ))}
            </Routes>
          </main>
        </MvxContextProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
