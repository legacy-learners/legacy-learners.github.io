import admission from "../assets/admission.png";
export const Admission = () => (
  <section className="admission_section" id="admission">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="admission_detail-box">
            <h3>Admission open</h3>
            <p>
              Admission now open! <br /> Enroll Today at Legacy Learners
              Dayhome. Join us in nurturing young minds with Montessori inspired
              care and creativity.
            </p>
            <div className="">
              <a href="" className="call_to-btn btn_white-border">
                {" "}
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="admission_img-container">
            <img src={admission} alt="admission yellow backpack" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
