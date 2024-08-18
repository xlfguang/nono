import React from "react";
import "./style.css";
import nono from "@/assets/img/no-no.webp";
function index() {
  return (
    <div className="aboutUs">
      <div className="title">
        <div className="circle">
          <img src={nono} alt="" />
        </div>
        <h2 className="title-text">NONO</h2>
      </div>
      <div className="introduce-1">
        <div className="introduce-1-left">
          <div>
            <p className="text1">$NONO</p>
            <p className="text1">no Ponzi, no finance！</p>
            <p className="text1">no Sell no Dump!</p>
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
      <div className="info">
        <div>
          <span>Token total supply </span>
          <span>21,000,000</span>
        </div>
        <div>
          <span>Liquidity </span>
          <span>100%</span>
        </div>
        <div>
          <span>Tax </span>
          <span
            style={{
              fontSize: "18PX",
            }}
          >
            10% (7% poor 3% marketing)
          </span>
        </div>
      </div>
      <div className="Contract">
        <span>Contract</span>
        <span className="red">0xF4C532C076A7B7c3E60D17d517ed8d0d34a8a796</span>
      </div>
      <div className="get-in-touch">
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
          <p
            style={{
              fontSize: "16px",
            }}
          >
            This is a social experiment, so there is no detailed roadmap. All
            outcomes are driven by the participants in the experiment
          </p>
        </div>
      </div>

      <div className="web-info">
        <div className="time">@2024 NONO Finance </div>
        <div className="web-info-right">
          <div className="web-info-right-item">
            <span>
              <a href="https://twitter.com/NONOCoins" target="_blank">
                Twitter
              </a>
            </span>
          </div>
          <div className="line"></div>
          <div className="web-info-right-item">
            <span>
              <a href="https://t.me/NONOcoins" target="_blank">
                Telegram
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
