import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { CATEGORIES } from "../data/categories";
import { issueService } from "../services/issueService";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DrawingPinIcon,
    ClockIcon,
    ArrowUpIcon,
    ChatBubbleIcon,
    Share1Icon,
    PlayIcon,
    CheckCircledIcon,
    EyeNoneIcon,
    PaperPlaneIcon,
    DotsHorizontalIcon,
    PersonIcon,
    Cross1Icon,
    Pencil1Icon,
    TrashIcon
} from "@radix-ui/react-icons";
import { Helmet } from "react-helmet-async";
import IssueMap from "../components/IssueMap";
import { useAuth } from "../contexts/AuthContext";
import { useConfirm } from "../hooks/useConfirm";


export default function IssueDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRTL } = useLanguage();
    const { user } = useAuth();

    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [upvoting, setUpvoting] = useState(false);
    const [submittingComment, setSubmittingComment] = useState(false);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const confirm = useConfirm();

    const handleDelete = async () => {
        try {
            const ok = await confirm({
                title: isRTL ? "حذف البلاغ" : "Delete Issue",
                message: isRTL
                    ? "هل أنت متأكد أنك تريد حذف هذا البلاغ؟ لا يمكن التراجع عن هذا الإجراء وسيتم حذف جميع التعليقات المرتبطة به."
                    : "Are you sure you want to delete this issue? This action cannot be undone and all associated comments will be deleted.",
                confirmText: isRTL ? "حذف" : "Delete"
            });

            if (ok) {
                setDeleting(true);
                const response = await issueService.deleteIssue(id);
                if (response.success) {
                    navigate("/issues");
                }
            }
        } catch (err) {
            console.error("Error deleting issue:", err);
            alert(isRTL ? "فشل حذف البلاغ" : "Failed to delete issue");
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await issueService.getIssueById(id);
                if (response.success) {
                    setIssue(response.data);
                } else {
                    setError(isRTL ? "فشل تحميل البيانات" : "Failed to load data");
                }
            } catch (err) {
                console.error("Error fetching issue:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIssue();
    }, [id, isRTL]);

    const getCategoryLabel = (catId) => {
        const cat = CATEGORIES.find(c => c.id === catId);
        if (!cat) return catId;
        return isRTL ? cat.labelAr : cat.labelEn;
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

    const statusLabel = (s, ar) => {
        if (s === "pending") return ar ? "قيد الانتظار" : "Pending";
        if (s === "in_progress") return ar ? "قيد المعالجة" : "In Progress";
        if (s === "solved") return ar ? "تم الحل" : "Solved";
        return s;
    };

    const handleUpvote = async () => {
        if (!user) {
            alert(isRTL ? "يرجى تسجيل الدخول للقيام بذلك" : "Please login to upvote");
            return;
        }

        if (upvoting) return;

        try {
            setUpvoting(true);
            const response = await issueService.toggleUpvote(id);
            if (response.success) {
                // Update local state
                setIssue(prev => ({
                    ...prev,
                    has_upvoted: response.upvoted,
                    upvotes_count: response.upvoted 
                        ? (prev.upvotes_count + 1) 
                        : (prev.upvotes_count - 1)
                }));
            }
        } catch (err) {
            console.error("Error toggling upvote:", err);
        } finally {
            setUpvoting(false);
        }
    };

    const handleAddComment = async () => {
        if (!user) {
            alert(isRTL ? "يرجى تسجيل الدخول لإضافة تعليق" : "Please login to add a comment");
            return;
        }

        if (!commentText.trim() || submittingComment) return;

        try {
            setSubmittingComment(true);
            const response = await issueService.addComment(id, commentText);
            
            if (response.success) {
                // Add the new comment to the local state
                setIssue(prev => ({
                    ...prev,
                    comments: [response.data, ...(prev.comments || [])],
                    comments_count: (prev.comments_count || 0) + 1
                }));
                setCommentText(""); // Clear input
            } else {
                alert((isRTL ? "فشل إضافة التعليق: " : "Failed to add comment: ") + response.message);
            }
        } catch (err) {
            console.error("Error adding comment:", err);
            const errMsg = err.response?.data?.message || err.message;
            alert((isRTL ? "فشل إضافة التعليق: " : "Failed to add comment: ") + errMsg);
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditCommentText(comment.text);
        setActiveDropdownId(null);
    };

    const handleSaveEdit = async () => {
        if (!editCommentText.trim()) return;
        try {
            const response = await issueService.updateComment(id, editingCommentId, editCommentText);
            if (response.success) {
                setIssue(prev => ({
                    ...prev,
                    comments: prev.comments.map(c => c.id === editingCommentId ? { ...c, text: editCommentText } : c)
                }));
                setEditingCommentId(null);
            } else {
                alert((isRTL ? "فشل تعديل التعليق: " : "Failed to edit comment: ") + response.message);
            }
        } catch (err) {
            console.error("Error updating comment:", err);
            const errMsg = err.response?.data?.message || err.message;
            alert((isRTL ? "فشل تعديل التعليق: " : "Failed to edit comment: ") + errMsg);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const ok = await confirm({
                title: isRTL ? "حذف التعليق" : "Delete Comment",
                message: isRTL ? "هل أنت متأكد أنك تريد حذف هذا التعليق؟" : "Are you sure you want to delete this comment?",
                confirmText: isRTL ? "حذف" : "Delete"
            });

            if (ok) {
                const response = await issueService.deleteComment(id, commentId);
                if (response.success) {
                    setIssue(prev => ({
                        ...prev,
                        comments: prev.comments.filter(c => c.id !== commentId),
                        comments_count: Math.max(0, (prev.comments_count || 0) - 1)
                    }));
                } else {
                    alert((isRTL ? "فشل حذف التعليق: " : "Failed to delete comment: ") + response.message);
                }
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
            const errMsg = err.response?.data?.message || err.message;
            alert((isRTL ? "فشل حذف التعليق: " : "Failed to delete comment: ") + errMsg);
        } finally {
            setActiveDropdownId(null);
        }
    };

    const handleShare = async () => {
        if (!issue) return;
        const shareData = {
            title: issue.title,
            text: issue.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 w-full max-w-7xl mx-auto min-h-[60vh] text-center gap-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-2">
                    <Cross1Icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold dark:text-white">{isRTL ? "عذراً، حدث خطأ ما" : "Oops, something went wrong"}</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                    {isRTL ? "إعادة المحاولة" : "Try Again"}
                </button>
            </div>
        );
    }

    if (!issue) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 w-full max-w-7xl mx-auto min-h-[60vh] text-center gap-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-2">
                    <EyeNoneIcon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold dark:text-white">{isRTL ? "المشكلة غير موجودة" : "Issue not found"}</h2>
                <button onClick={() => navigate("/issues")} className="text-red-600 hover:underline font-bold">
                    {isRTL ? "العودة للمشاكل" : "Back to Issues"}
                </button>
            </div>
        );
    }

    const commentsToShow = issue.comments || [];

    return (
        <LazyMotion features={domAnimation}>
            <Helmet>
                <title>{issue ? `${issue.title} | Our Voice` : "Issue Details | Our Voice"}</title>
                <meta name="description" content={issue ? issue.description.substring(0, 160) : "View issue details on Our Voice"} />
                
                {issue && (
                    <>
                        {/* Open Graph / Facebook */}
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={window.location.href} />
                        <meta property="og:title" content={issue.title} />
                        <meta property="og:description" content={issue.description.substring(0, 160)} />
                        {issue.image_url && <meta property="og:image" content={issue.image_url} />}

                        {/* Twitter */}
                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content={window.location.href} />
                        <meta property="twitter:title" content={issue.title} />
                        <meta property="twitter:description" content={issue.description.substring(0, 160)} />
                        {issue.image_url && <meta property="twitter:image" content={issue.image_url} />}
                    </>
                )}
            </Helmet>
            <m.div

                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="px-4 py-8 lg:px-8 w-full max-w-4xl mx-auto pb-8"
            >
                {/* Back button */}
                <button
                    onClick={() => navigate("/issues")}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors mb-6 font-medium text-sm"
                >
                    {isRTL ? <ArrowRightIcon className="h-4 w-4" /> : <ArrowLeftIcon className="h-4 w-4" />}
                    {isRTL ? "العودة" : "Back"}
                </button>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-8">
                    {/* Header & Status */}
                    <div className="p-4 sm:p-6 md:p-8 pb-4">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <span className="bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-xs font-semibold px-3 py-1 rounded-full border border-red-100 dark:border-red-800/50">
                                {getCategoryLabel(issue.category_id)}
                            </span>
                            <div className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm shadow-black/5 ${issue.status === 'solved' ? 'bg-emerald-500 text-white shadow-emerald-500/20' :
                                issue.status === 'in_progress' ? 'bg-blue-500 text-white shadow-blue-500/20' :
                                    'bg-orange-500 text-white shadow-orange-500/20'
                                }`}>
                                {issue.status === 'solved' && <CheckCircledIcon className="h-4 w-4" />}
                                {statusLabel(issue.status, isRTL)}
                            </div>

                            {/* Edit Button for Author */}
                            {user?.id === issue.author_id && (
                                <button
                                    onClick={() => navigate(`/issues/${id}/edit`)}
                                    className="ms-auto flex items-center gap-1.5 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl transition-all border border-gray-100 dark:border-gray-700 active:scale-95"
                                >
                                    <Pencil1Icon className="h-4 w-4 text-red-600" />
                                    {isRTL ? "تعديل المنشور" : "Edit Post"}
                                </button>
                            )}

                            {/* Delete Button for Author */}
                            {user?.id === issue.author_id && (
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl transition-all border border-red-100 dark:border-red-900/30 active:scale-95 disabled:opacity-50"
                                >
                                    {deleting ? (
                                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-600/30 border-t-red-600"></div>
                                    ) : (
                                        <TrashIcon className="h-4 w-4" />
                                    )}
                                    {isRTL ? "حذف" : "Delete"}
                                </button>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                            {issue.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <DrawingPinIcon className="h-4 w-4 shrink-0 text-red-500" />
                                <span>{issue.location_text}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ClockIcon className="h-4 w-4 shrink-0" />
                                <span>{formatTime(issue.created_at, isRTL)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    {(issue.image_url || issue.video_url) && (
                        <div className="w-full relative bg-gray-100 dark:bg-gray-800 aspect-video md:aspect-[21/9]">
                            {issue.video_url && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md">
                                        <PlayIcon className="h-8 w-8 text-white ml-1" />
                                    </div>
                                </div>
                            )}
                            {issue.image_url && (
                                <img
                                    alt={issue.title}
                                    className={`w-full h-full object-cover ${(issue.status === "solved") ? "grayscale opacity-80" : ""}`}
                                    src={issue.image_url}
                                />
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div className="p-4 sm:p-6 md:p-8">
                        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                            {issue.description}
                        </p>

                        {/* Real Location Map */}
                        {issue.lat && issue.lng && (
                            <IssueMap coordinates={{ lat: issue.lat, lng: issue.lng }} address={issue.location_text} isRTL={isRTL} />
                        )}
                    </div>

                    {/* Footer stats */}
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4 bg-gray-50 dark:bg-gray-800/20">
                        <div className="flex items-center gap-2">
                            {issue.author?.avatar_url ? (
                                <img
                                    alt={issue.author?.full_name}
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                    src={issue.author?.avatar_url}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                    <PersonIcon className="h-4 w-4" />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">{isRTL ? "نشر بواسطة" : "Posted by"}</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{issue.author?.full_name || (isRTL ? "مستخدم" : "User")}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={handleUpvote}
                                disabled={upvoting}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all shadow-sm font-bold ${
                                    issue.has_upvoted 
                                    ? "bg-red-600 border-red-600 text-white shadow-red-500/20" 
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-400 hover:text-red-600 text-gray-700 dark:text-gray-300"
                                } active:scale-95 disabled:opacity-50`}
                            >
                                <ArrowUpIcon className="h-4 w-4" />
                                <span>{issue.upvotes_count || 0}</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all shadow-sm font-medium ${copied
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:text-blue-500 text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                <Share1Icon className="h-4 w-4" />
                                <span className="font-bold hidden sm:inline">
                                    {copied
                                        ? (isRTL ? "تم النسخ!" : "Link Copied!")
                                        : (isRTL ? "مشاركة" : "Share")
                                    }
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-4">
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <ChatBubbleIcon className="h-5 w-5 text-gray-400 shrink-0" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            {isRTL ? `التعليقات (${issue.comments_count || 0})` : `Comments (${issue.comments_count || 0})`}
                        </h2>
                    </div>

                    <div className="p-4 sm:p-6 md:p-8 space-y-6">
                        {/* Add comment */}
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0 border border-red-200 dark:border-red-800">
                                <span className="font-bold text-xs">ME</span>
                            </div>
                            <div className="flex-1 relative">
                                <textarea
                                    className={`w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl py-3 ${isRTL ? "pr-4 pl-12" : "pl-4 pr-12"} outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all resize-none text-gray-900 dark:text-white`}
                                    placeholder={isRTL ? "أضف تعليقاً يساهم في الحل..." : "Add a helpful comment..."}
                                    rows="2"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <button
                                    onClick={handleAddComment}
                                    className={`absolute bottom-3 mb-1 p-2 rounded-xl transition-all shadow-md ${commentText.trim() && !submittingComment ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"}`}
                                    style={{ [isRTL ? 'left' : 'right']: '12px' }}
                                    disabled={!commentText.trim() || submittingComment}
                                >
                                    {submittingComment ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                                    ) : (
                                        <PaperPlaneIcon className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Comment list */}
                        <div className="space-y-6 pt-4">
                            {commentsToShow.map((comment, i) => (
                                <div key={comment.id || i}>
                                    <div className="flex gap-3">
                                        {comment.author?.avatar_url ? (
                                            <img src={comment.author.avatar_url} alt={comment.author.full_name} className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-gray-200 dark:ring-gray-700" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                                                <PersonIcon className="h-4 w-4 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1 overflow-hidden">
                                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl rounded-tr-none px-4 py-3 border border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-gray-900 dark:text-white text-sm">{comment.author?.full_name || (isRTL ? "مستخدم" : "User")}</span>
                                                    <span className="text-xs text-gray-400">{formatTime(comment.created_at || new Date(), isRTL)}</span>
                                                </div>
                                                {editingCommentId === comment.id ? (
                                                    <div className="mt-2 flex flex-col gap-2">
                                                        <textarea 
                                                            value={editCommentText}
                                                            onChange={(e) => setEditCommentText(e.target.value)}
                                                            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 focus:border-red-400 resize-none text-sm text-gray-900 dark:text-white outline-none"
                                                            rows="2"
                                                        />
                                                        <div className="flex justify-end gap-2 text-xs font-bold mt-1">
                                                            <button onClick={() => setEditingCommentId(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">{isRTL ? "إلغاء" : "Cancel"}</button>
                                                            <button onClick={handleSaveEdit} className="text-white bg-red-600 px-3 py-1.5 rounded-xl hover:bg-red-700">{isRTL ? "حفظ" : "Save"}</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                                        {comment.text}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-2 ml-2 mr-2">
                                                <button className="hover:text-red-600 transition-colors">{isRTL ? "رد" : "Reply"}</button>
                                            </div>
                                        </div>
                                        {user?.id === comment.author?.id && (
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setActiveDropdownId(activeDropdownId === comment.id ? null : comment.id)}
                                                    className="self-start text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mt-2 p-1"
                                                >
                                                    <DotsHorizontalIcon className="h-4 w-4" />
                                                </button>
                                                {activeDropdownId === comment.id && (
                                                    <div className={`absolute top-8 ${isRTL ? 'left-0' : 'right-0'} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl z-20 py-1 flex flex-col overflow-hidden w-28`}>
                                                        <button onClick={() => handleEditComment(comment)} className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-start flex gap-2 items-center"><Pencil1Icon className="h-3 w-3"/>{isRTL ? "تعديل" : "Edit"}</button>
                                                        <button onClick={() => handleDeleteComment(comment.id)} className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex gap-2 items-center"><TrashIcon className="h-3 w-3"/>{isRTL ? "حذف" : "Delete"}</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {i < commentsToShow.length - 1 && <hr className="border-gray-100 dark:border-gray-800 mt-6" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </m.div>
        </LazyMotion>
    );
}
