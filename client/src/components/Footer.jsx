import React from "react";
export default function SiteFooter() {
  const openNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <div className="container footer bg-slate">
      <footer
        className="text-center text-lg-start"
      >
        <div className="container d-flex justify-content-center py-5">
          <button
            onClick={() => openNewTab("https://facebook.com")}
            type="button"
            className="btn btn-danger btn-lg btn-floating mx-2"
          >
            <i className="fab fa-facebook-f"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
          >
            <i className="fab fa-youtube"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
          >
            <i className="fab fa-instagram"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
          >
            <i className="fab fa-twitter"></i>
          </button>
        </div>
      </footer>
    </div>
  );
}
