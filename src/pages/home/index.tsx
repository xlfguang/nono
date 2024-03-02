import React from "react";
import "./style.css";
import nono from "@/assets/img/no-no.webp";
function index() {
  return (
    <div className="aboutUs">
      <div className="title">
        <div className="circle"></div>
        <h2 className="title-text">NONO</h2>
      </div>
      <div className="introduce-1">
        <div className="introduce-1-left">
          <div>
            <p className="text1">$NONO</p>
            <p className="text1">no Ponzi, no finance！</p>
          </div>
          <p className="text2">
            A social experiment of absolute fairness, without dumping, filled
            with free play!
          </p>
        </div>
        <div className="introduce-1-right">
          <img className="nono-img" src={nono} alt="" />
          {/* <div className="prohibit"></div>
          <div className="NONO">
            <div>
              <span>NO</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="introduce-2">
        <div className="introduce-2-title">Why you choose?</div>
        <div className="introduce-2-content">
          <p>
            In our past experiences buying many meme tokens, we have been
            concerned about whale dumping, rug pulls, or FOMO.{" "}
          </p>
          <p>
            After purchasing a token, aside from the updates from the project
            team, we cannot access more information.{" "}
          </p>
          <p>
            Our fate is not in our hands but controlled by the project team.
            Therefore, we are ready to launch an absolutely fair and very
            interesting social experiment.
          </p>
        </div>
      </div>
      <div className="introduce-3">
        <div className="introduce-3-left">
          <div>
            <img className="nono-img" src={nono} alt="" />
          </div>
          {/* <div className="prohibit"></div>
          <div className="NONO">
            <div>
              <img className="nono-img" src={nono} alt="" />
            </div>
          </div> */}
        </div>
        <div className="introduce-3-right">
          <div className="introduce-3-right-title">
            <span className="introduce-3-right-title-text">
              Our Core Values
            </span>
          </div>
          <div className="introduce-3-right-content">
            <p>
              If you still have a passion for meme type tokens, let me tell you
              that $NONO is a reward based meme token, but it's not just a pure
              meme.
            </p>
            <p>
              While maintaining absolute fairness, it makes memes more
              interesting.
            </p>
            <p>
              It will reveal the essence of memes and be filled with real market
              dynamics.
            </p>
          </div>
        </div>
      </div>
      <div className="get-in-touch">
        <div className="title">Get in touch?</div>
        <div className="content">
          <p>
            Firstly, $NONO will launch under absolute fairness, offering
            exceptionally generous rewards for early participants and
            supporters.
          </p>
          <p>
            Before the launch of $NONO, we will disclose all information about
            $NONO without any concealment. Furthermore, we will provide detailed
            explanations about the mechanisms of $NONO to help interested users
            better understand it.
          </p>
          <p>
            The more you understand about $NONO, the more you will appreciate
            its uniqueness. It's perfect, just like a piece of art.
          </p>
        </div>
        <div className="touch-btn">Contact us</div>
      </div>

      <div className="web-info">
        <div className="time">© 2024 Feeder. All rights reserved.</div>
        <div className="web-info-right">
          <div className="web-info-right-item">
            <span>Disclaimers</span>
          </div>
          <div className="line"></div>
          <div className="web-info-right-item">
            <span>Terms</span>
          </div>
          <div className="line"></div>

          <div className="web-info-right-item">
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
