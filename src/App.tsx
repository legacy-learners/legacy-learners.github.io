import "./App.css";
import { About } from "./components/About";
import { Admission } from "./components/Admission";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Testemonial } from "./components/Testemonial";
import { Why } from "./components/Why";

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
