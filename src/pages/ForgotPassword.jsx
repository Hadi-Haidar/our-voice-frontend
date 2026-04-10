import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../hooks/useLanguage";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import authIllustration from "../assets/auth-illustration.png";

export default function ForgotPassword() {
    const { t, isRTL } = useLanguage();
    const { forgotPassword, resetPassword } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // step 1 = hot email, step 2 = hot l OTP wl password l jdid
    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // fn la nabe3et request njib OTP 3a email l user
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await forgotPassword(email);
            setStep(2); // mnrooh 3al step 2 la ndakhel l OTP
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Something went wrong";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // fn la nsaker l password l jdid ma3 l OTP
    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit code");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await resetPassword({ email, otp_code: otp, new_password: newPassword });
            // bs yzaabet kel shi byerja3 3al login page
            navigate("/login");
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Failed to reset password";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex ${isRTL ? "flex-row-reverse text-right" : "flex-row"}`}>
            {/* ch2fe 3al shemel - l Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white dark:bg-gray-950">
                <div className="w-full max-w-md">
                    {/* fa2se l rjou3 */}
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white mb-8 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>

                    {/* l 3enwen */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {step === 1 ? t("auth.forgotPassword.title") : t("auth.forgotPassword.resetTitle")}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {step === 1
                                ? t("auth.forgotPassword.subtitle")
                                : t("auth.forgotPassword.resetSubtitle").replace("{email}", email)}
                        </p>
                    </div>

                    {step === 1 ? (
                        /* Form lal Step 1: Email */
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50">
                                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                                </div>
                            )}

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
                    ) : (
                        /* Form lal Step 2: OTP w New Password */
                        <form onSubmit={handleResetSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50">
                                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                                </div>
                            )}

                            <div>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder={t("auth.forgotPassword.otpPlaceholder")}
                                    required
                                    maxLength={6}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all tracking-widest text-center text-lg mb-4"
                                />

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder={t("auth.forgotPassword.newPasswordPlaceholder")}
                                        required
                                        minLength={6}
                                        className={`w-full px-4 py-3 ${isRTL ? "pl-12 pr-4" : "pr-12 pl-4"} border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors z-10`}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOpenIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeClosedIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length < 6}
                                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3.5 px-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 transition-all disabled:opacity-50"
                            >
                                {loading ? t("auth.forgotPassword.resettingButton") : t("auth.forgotPassword.resetButton")}
                            </button>

                            <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
                                {t("auth.forgotPassword.didntReceive")} {" "}
                                <button type="button" onClick={() => setStep(1)} className="text-gray-900 dark:text-white font-semibold hover:underline">
                                    {t("auth.forgotPassword.changeEmail")}
                                </button>
                            </p>
                        </form>
                    )}

                    {/* Footer l tahtani */}
                    {step === 1 && (
                        <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
                            <Link to="/login" className="text-gray-900 dark:text-white font-semibold hover:underline">
                                {t("auth.forgotPassword.backToLogin")}
                            </Link>
                        </p>
                    )}
                </div>
            </div>

            {/* ch2fe 3al yamin - Sura */}
            <div className="hidden lg:block flex-1 relative">
                <img
                    src={authIllustration}
                    alt="Our Voice Lebanon"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                        // nsalla7 l sora ya3ni
                        e.target.parentElement.classList.add('bg-gradient-to-br', 'from-red-600', 'via-white', 'to-green-600');
                        e.target.style.display = 'none';
                    }}
                />
            </div>
        </div>
    );
}
