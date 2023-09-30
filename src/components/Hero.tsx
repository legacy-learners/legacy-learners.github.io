import { useEffect, useState } from "react";
import { createClient } from "contentful";
import logo from "../assets/logo.svg";
const space = "ljrxchhp4vz2";
const accessToken = "CUouakjeZLk-MieMMtrUPlv-cy-t9opi9ZKjkwNWWu0";

const contentfulClient = createClient({
  space: space,
  accessToken: accessToken,
});

export const Hero = () => {
  const [entries, setEntries] = useState<any>();

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
                <div className="hero_btn-continer">
                  <a href="" className="call_to-btn btn_white-border">
                    {" "}
                    Read More
                  </a>
                </div>
              </div>
              <div className="hero_img-container col-md-12 col-lg-6">
                <div>
                  <img
                    src={entries?.items[0].fields?.heroImage?.fields.file.url}
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
