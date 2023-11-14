import "./App.css";
import { About } from "./components/About";
import { Admission } from "./components/Admission";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Testemonial } from "./components/Testemonial";
import { Why } from "./components/Why";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
function App() {
  return (
    <>
      <Hero />
      <div className="common_style">
        <About />
        <Admission />
        <Why />
      </div>
      <Testemonial />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
