import React, { useState } from "react";
import Hero_png from "../assets/hero.png";
import Logo_png from "../assets/logo.png";

import { MdOutlineMailOutline, MdHelpOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
  const [userName, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // RESET KEY MODAL STATES
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetUser, setResetUser] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ New state track added
  const [modalMessage, setModalMessage] = useState({ text: "", isError: false });
  const [modalLoading, setModalLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true); 

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        if (data.token) localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Cannot reach backend server. Ensure it is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE SUBMIT PASSWORD RESET (WITH MATCH CHECK)
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setModalMessage({ text: "", isError: false });

    if (newPassword !== confirmPassword) {
      setModalMessage({ 
        text: "❌ Passwords do not match! Please check your typing.", 
        isError: true 
      });
      return;
    }

    setModalLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: resetUser, securityAnswer, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage({ text: "🎉 Key updated successfully! Returning to login...", isError: false });
        setTimeout(() => {
          setShowResetModal(false);
          setResetUser("");
          setSecurityAnswer("");
          setNewPassword("");
          setConfirmPassword(""); // Clean state tracking
          setModalMessage({ text: "", isError: false });
        }, 2200);
      } else {
        setModalMessage({ text: data.message || "Verification failed.", isError: true });
      }
    } catch (err) {
      setModalMessage({ text: "Failed to connect to backend server.", isError: true });
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 p-4 md:p-8 select-none">
      
      {/* MAIN CONTAINER CARD */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-100 min-h-[600px]">
        
        {/* LEFT COLUMN: HERO VISUALS */}
        <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 md:block">
          <img
            src={Hero_png}
            alt="Hero Background"
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* RIGHT COLUMN: FORM CONTROLS */}
        <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:w-1/2">
          <div className="mx-auto w-full max-w-sm">
            
            <div className="flex flex-col items-center text-center">
              <img src={Logo_png} alt="System Logo" className="h-14 w-14 object-contain" />
              <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900">Smart Canteen</h1>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mt-1">Sales Management System</p>
            </div>

            <div className="mt-8 mb-6 text-center">
              <h2 className="text-lg font-bold text-slate-800">Welcome back! Sign in to continue</h2>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 transition-all">
                <div className="flex items-center gap-2"><span>⚠️</span><span>{error}</span></div>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Identity Handle</label>
                <div className="group flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100">
                  <MdOutlineMailOutline className="text-xl text-slate-400 group-focus-within:text-emerald-500" />
                  <input
                    type="text" required placeholder="Email or Username" value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    className="ml-3 w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Secret Key Phrase</label>
                <div className="group flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100">
                  <RiLockPasswordFill className="text-xl text-slate-400 group-focus-within:text-emerald-500" />
                  <input
                    type="password" required placeholder="Enter password key" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ml-3 w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 accent-emerald-600" />
                  <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800">Keep active</span>
                </label>
                <button 
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors cursor-pointer"
                >
                  Reset key?
                </button>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full mt-4 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-600 active:scale-[0.99] disabled:bg-slate-200"
              >
                {loading ? "Verifying Credentials..." : "Access Dashboard"}
              </button>
            </form>

          </div>
        </div>

      </div>

      {/* ============================================================================ */}
      {/* 🔮 INTERACTIVE PASSWORD RESET MODAL OVERLAY */}
      {/* ============================================================================ */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 relative">
            
            <div className="flex flex-col items-center text-center mb-5">
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-2xl font-bold mb-2">⚙️</div>
              <h3 className="text-lg font-bold text-slate-900">Reset Account Key</h3>
              <p className="text-xs text-gray-400 mt-0.5">Verify your security configuration parameters</p>
            </div>

            {modalMessage.text && (
              <div className={`mb-4 p-3 rounded-xl text-xs font-semibold border ${
                modalMessage.isError ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
              }`}>
                {modalMessage.text}
              </div>
            )}

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Account ID</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5">
                  <MdOutlineMailOutline className="text-lg text-slate-400" />
                  <input 
                    type="text" required placeholder="Username or Email" value={resetUser}
                    onChange={(e) => setResetUser(e.target.value)}
                    className="ml-2 w-full bg-transparent text-sm outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Security Verification Question</label>
                <span className="block text-[11px] text-gray-400 mb-1">What is your fallback keyword default value? (e.g., admin)</span>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5">
                  <MdHelpOutline className="text-lg text-slate-400" />
                  <input 
                    type="text" required placeholder="Your secret keyword" value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="ml-2 w-full bg-transparent text-sm outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* FIRST INPUT FIELD: NEW PASSWORD */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Brand New Password Key</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                  <RiLockPasswordFill className="text-lg text-slate-400" />
                  <input 
                    type="password" required placeholder="Enter new secret code" value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="ml-2 w-full bg-transparent text-sm outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* SECOND INPUT FIELD: CONFIRM NEW PASSWORD */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Confirm New Password Key</label>
                <div className={`flex items-center rounded-xl border px-3 py-2.5 bg-slate-50/50 focus-within:bg-white focus-within:ring-2 transition-all ${
                  newPassword && confirmPassword && newPassword !== confirmPassword 
                    ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100" 
                    : "border-slate-200 focus-within:border-emerald-500 focus-within:ring-emerald-100"
                }`}>
                  <RiLockPasswordFill className={`text-lg ${newPassword && confirmPassword && newPassword !== confirmPassword ? "text-red-400" : "text-slate-400"}`} />
                  <input 
                    type="password" required placeholder="Repeat new secret code" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="ml-2 w-full bg-transparent text-sm outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowResetModal(false);
                    setNewPassword("");
                    setConfirmPassword("");
                    setModalMessage({ text: "", isError: false });
                  }}
                  className="w-1/2 py-2.5 border border-slate-200 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={modalLoading}
                  className="w-1/2 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all cursor-pointer shadow-md shadow-emerald-600/10 disabled:bg-slate-200"
                >
                  {modalLoading ? "Saving Key..." : "Update Credentials"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default LoginForm;