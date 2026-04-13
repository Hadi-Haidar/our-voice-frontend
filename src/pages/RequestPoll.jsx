import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pollsService } from "../services/pollsService";
import { 
  PlusIcon, 
  TrashIcon, 
  CheckCircledIcon, 
  ExclamationTriangleIcon,
  TokensIcon
} from "@radix-ui/react-icons";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const POLL_COST = 50;

export default function RequestPoll() {
  const { t, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }
    if (options.some(opt => !opt.trim())) {
      setError("Please fill all options");
      return;
    }
    if (user.balance < POLL_COST) {
      setError(t("polls.insufficientBalance"));
      return;
    }

    setLoading(true);
    const response = await pollsService.requestPaidPoll({
      question,
      options,
      cost: POLL_COST
    });

    if (response.success) {
      setSuccess(true);
      setTimeout(() => navigate("/polls"), 3000);
    } else {
      setError(response.message || "Failed to submit request");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50 dark:bg-green-900/20 p-8 rounded-3xl border border-green-100 dark:border-green-900/30"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
            <CheckCircledIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-2">
            {t("polls.requestSuccess")}
          </h2>
          <p className="text-green-700 dark:text-green-500/80">
            {t("common.redirecting") || "Redirecting to polls..."}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader 
        title={t("polls.requestTitle")} 
        subtitle={t("polls.requestSubtitle")} 
      />

      {/* Balance Card */}
      <div className="mt-8 bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <TokensIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">{t("polls.balance")}</p>
            <p className="text-2xl font-bold">${user?.balance || 0}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-blue-100 text-sm font-medium">{t("polls.pollCost")}</p>
          <p className="text-xl font-bold text-amber-300">-${POLL_COST}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
        {/* Question */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">
            {t("polls.questionPlaceholder")}
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-900 dark:text-white"
            placeholder={t("polls.questionPlaceholder")}
          />
        </div>

        {/* Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {t("polls.options")}
            </label>
            <span className="text-xs text-gray-400">
              {options.length}/5
            </span>
          </div>
          
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  placeholder={`${t("polls.optionPlaceholder")} ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-900 dark:text-white"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {options.length < 5 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              {t("polls.addOption")}
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-medium"
          >
            <ExclamationTriangleIcon className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-fit mx-auto px-10 py-3.5 rounded-full font-bold shadow-xl transition-all flex items-center justify-center
            ${loading 
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:scale-95'}
          `}
        >
          {loading ? t("common.sending") || "Sending..." : t("polls.submitRequest")}
        </button>
      </form>
    </div>
  );
}
