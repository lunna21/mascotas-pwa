import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "./Button";
import logo from "../assets/logo.png";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = ({ className }: { className?: string }) => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Personas", path: "/personas" },
    { name: "Mascotas", path: "/mascotas" },
    { name: "Censo Nuevo", path: "/censo/nuevo" },
    { name: "Mapa", path: "/mapa" },
  ];

  return (
    <nav
      className={`bg-white/80 backdrop-blur-xl shadow-sm w-full fixed top-0 left-0 border-b border-white/50 z-50 ${className || ""}`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl transform hover:rotate-12 transition-transform">
            <img src={logo} alt="Logo" className="w-14 object-contain" />
          </div>
          <span className="font-extrabold text-slate-800 text-xl tracking-tight hidden lg:block">
            Censo Mascotas
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-brand-secondary border-b-2 border-brand-secondary pb-1"
                    : "text-slate-600 hover:text-brand-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-600">
              Hola, <strong className="text-slate-800">{usuario}</strong>
            </span>
          </div>
          <Button
            variant="primary"
            className="hidden md:block py-2.5 px-6"
            onClick={handleLogout}
          >
            Salir
          </Button>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden text-slate-600 text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full left-0 top-full flex flex-col items-center py-4 gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-base font-semibold w-full text-center py-2 transition-colors ${
                  isActive
                    ? "text-brand-secondary bg-brand-light/30"
                    : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button
            variant="primary"
            className="w-3/4 py-2.5 mt-2"
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
          >
            Salir
          </Button>
        </div>
      )}
    </nav>
  );
};
