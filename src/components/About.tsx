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
              Welcome to Legacy Learners Day Home, where the Montessori
              philosophy inspires a nurturing environment for children to
              explore, discover, and grow at their own pace. Our approach
              encourages curiosity, independence, and lifelong learning.
            </p>
            <p>
              We are proud to align our practices with Alberta's Early Learning
              and Care Framework, ensuring that our program adheres to the
              latest best practices and standards in early childhood development
              within our province. By embracing this framework, we provide your
              child with a high-quality early learning experience that sets the
              stage for a successful educational journey
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
