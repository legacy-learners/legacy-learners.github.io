import why from "../assets/why.png";
import { GetInTouch } from "./GetInTouch";
import determine from "../assets/determine.png";
export const Why = () => (
  <>
    <section className="why_section" id="why">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="why_img-container">
              <img src={why} alt="Why learn on Legacy Learners Dayhome" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="why_detail-box">
              <h3>Why learn on Legacy Learners Dayhome</h3>
              <p>
                Our program is deeply rooted in the Montessori philosophy, which
                not only promotes independence and creativity but also aligns
                with the principles outlined in the Alberta Early Learning and
                Care Framework. We believe in providing an environment where
                your child can explore, experiment, and develop vital life
                skills.
              </p>
              <p>
                Here, your child will have the opportunity to thrive, nurturing
                a lifelong love of learning while developing the essential
                skills they need to succeed.
              </p>

              <GetInTouch />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="determine_section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="determine_detail-box">
              <h3>Our Services</h3>
              <p>
                Full-Time Care: From early morning to late afternoon, we offer
                comprehensive childcare services that ensure your child's
                well-being and development.
                <br />
                <br />
                Part-Time Options: We understand that every family has unique
                needs. That's why we also offer flexible part-time schedules to
                accommodate your busy lives.
              </p>
            </div>
          </div>
          <div className="col-md-6 determine-holder">
            <div className="determine_img-container">
              <img src={determine} alt="Yellow Pencil" />
            </div>
          </div>
        </div>
        <div className="row schedule">
          <div className="col-md-6 client_section">
            <h2 className="layout_padding">Schedule</h2>
            <table cellPadding="10px" className="schedule_table" border={1}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7:30 - 8:00 a.m.</td>
                  <td>Breakfast</td>
                </tr>
                <tr>
                  <td>8:00 - 10:00 a.m.</td>
                  <td>Montessori work</td>
                </tr>
                <tr>
                  <td>10:00 - 10:30 a.m.</td>
                  <td>Morning snack</td>
                </tr>
                <tr>
                  <td>10:30 - 10:45 a.m.</td>
                  <td>Transition to outdoor time</td>
                </tr>
                <tr>
                  <td>10:45 - 11:45 a.m.</td>
                  <td>Outdoor time</td>
                </tr>
                <tr>
                  <td>11:45 - 12:00 p.m.</td>
                  <td>Transition to lunch</td>
                </tr>
                <tr>
                  <td>12:00 - 12:30 p.m.</td>
                  <td>Lunch</td>
                </tr>
                <tr>
                  <td>12:30 - 1:00 p.m.</td>
                  <td>Circle time</td>
                </tr>
                <tr>
                  <td>1:00 - 1:15 p.m.</td>
                  <td>Transition to Nap time</td>
                </tr>
                <tr>
                  <td>1:15 - 3:15 p.m.</td>
                  <td>Nap</td>
                </tr>
                <tr>
                  <td>3:15 - 3:45 p.m.</td>
                  <td>Afternoon snack</td>
                </tr>
                <tr>
                  <td>3:45 - 4:00 p.m.</td>
                  <td>Transition to outdoor time</td>
                </tr>
                <tr>
                  <td>4:00 - 5:00 p.m.</td>
                  <td>Outdoor</td>
                </tr>
                <tr>
                  <td>5:00 - 5:15 p.m.</td>
                  <td>Transition to inside</td>
                </tr>
                <tr>
                  <td>5:15 - 5:45 p.m.</td>
                  <td>Play time</td>
                </tr>
                <tr>
                  <td>5:45 - 6:00 p.m.</td>
                  <td>Dismissal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </>
);
