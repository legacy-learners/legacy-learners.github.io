import { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Nav } from "./Nav";
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
          <Nav />
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
                  We are currently fully booked and no longer taking
                  applications. We welcome parents to enquire for future
                  openings though, should your needs are for the next coming
                  months.
                </p>
                <div className="hero_btn-continer">
                  <GetInTouch />
                </div>
              </div>
              <div className="hero_img-container col-md-12 col-lg-6">
                <div>
                  <img src={heroTest} alt="Hero Section Image" />
                </div>
              </div>
            </div>
          </section>
        </header>
      </div>
    </>
  );
};
