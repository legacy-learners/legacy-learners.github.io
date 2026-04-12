import admission from "../assets/admission.png";
import { GetInTouch } from "./GetInTouch";

export const Admission = () => (
  <section className="admission_section" id="admission">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="admission_detail-box">
            <h3>Admission</h3>
            <p>
              We'd love to hear from you if you're interested in joining our
              dayhome family. We welcome children from 15 months to 4 years of
              age.
              <br />
              <br /> While we don't have any immediate openings, our waiting
              list is currently open. We'll be sure to reach out to families
              when spots become available in the future.
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
