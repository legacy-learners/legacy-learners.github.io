import { Hamburger } from "./Hamburger";
import { useState } from "react";

export const Nav = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div>
      <div className="navigation">
        <ul onClick={() => setHamburgerOpen(false)}>
          <li>
            <a href="#"></a>Home
          </li>
          <li>
            <a href="#about"></a>About
          </li>
          <li>
            <a href="#admission"></a>Admission
          </li>
          <li>
            <a href="#why"></a>Why Us
          </li>
          <li>
            <a href="#contact"></a>Contact Us
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

        @media (max-width: 991px) {
          .navigation ul {
            flex-direction: column;
            height: 100vh;
            position: absolute;
            top: 85px;
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
