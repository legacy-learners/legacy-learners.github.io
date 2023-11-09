import logo from "../assets/logo.svg";
import instagram from "../assets/instagram.png";

export const Footer = () => (
  <>
    <section className="info_section layout_padding-top">
      <div className="info_logo-box">
        <img src={logo} alt="Logo" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Montessori inspired Dayhome with a carefully prepared environment
              to inspire.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>
              Questions? Comments? Feel free to reach out! Let's create a
              supportive and enriching community for our little ones together.
            </p>
          </div>
          <div className="col-md-4">
            <iframe
              width="100%"
              height="150"
              style={{ border: "0" }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJZ2--1-WdcVMRuEfRFJT6jBM&key=${
                import.meta.env.VITE_GMAPS_API_KEY
              }`}
            ></iframe>
            <p>
              Visit us at{" "}
              <a
                className="address-link"
                href="https://maps.app.goo.gl/AFiRDfNJ2V7RNzfHA"
                target="_blank"
              >
                38 Legacy Common SE, Calgary
              </a>
              , in the beautiful community of Legacy!
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="social_container">
          <div className="social-box">
            <a
              href="https://www.instagram.com/legacylearners_dayhome/"
              target="_blank"
            >
              <img src={instagram} alt="instagram icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
    <section className="container-fluid footer_section"></section>
  </>
);
