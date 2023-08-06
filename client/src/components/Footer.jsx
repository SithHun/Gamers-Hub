import React, { useState } from "react";

export default function SiteFooter() {
  const openNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="container footer bg-slate">
      <footer className="text-center text-lg-start py-5">
        <div className="container d-flex justify-content-center py-5">
          <img
            className="btn-footer mx-4"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          ></img>
          <img
            onClick={() => openNewTab("https://facebook.com")}
            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
            className="btn-footer mx-4"
          ></img>
          <img
            onClick={() => openNewTab("https://twitter.com")}
            className="btn-footer mx-4"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
          ></img>
        </div>
        <div className="flexWrapper sm-flexWrapper">
          <h6 className="text-center text-light footerText">
            Gamer's Hub 2023 | Developed by{" "}
          </h6>
          <div className="projectMembers">
            <div className="memberContainer">
              <img
                onClick={() => openNewTab("https://github.com/SithHun")}
                className="projectMember mx-4"
                src="https://avatars.githubusercontent.com/u/125325763?v=4"
              ></img>
              <h3 className="memberName">Seth Sun</h3>
            </div>
            <div className="memberContainer">
              <img
                onClick={() =>
                  openNewTab("https://github.com/antigravityrunner")
                }
                className="projectMember mx-4"
                src="https://avatars.githubusercontent.com/u/26986107?v=4"
              ></img>
                <h3 className="memberName">Nina Sandler</h3>
            </div>
            <div className="memberContainer">
              <img
                onClick={() => openNewTab("https://github.com/benbryant98")}
                className="projectMember mx-4"
                src="https://avatars.githubusercontent.com/u/96531732?v=4"
              ></img>
              <h3 className='memberName'>Ben Bryant</h3>
            </div>
            <div className="memberContainer">
              <img
                onClick={() => openNewTab("https://github.com/Yerim17")}
                className="projectMember mx-4"
                src="https://avatars.githubusercontent.com/u/98900486?v=4"
              ></img>
              <h3 className="memberName">Massar Sow</h3>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
