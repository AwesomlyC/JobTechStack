import React from "react";
import { useNavigate } from "react-router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();
  return (
    <navbar className="navbar">
      <SignedIn>
        <a href="/home" className="home-page">
          <strong>JobTechStack</strong>
        </a>
      </SignedIn>
      <SignedOut>
        <a href="/" className="home-page">
          <strong>JobTechStack</strong>
        </a>
      </SignedOut>
      <div>
        <SignedIn>
          <button
            className="navbar-button"
            onClick={() => {
              navigate("/home");
            }}
          >
            Home
          </button>
        </SignedIn>

        <SignedOut>
          <button
            className="navbar-button"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Sign Up
          </button>
          <button
            className="navbar-button"
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </button>
        </SignedOut>
      </div>
    </navbar>
  );
}

export default Header;
