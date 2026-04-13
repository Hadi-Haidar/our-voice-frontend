import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pollsService } from "../services/pollsService";
import { 
  BarChartIcon, 
  CheckCircledIcon, 
  ClockIcon, 
  PersonIcon, 
  InfoCircledIcon,
  StarFilledIcon,
  PlusIcon
} from "@radix-ui/react-icons";
import { useLanguage } from "../hooks/useLanguage";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Polls() {
  const { t, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votingFor, setVotingFor] = useState(null); // ID of poll currently being voted on

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
      // Optimistically update local state to show results
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <PageHeader 
          title={t("polls.title")} 
          subtitle={t("polls.subtitle")} 
        />
        
        {isAuthenticated && (
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-2 ltr:pl-4 rtl:pr-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="ltr:text-right rtl:text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">
                {t("polls.balance")}
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                ${user?.balance || 0}
              </p>
            </div>
            <button 
              onClick={() => navigate("/request-poll")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              {t("polls.requestPaid")}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-6">
        {loading ? (
          // Loading Skeletons
          [1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded-xl"></div>
                <div className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded-xl"></div>
              </div>
            </div>
          ))
        ) : feed.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <InfoCircledIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">{t("polls.noPolls")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {feed.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
      relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border 
      ${poll.is_sponsored ? 'border-amber-200 dark:border-amber-900/50 ring-1 ring-amber-50 dark:ring-amber-900/10' : 'border-gray-100 dark:border-gray-700'}
    `}>
      {poll.is_sponsored && (
        <div className="absolute top-4 ltr:right-6 rtl:left-6 flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <StarFilledIcon className="w-3 h-3" />
          {t("polls.sponsoredPoll")}
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pr-20 rtl:pr-0 rtl:pl-20 leading-tight">
        {question}
      </h3>

      <div className="space-y-3">
        {poll.options.map((option) => {
          const optionText = lang === "ar" ? option.text_ar : option.text_en;
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const isVotedOption = poll.voted_option_id === option.id;

          return (
            <div key={option.id} className="relative group">
              {poll.is_voted ? (
                // Result View
                <div className="relative h-14 w-full bg-gray-50 dark:bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute inset-y-0 ltr:left-0 rtl:right-0 ${isVotedOption ? 'bg-blue-500/10 dark:bg-blue-500/20' : 'bg-gray-200/50 dark:bg-gray-700/50'}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-5">
                    <div className="flex items-center gap-3">
                      <span className={`font-medium ${isVotedOption ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {optionText}
                      </span>
                      {isVotedOption && <CheckCircledIcon className="w-5 h-5 text-blue-500" />}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {percentage}%
                    </span>
                  </div>
                </div>
              ) : (
                // Voting View
                <button
                  onClick={() => setSelectedOption(option.id)}
                  className={`
                    w-full h-14 px-5 rounded-2xl border-2 text-left rtl:text-right transition-all flex items-center justify-between
                    ${selectedOption === option.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' 
                      : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'}
                  `}
                >
                  <span className="font-medium">{optionText}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                    ${selectedOption === option.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    {selectedOption === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!poll.is_voted && (
        <button
          onClick={() => selectedOption && onVote(poll.id, selectedOption)}
          disabled={!selectedOption || isVoting}
          className={`
            mt-6 px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-blue-500/10 w-fit
            ${selectedOption && !isVoting
              ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}
          `}
        >
          {isVoting ? t("polls.voting") : t("polls.vote")}
        </button>
      )}

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <PersonIcon className="w-4 h-4" />
            <span>{poll.total_participants} {t("polls.participants")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4" />
            <span>{t("polls.expires")}: {new Date(poll.expires_at).toLocaleDateString(lang)}</span>
          </div>
        </div>
        {poll.is_voted && (
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
            <BarChartIcon className="w-4 h-4" />
            {t("polls.results")}
          </div>
        )}
      </div>
    </div>
  );
}

