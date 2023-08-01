import React from "react";

export default function SiteFooter() {
  const openNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <div className="container footer bg-slate">
      <footer className="text-center text-lg-start">
        <div className="container d-flex justify-content-center py-5">
          <img
            className="btn-footer mx-4"
            src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
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
        <h6 className="text-center text-light">
          Gamer's Hub 2023 | Developed by{" "}
        </h6>
      </footer>
    </div>
  );
}
