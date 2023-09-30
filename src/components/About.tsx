import about from "../assets/about.png";
export const About = () => (
  <section className="about_section" id="about">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="about_img-container">
            <img src={about} alt="Globo green esmerald" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="about_detail-box">
            <h3>About our Day Home</h3>
            <p>
              Welcome to Legacy Learners Dayhome, a Montessori inspired haven
              where children embark on a journey of curiosity, independence, and
              lifelong learning. <br />
              <br />
              Our founder, Ms. Adriana, brings a wealth of experience, with over
              10 years of teaching children and a recent PhD in Education.
            </p>
            <div className="">
              <a href="" className="call_to-btn btn_white-border">
                {" "}
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
