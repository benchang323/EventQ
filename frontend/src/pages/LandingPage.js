// src/pages/LandingPage.js

import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const showSignIn = () => setIsSignUp(false);

  return (
    <div className="page-container">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <AuthForm isSignUp={isSignUp} onSignUpSuccess={showSignIn} />
        <button
          className="mt-4 text-blue-600 hover:text-blue-700"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
