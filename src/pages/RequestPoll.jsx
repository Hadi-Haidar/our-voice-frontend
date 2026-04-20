import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pollsService } from "../services/pollsService";
import {
  PlusIcon,
  TrashIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  TokensIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from "@radix-ui/react-icons";

import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DAILY_RATE = 0.5;

export default function RequestPoll() {
  const { t, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(7);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const totalCost = duration * DAILY_RATE;
  const isRTL = lang === "ar";

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleAddOption = () => {
    if (options.length < 5) setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!question.trim()) {
      setError(isRTL ? "يرجى إدخال سؤال" : "Please enter a question");
      return;
    }
    if (options.some(opt => !opt.trim())) {
      setError(isRTL ? "يرجى ملء جميع الخيارات" : "Please fill all options");
      return;
    }
    if (user.balance < totalCost) {
      setError(t("polls.insufficientBalance"));
      return;
    }

    setLoading(true);
    const response = await pollsService.requestPaidPoll({ question, options, duration, cost: totalCost });

    if (response.success) {
      setSuccess(true);
      setTimeout(() => navigate("/polls"), 3000);
    } else {
      setError(response.message || (isRTL ? "فشل في إرسال الطلب" : "Failed to submit request"));
    }
    setLoading(false);
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/30"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 text-white">
            <CheckCircledIcon className="w-9 h-9" />
          </div>
          <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-2">
            {t("polls.requestSuccess")}
          </h2>
          <p className="text-sm text-emerald-700 dark:text-emerald-500/80">
            {t("common.redirecting") || (isRTL ? "جاري التحويل..." : "Redirecting to polls...")}
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">

      {/* Back button */}
      <button
        onClick={() => navigate("/polls")}
        className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors mb-5 group font-medium text-sm"
      >
        {isRTL ? (
          <>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>العودة</span>
          </>
        ) : (
          <>
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </>
        )}
      </button>

      {/* Page title */}
      <PageHeader
        title={t("polls.requestTitle")}
        subtitle={t("polls.requestSubtitle")}
      />

      {/* ── Balance & Cost Strip ── */}
      <div className="mt-5 flex items-stretch gap-3">
        {/* Balance */}
        <div className="flex-1 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
            <TokensIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wider">
              {t("polls.balance")}
            </p>
            <p className="text-base font-bold text-emerald-700 dark:text-emerald-300 leading-tight">
              ${user?.balance || 0}
            </p>
          </div>
        </div>

        {/* Total Cost */}
        <div className="flex-1 flex items-center gap-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {t("polls.totalCost")}
            </p>
            <p className="text-base font-bold text-gray-800 dark:text-white leading-tight">
              -${totalCost.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Form ── */}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white dark:bg-gray-800 p-5 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700">

        {/* Question */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
            {isRTL ? "السؤال" : "Question"}
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all text-sm text-gray-900 dark:text-white placeholder:text-gray-400 resize-none"
            placeholder={t("polls.questionPlaceholder")}
          />
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
              {t("polls.duration")}
            </label>
            <span className="bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              ${DAILY_RATE} / {t("polls.days")}
            </span>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900/50 px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-700">
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="flex-1 accent-emerald-600 cursor-pointer"
            />
            <div className="text-center w-12 shrink-0">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-none">
                {duration}
              </span>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                {t("polls.days")}
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
              {t("polls.options")}
            </label>
            <span className="text-xs font-bold text-gray-400">{options.length} / 5</span>
          </div>

          <div className="space-y-2.5">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  placeholder={`${t("polls.optionPlaceholder")} ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all shrink-0"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {options.length < 5 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-all flex items-center justify-center gap-2 font-bold text-sm"
            >
              <PlusIcon className="w-4 h-4" />
              {t("polls.addOption")}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400 text-sm font-medium"
          >
            <ExclamationTriangleIcon className="w-4 h-4 shrink-0 mt-0.5" />
            {error}
          </motion.div>
        )}

        {/* Submit */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full sm:w-auto sm:min-w-[200px] px-8 py-3 rounded-xl text-sm font-semibold transition-all
              ${loading
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white'}
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {isRTL ? "جاري الإرسال..." : "Sending..."}
              </span>
            ) : (
              t("polls.submitRequest")
            )}
          </button>
          <p className="text-xs text-gray-400">
            {isRTL
              ? <>سيتم خصم <span className="font-semibold text-gray-600 dark:text-gray-300">${totalCost.toFixed(2)}</span> من رصيدك</>
              : <>Your balance will decrease by <span className="font-semibold text-gray-600 dark:text-gray-300">${totalCost.toFixed(2)}</span></>}
          </p>
        </div>


      </form>
    </div>
  );
}
