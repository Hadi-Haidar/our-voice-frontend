import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../hooks/useLanguage";
import authIllustration from "../assets/auth-illustration.png";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t, isRTL } = useLanguage();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1 = email, 2 = password
    const [password, setPassword] = useState("");

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setStep(2);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login({ email, password });
            navigate("/");
        } catch (err) {
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex ${isRTL ? "flex-row-reverse text-right" : "flex-row"}`}>
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white dark:bg-gray-950">
                <div className="w-full max-w-md">
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white mb-8 transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>


                    {/* Header */}
                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {t("auth.login.title")}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t("auth.login.subtitle")}
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>{t("auth.login.signInWithGoogle")}</span>
                    </button>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">{t("auth.login.or")}</span>
                        </div>
                    </div>

                    {/* Email/Password Form */}
                    {step === 1 ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("auth.login.emailPlaceholder")}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                <div className={`${isRTL ? "text-left" : "text-right"} mt-2`}>
                                    <Link to="/reset-password" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all">
                                        {t("auth.login.forgotPassword")}
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3.5 px-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 transition-all"
                            >
                                {t("auth.login.continueButton")}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50">
                                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                                </div>
                            )}

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-600 dark:text-gray-400">
                                        {email}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        {t("auth.login.changeEmail")}
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t("auth.login.passwordPlaceholder")}
                                    required
                                    autoFocus
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                <div className={`${isRTL ? "text-left" : "text-right"} mt-2`}>
                                    <Link to="/reset-password" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all">
                                        {t("auth.login.forgotPassword")}
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3.5 px-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 transition-all disabled:opacity-50"
                            >
                                {loading ? t("auth.login.signingIn") : t("auth.login.continueButton")}
                            </button>
                        </form>
                    )}

                    {/* Footer */}
                    <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
                        {t("auth.login.termsPrefix")}{" "}
                        <Link to="/terms" className="text-gray-900 dark:text-white hover:underline">
                            {t("auth.login.terms")}
                        </Link>{" "}
                        {t("auth.login.and")}{" "}
                        <Link to="/privacy" className="text-gray-900 dark:text-white hover:underline">
                            {t("auth.login.privacy")}
                        </Link>
                        .
                    </p>

                    <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
                        {t("auth.login.noAccount")}{" "}
                        <Link to="/signup" className="text-gray-900 dark:text-white font-semibold hover:underline">
                            {t("auth.login.signupLink")}
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Illustration (Full Bleed) */}
            <div className="hidden lg:block flex-1 relative">
                <img
                    src={authIllustration}
                    alt="Our Voice Lebanon - Citizens United"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback gradient if image doesn't load
                        e.target.parentElement.classList.add('bg-gradient-to-br', 'from-red-600', 'via-white', 'to-green-600');
                        e.target.style.display = 'none';
                    }}
                />
            </div>
        </div>
    );
}
