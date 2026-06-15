import React, { useState, useEffect, useRef } from "react";
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  RefreshCw, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const REQUIRED_PASSWORD = "*QzzY860";
const TARGET_URL = "https://www.melius.com/";

export default function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Check authentication on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("melius_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    // Auto focus the input field on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Add a slight realistic delay to feel secure and premium
    setTimeout(() => {
      if (password === REQUIRED_PASSWORD) {
        setIsAuthenticated(true);
        if (rememberMe) {
          localStorage.setItem("melius_auth", "true");
        } else {
          sessionStorage.setItem("melius_auth", "true");
        }
        setPassword("");
      } else {
        setError("Senha incorreta. Verifique os dados e tente novamente.");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
      setIsSubmitting(false);
    }, 600);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("melius_auth");
    sessionStorage.removeItem("melius_auth");
    // Clear input
    setPassword("");
    setError(null);
  };

  return (
    <div id="designer-pro-root" className="min-h-screen w-full bg-[#fafafa] text-[#171717] font-sans antialiased flex flex-col transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login-screen"
            id="login-screen-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col justify-center items-center p-6 relative overflow-hidden bg-radial from-neutral-50 to-neutral-200"
          >
            {/* Subtle background blur or circles */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-300/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md" id="login-container-card">
              {/* Logo & Header */}
              <div className="text-center mb-8" id="login-header">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white shadow-xl shadow-black/10 mb-5"
                >
                  <Lock className="w-6 h-6 animate-pulse" id="lock-icon-indicator" />
                </motion.div>
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 font-sans" id="login-title">
                  Designer Pro
                </h1>
                <p className="text-sm text-neutral-500 mt-2 font-medium" id="login-subtitle">
                  Insira a credencial de segurança para desbloquear o sistema
                </p>
              </div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-neutral-200/50 border border-neutral-200/60"
                id="form-card"
              >
                <form onSubmit={handleLogin} className="space-y-6" id="password-gate-form">
                  <div>
                    <label 
                      htmlFor="password-input" 
                      className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2"
                    >
                      Senha de Acesso
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        ref={inputRef}
                        id="password-input"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3.5 bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-neutral-900 placeholder-neutral-400 border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 rounded-xl outline-hidden transition-all duration-200 text-sm font-semibold tracking-widest"
                      />
                      <button
                        type="button"
                        id="toggle-password-visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-600 focus:outline-hidden transition-colors"
                        title={showPassword ? "Ocultar senha" : "Exibir senha"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Keep me logged in */}
                  <div className="flex items-center justify-between text-xs" id="remember-me-container">
                    <label className="flex items-center space-x-2 text-neutral-600 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="remember-me-checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded-sm border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                      />
                      <span className="font-medium group-hover:text-neutral-900 transition-colors">Lembrar neste navegador</span>
                    </label>
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start space-x-2 text-red-700 text-xs font-medium"
                        id="login-error-message"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500 mt-0.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-password-button"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-neutral-950 text-white font-medium hover:bg-neutral-900 active:scale-[0.98] transition-all duration-150 shadow-md shadow-neutral-950/15 disabled:bg-neutral-400 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="text-sm">Desbloquear</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Security Badge Info */}
              <div className="text-center mt-6 text-[11px] text-neutral-400 flex items-center justify-center space-x-1.5" id="security-footer-info">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Navegação protegida por criptografia de sessão</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="secure-portal"
            id="secure-portal-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-screen w-full overflow-hidden"
          >
            {/* Minimalist Top Bar containing ONLY the Lock button and "Designer Pro" */}
            <header className="h-14 bg-white border-b border-neutral-200/80 px-6 flex items-center justify-between flex-shrink-0 z-50 shadow-xs" id="app-header">
              <div className="flex items-center space-x-3" id="header-brand-container">
                {/* Clicking on the unlocked padlock locks the application immediately */}
                <button
                  onClick={handleLogout}
                  id="lock-padlock-button"
                  title="Bloquear Painel (Fechar Cadeado)"
                  className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-neutral-800 hover:scale-[1.05] active:scale-[0.95]"
                >
                  <Unlock className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                  <span className="font-bold tracking-tight text-neutral-900 text-sm">Designer Pro</span>
                  <span className="text-[10px] text-neutral-400 font-medium">Sessão Ativa</span>
                </div>
              </div>

            </header>

            {/* Action Card Viewport */}
            <div className="flex-1 relative bg-neutral-900/5 flex flex-col items-center justify-center p-6" id="viewport-container">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-neutral-200 shadow-xl rounded-3xl p-8 max-w-lg w-full text-center"
              >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Acesso Liberado</h2>
                <p className="text-neutral-500 mb-8 leading-relaxed text-sm">
                  O sistema Melius possui restrições de segurança que impedem a exibição dentro de outras páginas (proteção de iFrame). Para acessar com total segurança, clique no botão abaixo e abra o sistema em uma nova aba.
                </p>
                <a
                  href={TARGET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full px-6 py-4 rounded-xl bg-neutral-950 text-white font-semibold hover:bg-neutral-900 active:scale-[0.98] transition-all duration-150 shadow-md group"
                >
                  <span>Acessar Sistema Melius</span>
                  <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

