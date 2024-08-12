import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/navbar";
import Banner from "./Components/Banner";
import Footer from "./Components/footer";
import { BannerProvider } from "./Components/BannerProvider";

function App() {
  return (
    <BannerProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Banner />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </BannerProvider>
  );
}

export default App;
