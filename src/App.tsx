import Residents from "./components/Residents/Residents";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ResidentCard from "./components/Residents/ResidentCard";
import Homepage from "./pages/Homepage";
import Star from "./components/Star";

function App() {
  return (
    <div>
      <Star />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/residents/:id" element={<ResidentCard />} />
          <Route path="/location/:id" element={<Residents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
