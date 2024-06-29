import React from "react";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
      <div class="navbar-brand">
        <img width="80px" src="./images/logo.png" />
      </div>

      <h2 className="m-0">
        <i className="text-primary me-2"></i>New Kirupa Driving School
      </h2>

      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarCollapse"
      >
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <a href="/" className="nav-item nav-link active me-4">
            <h5>Home</h5>
          </a>
          <a href="/about" className="nav-item nav-link me-4">
            <h5>About</h5>
          </a>

          <a href="/contact" className="nav-item nav-link me-4">
            <h5>Contact</h5>
          </a>
          <a href="/registrationform" className="nav-item nav-link me-4">
            <h5> Register</h5>
          </a>
          <a href="/login" className="nav-item nav-link me-4">
            <h5>Login</h5>
          </a>
        </div>
      </div>
    </nav>
  );
}
