import { useEffect, useState } from "react";
import { createClient } from "contentful";
import logo from "../assets/logo.svg";
import { GetInTouch } from "./GetInTouch";
import heroTest from "../assets/hero_test.png";

const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID ?? "",
  accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN ?? "",
});

export const Hero = () => {
  const [_, setEntries] = useState<any>();

  useEffect(() => {
    const content = async () => {
      const entries = await contentfulClient.getEntries({
        content_type: "hero",
      });
      setEntries(entries);
    };
    content();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg custom_nav-container">
        <div className="nav-wrapper">
          <a className="navbar-brand" href="index.html">
            <img src={logo} alt="logo" />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    {" "}
                    About
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#admission">
                    {" "}
                    Admission
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#why">
                    {" "}
                    Why Us
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="top_container">
        <header className="header_section">
          <section className="hero_section">
            <div className="hero-container container">
              <div className="hero_detail-box col-md-12 col-lg-6">
                <h1>Montessori inspired Dayhome</h1>
                <p>
                  Welcome to our Montessori inspired dayhome, where we provide a
                  nurturing environment that fosters the growth and development
                  of young minds.
                </p>

                <p>
                  We are preparing to start operating in the second week of
                  January 2024. <br />
                  We are currently accepting applications for children from 15
                  months to 6 years old.
                </p>
                <div className="hero_btn-continer">
                  <GetInTouch />
                </div>
              </div>
              <div className="hero_img-container col-md-12 col-lg-6">
                <div>
                  <img
                    // src={entries?.items[0].fields?.heroImage?.fields.file.url}
                    src={heroTest}
                    alt="Hero Section Image"
                  />
                </div>
              </div>
            </div>
          </section>
        </header>
      </div>
    </>
  );
};
