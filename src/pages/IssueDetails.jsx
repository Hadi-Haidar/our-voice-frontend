import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { issuesMock } from "../data/issuesMock";
import { getMockComments } from "../data/commentsMock";
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
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import IssueMap from "../components/IssueMap";

export default function IssueDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRTL } = useLanguage();

    const issue = issuesMock.find((i) => i.id === parseInt(id));

    const [commentText, setCommentText] = useState("");

    if (!issue) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 w-full max-w-7xl mx-auto min-h-[60vh]">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">{isRTL ? "المشكلة غير موجودة" : "Issue not found"}</h2>
                <button onClick={() => navigate("/issues")} className="text-red-600 hover:underline font-medium">
                    {isRTL ? "العودة للمشاكل" : "Back to Issues"}
                </button>
            </div>
        );
    }

    const mockComments = getMockComments(isRTL);

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 w-full max-w-4xl mx-auto pb-20"
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
                            <span className={`${issue.categoryColor} text-xs font-semibold px-3 py-1 rounded-full`}>
                                {issue.category}
                            </span>
                            {issue.status === "resolved" && (
                                <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm shadow-emerald-500/20">
                                    <CheckCircledIcon className="h-4 w-4" />
                                    {isRTL ? "تم الحل" : "Resolved"}
                                </div>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                            {issue.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <DrawingPinIcon className="h-4 w-4 shrink-0 text-red-500" />
                                <span>{issue.location}</span>
                                {issue.coordinates && (
                                    <span className="text-[10px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 dark:bg-red-900/20 dark:border-red-800">GPS</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ClockIcon className="h-4 w-4 shrink-0" />
                                <span>{issue.time}</span>
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    {(issue.image || issue.isVideo) && (
                        <div className="w-full relative bg-gray-100 dark:bg-gray-800 aspect-video md:aspect-[21/9]">
                            {issue.isVideo && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md">
                                        <PlayIcon className="h-8 w-8 text-white ml-1" />
                                    </div>
                                </div>
                            )}
                            {issue.image && (
                                <img
                                    alt={issue.title}
                                    className={`w-full h-full object-cover ${issue.status === "resolved" ? "grayscale opacity-80" : ""}`}
                                    src={issue.image}
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
                        {issue.coordinates && (
                            <IssueMap coordinates={issue.coordinates} address={issue.location} isRTL={isRTL} />
                        )}
                    </div>

                    {/* Footer stats */}
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4 bg-gray-50 dark:bg-gray-800/20">
                        <div className="flex items-center gap-2">
                            {issue.author.image ? (
                                <img
                                    alt={issue.author.name}
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                    src={issue.author.image}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                    <EyeNoneIcon className="h-4 w-4" />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">{isRTL ? "نشر بواسطة" : "Posted by"}</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{issue.author.name}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-red-400 hover:text-red-600 transition-colors shadow-sm text-gray-700 dark:text-gray-300">
                                <ArrowUpIcon className="h-4 w-4" />
                                <span className="font-bold">{issue.upvotes}</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:text-blue-500 transition-colors shadow-sm text-gray-700 dark:text-gray-300">
                                <Share1Icon className="h-4 w-4" />
                                <span className="font-bold hidden sm:inline">{isRTL ? "مشاركة" : "Share"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-12">
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <ChatBubbleIcon className="h-5 w-5 text-gray-400 shrink-0" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            {isRTL ? `التعليقات (${issue.comments})` : `Comments (${issue.comments})`}
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
                                    className={`absolute bottom-3 mb-1 p-2 rounded-xl transition-all shadow-md ${commentText.trim() ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"}`}
                                    style={{ [isRTL ? 'left' : 'right']: '12px' }}
                                    disabled={!commentText.trim()}
                                >
                                    <PaperPlaneIcon className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                                </button>
                            </div>
                        </div>

                        {/* Comment list */}
                        <div className="space-y-6 pt-4">
                            {mockComments.map((comment, i) => (
                                <div key={comment.id}>
                                    <div className="flex gap-3">
                                        {comment.author.image ? (
                                            <img src={comment.author.image} alt={comment.author.name} className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-gray-200 dark:ring-gray-700" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                                                <EyeNoneIcon className="h-4 w-4 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1 overflow-hidden">
                                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl rounded-tr-none px-4 py-3 border border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-gray-900 dark:text-white text-sm">{comment.author.name}</span>
                                                    <span className="text-xs text-gray-400">{comment.time}</span>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                    {comment.text}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-2 ml-2 mr-2">
                                                <button className="hover:text-red-600 transition-colors">{isRTL ? "رد" : "Reply"}</button>
                                                <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                                    <ArrowUpIcon className="h-3 w-3" />
                                                    {comment.upvotes}
                                                </button>
                                            </div>
                                        </div>
                                        <button className="self-start text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mt-2">
                                            <DotsHorizontalIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    {i < mockComments.length - 1 && <hr className="border-gray-100 dark:border-gray-800 mt-6" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </m.div>
        </LazyMotion>
    );
}
