import admission from "../assets/admission.png";
import { GetInTouch } from "./GetInTouch";

export const Admission = () => (
  <section className="admission_section" id="admission">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="admission_detail-box">
            <h3>Admission open</h3>
            <p>
              We are currently open for applications, even though we haven't
              begun operations just yet. Our team is in the final stages of
              preparing our space, and we're excited to welcome children
              starting in the second week of January.
            </p>
            <p>
              We are currently accepting applications for children from 3 to 6
              years old.
            </p>
            <GetInTouch />
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
