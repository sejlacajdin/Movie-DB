import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import MediaDetails from "./pages/MediaDetails/MediaDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/media-details" element={<MediaDetails />} />

      {/* Universal catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
