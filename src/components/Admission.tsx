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
              We are currently open for applications from 3 to 6 years old. Our
              team is very excited to show our space and meet parents and childs
              for a greet and meet!
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
