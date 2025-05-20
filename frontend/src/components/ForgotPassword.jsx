import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ChevronLeft, Loader2 } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-100 to-slate-200 py-3 px-3 text-center rounded-b-2xl shadow relative">
          <Link
            to="/login"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-800 tracking-wide">
            Reset Your Password
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            {isSubmitted
              ? "Check your email for instructions"
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Email Sent!
              </h3>
              <p className="text-sm text-gray-500">
                We've sent instructions to {email}. Check your inbox and follow
                the link to reset your password.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 pt-4 border-t">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
