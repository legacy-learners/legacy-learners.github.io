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
              If you are interested in enrolling your child, please get in
              touch. We accept children from 18 months to 4 years.
              <br /> <br />
              We are <strong>accepting applications</strong> for our waiting
              list and will start interviewing families in July for spots
              available on August 2025.
            </p>
            {/* <p>
              We are currently fully booked and no longer taking applications.
              We welcome parents to enquire for future openings though, should
              your needs are for the next coming months.
            </p> */}
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
