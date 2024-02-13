import { Hamburger } from "./Hamburger";
import { useState } from "react";

export const Nav = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div>
      <div className="navigation">
        <ul onClick={() => setHamburgerOpen(false)}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#admission">Admission</a>
          </li>
          <li>
            <a href="#why">Why Us</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
        <div
          className="hamburger"
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
        >
          <Hamburger isOpen={hamburgerOpen} />
        </div>
      </div>

      <style>{`
        .navigation {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          color: white;
          margin: 0 auto;
          justify-content: center;
          min-width: 50px;
          position: relative;
          overflow: ${hamburgerOpen ? "visible" : "hidden"};
        }

        .navigation ul {
          display: flex;
          flex-wrap: wrap;
          float: right;
          margin: 0px;
          padding: 0px;
          overflow: hidden;
        }
        .navigation ul li {
          list-style-type: none;
          padding-right: 10px;
          margin-left: 10px;
        }

        .navigation ul li a {
          color: white;
          width: 100%;
        }

        @media (max-width: 991px) {
          .navigation ul {
            flex-direction: column;
            height: 100vh;
            position: absolute;
            top: 75px;
            right: ${hamburgerOpen ? 0 : "-400px"};
            min-width: 400px;
            max-width: 85%;
            background: var(--main-color);
            transition: all 0.3s linear;
          }
          .navigation ul li {
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};
