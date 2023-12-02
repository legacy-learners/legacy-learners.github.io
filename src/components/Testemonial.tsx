import adriana from "../assets/adriana.jpg";
export const Testemonial = () => (
  <section className="client_section layout_padding">
    <h2 className="">Our Founder</h2>
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="client_img-box">
            <img src={adriana} alt="Ms. Adriana Naomi's picture" />
          </div>
        </div>
        <div className="col-md-9">
          <div className="client_detail-box">
            <h5>Ms. Adriana Naomi</h5>
            <p>
              Meet Ms. Adriana, aka Drica, a dedicated Early Childhood
              Professional ECE Level 3, who holds a graduation, master's, and
              PhD degree in Education. With over a decade of unwavering
              commitment to the field, Adriana has been instrumental in shaping
              the educational experiences of countless young learners.
            </p>
            <p>
              Through years of hands-on work, Ms. Adriana has honed a deep
              understanding of child development and effective pedagogical
              practices. This knowledge, combined with a passion for fostering
              children's holistic growth, has allowed her to create dynamic and
              engaging learning environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
