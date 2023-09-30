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
          <div className="col-md-3 offset-md-1">
            <h5>About Us</h5>
            <p>
              Montessori inspired Dayhome with a carefully prepared environment
              to inspire.
            </p>
          </div>
          <div className="col-md-3 offset-md-1">
            <h5>Contact Us</h5>
            <p>
              Questions? Comments? Feel free to reach out! Let's create a
              supportive and enriching community for our little ones together.
            </p>
          </div>
          <div className="col-md-3 offset-md-1">
            <div className="subscribe_container">
              <h5>Newsletter</h5>
              <div className="form_container">
                <form action="">
                  <input type="email" placeholder="Enter your email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="social_container">
          <div className="social-box">
            <a href="">
              <img src={instagram} alt="instagram icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
    <section className="container-fluid footer_section"></section>
  </>
);
