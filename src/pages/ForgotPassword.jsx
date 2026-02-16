import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import authIllustration from "../assets/auth-illustration.png";

export default function ForgotPassword() {
    const { t, isRTL } = useLanguage();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSuccess(true);
    };

    return (
        <div className={`min-h-screen flex ${isRTL ? "flex-row-reverse text-right" : "flex-row"}`}>
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white dark:bg-gray-950">
                <div className="w-full max-w-md">
                    {/* Back Button */}
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white mb-8 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>

                    {!success ? (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {t("auth.forgotPassword.title")}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t("auth.forgotPassword.subtitle")}
                                </p>
                            </div>

                            {/* Forgot Password Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t("auth.forgotPassword.emailPlaceholder")}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3.5 px-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 transition-all disabled:opacity-50"
                                >
                                    {loading ? t("auth.forgotPassword.loading") : t("auth.forgotPassword.button")}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {t("auth.forgotPassword.successTitle")}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                {t("auth.forgotPassword.successSubtitle").replace("{email}", email)}
                            </p>
                            <Link
                                to="/login"
                                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                            >
                                {t("auth.forgotPassword.backToLogin")}
                            </Link>
                        </div>
                    )}

                    {/* Footer */}
                    {!success && (
                        <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
                            <Link to="/login" className="text-gray-900 dark:text-white font-semibold hover:underline">
                                {t("auth.forgotPassword.backToLogin")}
                            </Link>
                        </p>
                    )}
                </div>
            </div>

            {/* Right Side - Illustration (Full Bleed) */}
            <div className="hidden lg:block flex-1 relative">
                <img
                    src={authIllustration}
                    alt="Our Voice Lebanon"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                        e.target.parentElement.classList.add('bg-gradient-to-br', 'from-red-600', 'via-white', 'to-green-600');
                        e.target.style.display = 'none';
                    }}
                />
            </div>
        </div>
    );
}
