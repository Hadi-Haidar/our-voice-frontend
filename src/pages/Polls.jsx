import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pollsService } from "../services/pollsService";
import {
  BarChartIcon,
  ViewGridIcon,
  CheckCircledIcon,
  ClockIcon,
  PersonIcon,
  InfoCircledIcon,
  StarFilledIcon,
  PlusIcon,
  LayersIcon,
  RocketIcon
} from "@radix-ui/react-icons";

import { useLanguage } from "../hooks/useLanguage";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";


const DollarIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default function Polls() {
  const { t, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votingFor, setVotingFor] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    setLoading(true);
    const response = await pollsService.getFeed();
    if (response.success) {
      setFeed(response.data);
    }
    setLoading(false);
  };

  const handleVote = async (pollId, optionId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setVotingFor(pollId);
    const response = await pollsService.vote(pollId, optionId);

    if (response.success) {
      setFeed(prev => prev.map(item => {
        if (item.id === pollId) {
          const updatedOptions = item.options.map(opt => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });
          return {
            ...item,
            is_voted: true,
            voted_option_id: optionId,
            total_participants: item.total_participants + 1,
            options: updatedOptions
          };
        }
        return item;
      }));
    }
    setVotingFor(null);
  };

  const filteredFeed = feed
    .filter(poll => {
      if (activeFilter === "sponsored") return poll.is_sponsored;
      if (activeFilter === "voted") return poll.is_voted;
      if (activeFilter === "active") return new Date(poll.expires_at) > new Date();
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.total_participants - a.total_participants;
      return new Date(b.created_at || b.expires_at) - new Date(a.created_at || a.expires_at);
    });

  const filterOptions = [
    { id: "all", label: t("polls.all"), icon: ViewGridIcon },
    { id: "sponsored", label: t("polls.sponsoredTab"), icon: DollarIcon },
    { id: "active", label: t("polls.active"), icon: ClockIcon },
    { id: "voted", label: t("polls.votedTab"), icon: CheckCircledIcon },
  ];

  const sortOptions = [
    { value: "newest", label: t("polls.newest"), icon: "TimerIcon" },
    { value: "popular", label: t("polls.popular"), icon: "PersonIcon" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">

      {/* ── Header Row ── */}
      <div className="mb-6 md:mb-8">
        <PageHeader
          title={t("polls.title")}
          subtitle={t("polls.subtitle")}
        />

        {/* Request Paid Poll CTA */}
        {isAuthenticated && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate("/request-poll")}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              <PlusIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{t("polls.requestPaid")}</span>
              <span className="sm:hidden">{lang === "ar" ? "ممول" : "Paid"}</span>
            </button>
          </div>
        )}
      </div>


      {/* ── Filter & Sort Bar ── */}
      <div className="flex flex-col gap-3 mb-6 md:mb-8">
        {/* Filter chips — scrollable row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5
                  ${isActive
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700'}
                `}
              >
                <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-inherit' : 'text-gray-400'}`} />
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Sort row — aligned to end */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">
            {t("polls.sortBy")}
          </span>
          <CustomSelect
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-36"
            isRTL={lang === "ar"}
          />
        </div>
      </div>

      {/* ── Poll List ── */}
      <div className="space-y-4 md:space-y-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6" />
              <div className="space-y-3">
                <div className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-xl" />
                <div className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-xl" />
              </div>
            </div>
          ))
        ) : filteredFeed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800"
          >
            <div className="bg-gray-50 dark:bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <InfoCircledIcon className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm px-6">
              {t("polls.noPolls")}
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-4 text-red-600 font-bold text-sm hover:underline"
            >
              {t("polls.all")}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredFeed.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <PollCard
                    poll={item}
                    onVote={handleVote}
                    isVoting={votingFor === item.id}
                    t={t}
                    locale={lang}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function PollCard({ poll, onVote, isVoting, t, locale: lang }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const question = lang === "ar" ? poll.question_ar : poll.question_en;

  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

  return (
    <div className={`
      relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-5 md:p-8 border transition-all
      ${poll.is_sponsored
        ? 'border-emerald-200 dark:border-emerald-900/50'
        : 'border-gray-100 dark:border-gray-700'}
    `}>

      {/* Sponsored Badge — inline, above the question */}
      {poll.is_sponsored && (
        <div className="inline-flex items-center gap-1 mb-3 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold">
          <DollarIcon className="w-2.5 h-2.5 shrink-0" />
          <span className="md:hidden">{lang === "ar" ? "ممول" : "Paid"}</span>
          <span className="hidden md:inline uppercase tracking-wider">{t("polls.sponsoredPoll")}</span>
        </div>
      )}

      {/* Question */}
      <h3 className="font-bold text-gray-900 dark:text-white leading-snug mb-5 text-base md:text-xl">
        {question}
      </h3>


      {/* Options */}
      <div className="space-y-2.5 md:space-y-3">
        {poll.options.map((option) => {
          const optionText = lang === "ar" ? option.text_ar : option.text_en;
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const isVotedOption = poll.voted_option_id === option.id;

          return (
            <div key={option.id} className="relative">
              {poll.is_voted ? (
                /* Result bar */
                <div className="relative h-12 md:h-14 w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute inset-y-0 ltr:left-0 rtl:right-0 ${isVotedOption ? 'bg-red-500/10 dark:bg-red-500/20' : 'bg-gray-200/50 dark:bg-gray-700/50'}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-sm font-medium truncate ${isVotedOption ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {optionText}
                      </span>
                      {isVotedOption && <CheckCircledIcon className="w-4 h-4 text-red-500 shrink-0" />}
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white ml-2 shrink-0">
                      {percentage}%
                    </span>
                  </div>
                </div>
              ) : (
                /* Vote button */
                <button
                  onClick={() => setSelectedOption(option.id)}
                  className={`
                    w-full h-12 md:h-14 px-4 rounded-xl border-2 text-left rtl:text-right transition-all flex items-center justify-between
                    ${selectedOption === option.id
                      ? 'border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
                      : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'}
                  `}
                >
                  <span className="text-sm font-medium">{optionText}</span>
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0
                    ${selectedOption === option.id ? 'border-red-500 bg-red-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    {selectedOption === option.id && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />}
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Vote CTA */}
      {!poll.is_voted && (
        <button
          onClick={() => selectedOption && onVote(poll.id, selectedOption)}
          disabled={!selectedOption || isVoting}
          className={`
            mt-5 w-full md:w-auto md:px-8 py-3 rounded-xl md:rounded-full text-sm font-bold transition-all
            ${selectedOption && !isVoting
              ? 'bg-red-600 hover:bg-red-700 active:scale-95 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}
          `}
        >
          {isVoting ? t("polls.voting") : t("polls.vote")}
        </button>
      )}

      {/* Meta footer */}
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1">
          <PersonIcon className="w-3.5 h-3.5" />
          {poll.total_participants} {t("polls.participants")}
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon className="w-3.5 h-3.5" />
          {t("polls.expires")}: {new Date(poll.expires_at).toLocaleDateString(lang)}
        </span>
      </div>

    </div>
  );
}
