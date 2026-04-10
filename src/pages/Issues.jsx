import { useState, useEffect } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { issueService } from "../services/issueService";
import { CATEGORIES } from "../data/categories";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  DrawingPinIcon,
  ClockIcon,
  ArrowUpIcon,
  ChatBubbleIcon,
  CheckCircledIcon,
  PlayIcon,
  MixerHorizontalIcon,
  Cross1Icon,
  CheckIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { CategoryIcon } from "../components/CategoryIcon";
import { useAuth } from "../contexts/AuthContext";

const STATUS_OPTIONS = ["all", "pending", "in_progress", "solved"];

export default function Issues() {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upvotingIds, setUpvotingIds] = useState([]);
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const response = await issueService.getAllIssues();
        if (response.success) {
          setIssues(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const getCategoryLabel = (catId) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return catId;
    return isRTL ? cat.labelAr : cat.labelEn;
  };

  const toggleCategory = (catId) => {
    if (catId === "all") {
      setActiveCategories([]);
      return;
    }
    setActiveCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // ── derived list ────────────────────────────────────────────────────────────
  const filtered = issues.filter((issue) => {
    const matchCat = activeCategories.length === 0 || activeCategories.includes(issue.category_id);
    const matchStatus = activeStatus === "all" || issue.status === activeStatus;
    const matchSearch = search === "" ||
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      (issue.location_text && issue.location_text.toLowerCase().includes(search.toLowerCase())) ||
      issue.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  }).sort((a, b) => {
    if (sortBy === "votes") return b.upvotes - a.upvotes;
    if (sortBy === "comments") return b.comments - a.comments;
    return new Date(b.created_at) - new Date(a.created_at); // newest (default)
  });

  const activeFiltersCount =
    activeCategories.length +
    (activeStatus !== "all" ? 1 : 0) +
    (sortBy !== "newest" ? 1 : 0);

  // ── helpers ──────────────────────────────────────────────────────────────────
  const statusLabel = (s, ar) => {
    if (s === "all") return ar ? "الكل" : "All";
    if (s === "pending") return ar ? "قيد الانتظار" : "Pending";
    if (s === "in_progress") return ar ? "قيد المعالجة" : "In Progress";
    if (s === "solved") return ar ? "تم الحل" : "Solved";
  };

  const sortLabel = (s, ar) => {
    if (s === "newest") return ar ? "الأحدث" : "Newest";
    if (s === "votes") return ar ? "أعلى تصويت" : "Top Votes";
    if (s === "comments") return ar ? "أكثر تعليقاً" : "Most Comments";
  };

  const formatTime = (dateStr, ar) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return ar ? `منذ ${days} يوم` : `${days}d ago`;
    if (hours > 0) return ar ? `منذ ${hours} ساعة` : `${hours}h ago`;
    if (minutes > 0) return ar ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
    return ar ? "الآن" : "Just now";
  };

  const handleUpvote = async (id, e) => {
    e.stopPropagation(); // Don't navigate to details

    if (!user) {
      alert(isRTL ? "يرجى تسجيل الدخول للقيام بذلك" : "Please login to upvote");
      return;
    }

    if (upvotingIds.includes(id)) return;

    try {
      setUpvotingIds(prev => [...prev, id]);
      const response = await issueService.toggleUpvote(id);
      if (response.success) {
        setIssues(prevIssues => prevIssues.map(issue => {
          if (issue.id === id) {
            return {
              ...issue,
              has_upvoted: response.upvoted,
              upvotes: response.upvoted ? (issue.upvotes + 1) : (issue.upvotes - 1)
            };
          }
          return issue;
        }));
      }
    } catch (err) {
      console.error("Error toggling upvote:", err);
    } finally {
      setUpvotingIds(prev => prev.filter(uid => uid !== id));
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 w-full max-w-7xl mx-auto"
      >
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {isRTL ? "المشاكل العامة" : "Public Issues"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {loading
                ? (isRTL ? "جاري التحميل..." : "Loading...")
                : (isRTL
                  ? `${filtered.length} مشكلة — شارك واجعل صوتك مسموعاً`
                  : `${filtered.length} issues — participate and make your voice heard`)}
            </p>
          </div>
          <button
            onClick={() => navigate("/report-issue")}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-4 py-2 text-sm rounded-xl font-medium shadow hover:shadow-md transition-all flex items-center justify-center gap-2 group shrink-0 w-full sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
            {isRTL ? "أرسل مشكلة" : "Report Issue"}
          </button>
        </div>

        {/* ── Search + Filter button row ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 ${isRTL ? "right-3" : "left-3"
                }`}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full h-11 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm outline-none transition-all placeholder-gray-400 ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                }`}
              placeholder={isRTL ? "ابحث عن مشكلة أو منطقة..." : "Search issues or regions..."}
            />
          </div>

          {/* Advanced Filter Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`relative h-11 px-4 rounded-xl border transition-all flex items-center gap-2 text-sm font-medium ${activeFiltersCount > 0
              ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-500/20"
              : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:border-red-400 hover:text-red-600"
              }`}
          >
            <MixerHorizontalIcon className="h-4 w-4" />
            {isRTL ? "تصفية" : "Filter"}
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-600 border border-red-200 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Category Chips (horizontal scroll) ───────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {(() => {
            const topCats = CATEGORIES.slice(0, 6);
            const displayedCats = [...topCats];
            activeCategories.forEach((cid) => {
              if (!displayedCats.find((c) => c.id === cid)) {
                const found = CATEGORIES.find((c) => c.id === cid);
                if (found) displayedCats.push(found);
              }
            });

            return displayedCats.map((cat) => {
              const isActive =
                cat.id === "all"
                  ? activeCategories.length === 0
                  : activeCategories.includes(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 shrink-0 ${isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-500/25"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-red-400 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400"
                    }`}
                >
                  <CategoryIcon name={cat.iconStr} className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-red-600"}`} />
                  <span>{isRTL ? cat.labelAr : cat.labelEn}</span>
                  {cat.id !== "all" && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) toggleCategory(cat.id);
                      }}
                      className={`ml-1 rounded-full p-0.5 transition-opacity duration-200 ${isActive
                        ? "opacity-100 pointer-events-auto hover:bg-white/20"
                        : "invisible pointer-events-none"
                        }`}
                    >
                      <Cross1Icon className="h-3 w-3" />
                    </span>
                  )}
                </button>
              );
            });
          })()}
        </div>



        {/* ── Issue Cards Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
          <AnimatePresence mode="popLayout">
            {error ? (
              <m.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-4"
              >
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-2">
                  <Cross1Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold dark:text-white">
                  {isRTL ? "عذراً، حدث خطأ ما" : "Oops, something went wrong"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  {isRTL ? "إعادة المحاولة" : "Try Again"}
                </button>
              </m.div>
            ) : loading ? (
              [...Array(6)].map((_, i) => (
                <m.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 h-[400px] overflow-hidden flex flex-col"
                >
                  {/* Image skeleton */}
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse" />
                  <div className="p-5 flex-1 space-y-4">
                    {/* Category tag skeleton */}
                    <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
                    {/* Title skeleton */}
                    <div className="space-y-2">
                      <div className="h-5 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                      <div className="h-5 w-2/3 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                    </div>
                    {/* Description skeleton */}
                    <div className="space-y-2 pt-2">
                      <div className="h-3 w-full bg-gray-50 dark:bg-gray-800/50 rounded animate-pulse" />
                      <div className="h-3 w-full bg-gray-50 dark:bg-gray-800/50 rounded animate-pulse" />
                    </div>
                    {/* Footer skeleton */}
                    <div className="pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                      <div className="flex gap-3">
                        <div className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                      </div>
                      <div className="h-6 w-24 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
                    </div>
                  </div>
                </m.div>
              ))
            ) : filtered.length === 0 ? (
              <m.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-4"
              >
                <span className="text-6xl">🔍</span>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {isRTL ? "لا توجد مشاكل تطابق البحث" : "No issues match your filters"}
                </p>
                <button
                  onClick={() => { setActiveCategories([]); setActiveStatus("all"); setSearch(""); }}
                  className="text-red-600 hover:text-red-700 font-medium underline underline-offset-2"
                >
                  {isRTL ? "مسح الفلاتر" : "Clear filters"}
                </button>
              </m.div>
            ) : (
              filtered.map((issue, index) => (
                <m.article
                  key={issue.id}
                  layout
                  onClick={() => navigate(`/issues/${issue.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg border transition-shadow flex flex-col h-full group cursor-pointer ${issue.status === "solved"
                    ? "border-emerald-200 dark:border-emerald-800/40 relative"
                    : "border-gray-200 dark:border-gray-800"
                    }`}
                >
                  {/* Resolved ribbon */}
                  {issue.status === "solved" && (
                    <div
                      className={`absolute top-0 ${isRTL ? "left-0 rounded-br-xl" : "right-0 rounded-bl-xl"
                        } bg-emerald-500 text-white text-xs font-bold px-3 py-1 z-30 flex items-center gap-1`}
                    >
                      <CheckCircledIcon className="h-3.5 w-3.5" />
                      {isRTL ? "تم الحل" : "Solved"}
                    </div>
                  )}

                  {/* Image */}
                  {(issue.image_url || issue.video_url) && (
                    <div className="h-48 overflow-hidden relative shrink-0 rounded-t-2xl">
                      {issue.status === "solved" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      )}
                      {issue.video_url && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <PlayIcon className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                      {issue.image_url && (
                        <img
                          alt={issue.title}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${issue.status === "solved" ? "grayscale opacity-80" : ""
                            }`}
                          src={issue.image_url}
                        />
                      )}
                      <span
                        className={`absolute top-3 ${isRTL ? "right-3" : "left-3"
                          } bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 text-xs font-semibold px-2.5 py-0.5 rounded-full z-20`}
                      >
                        {getCategoryLabel(issue.category_id)}
                      </span>
                    </div>
                  )}

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    {!issue.image_url && !issue.video_url && (
                      <span className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 self-start">
                        {getCategoryLabel(issue.category_id)}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2">
                      {issue.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                      {issue.description}
                    </p>

                    {/* Location & time */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 flex-wrap">
                      <DrawingPinIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>{issue.location_text}</span>
                      <span className="mx-0.5">•</span>
                      <ClockIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>{formatTime(issue.created_at, isRTL)}</span>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between items-center">
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => handleUpvote(issue.id, e)}
                          disabled={upvotingIds.includes(issue.id)}
                          className={`flex items-center gap-1.5 text-sm transition-all active:scale-95 disabled:opacity-50 ${issue.has_upvoted
                              ? "text-red-600 font-bold"
                              : issue.status === "solved"
                                ? "text-emerald-500/60 dark:text-emerald-400/60 cursor-default"
                                : "text-gray-400 hover:text-red-600"
                            }`}
                        >
                          <ArrowUpIcon className="h-4 w-4" />
                          <span className="font-medium">{issue.upvotes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-500 transition-colors">
                          <ChatBubbleIcon className="h-4 w-4" />
                          <span className="font-medium">{issue.comments}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        {issue.author?.avatar_url ? (
                          <img
                            alt={issue.author?.full_name}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
                            src={issue.author?.avatar_url}
                          />
                        ) : (
                          <PersonIcon className="h-4 w-4" />
                        )}
                        <span>{issue.author?.full_name || (isRTL ? "مستخدم" : "User")}</span>
                      </div>
                    </div>
                  </div>
                </m.article>
              ))
            )}
          </AnimatePresence>
        </div>


      </m.div>

      {/* ══════════════════════════════════════════════════════════════════════
          Advanced Filter Drawer
        ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <m.aside
              key="drawer"
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed top-0 ${isRTL ? "left-0" : "right-0"
                } h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col`}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <MixerHorizontalIcon className="h-5 w-5 text-red-600" />
                  <h2 className="font-bold text-gray-900 dark:text-white text-lg">
                    {isRTL ? "الفلاتر المتقدمة" : "Advanced Filters"}
                  </h2>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
                >
                  <Cross1Icon className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Status Filter */}
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    {isRTL ? "الحالة" : "Status"}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setActiveStatus(s)}
                        className={`flex items-center justify-between px-4 py-2 rounded-xl border text-sm font-medium transition-all ${activeStatus === s
                          ? s === "solved"
                            ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                            : s === "in_progress"
                              ? "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400"
                              : s === "pending"
                                ? "bg-orange-50 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-400"
                                : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400"
                          }`}
                      >
                        <span>{statusLabel(s, isRTL)}</span>
                        {activeStatus === s && <CheckIcon className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Sort by */}
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    {isRTL ? "الترتيب" : "Sort By"}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {["newest", "votes", "comments"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSortBy(s)}
                        className={`flex items-center justify-between px-4 py-2 rounded-xl border text-sm font-medium transition-all ${sortBy === s
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400"
                          }`}
                      >
                        <span>{sortLabel(s, isRTL)}</span>
                        {sortBy === s && <CheckIcon className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Category inside drawer too */}
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    {isRTL ? "الفئة" : "Category"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const isActive =
                        cat.id === "all"
                          ? activeCategories.length === 0
                          : activeCategories.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${isActive
                            ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-500/20"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-red-400 hover:text-red-600"
                            }`}
                        >
                          <CategoryIcon name={cat.iconStr} className={`h-3 w-3 ${isActive ? "text-white" : "text-gray-400"}`} />
                          <span>{isRTL ? cat.labelAr : cat.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Drawer Footer actions */}
              <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                <button
                  onClick={() => {
                    setActiveCategories([]);
                    setActiveStatus("all");
                    setSortBy("newest");
                    setSearch("");
                  }}
                  className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {isRTL ? "مسح الكل" : "Clear All"}
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors shadow-sm"
                >
                  {isRTL ? "تطبيق" : "Apply"}
                </button>
              </div>
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
