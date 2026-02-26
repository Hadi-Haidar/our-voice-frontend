import { useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../components/ReportIssue/LocationPicker";
import CustomSelect from "../components/CustomSelect";
import { CATEGORIES } from "../data/categories";
import {
    ChevronDownIcon,
    UploadIcon,
    Cross2Icon,
    PaperPlaneIcon,
} from "@radix-ui/react-icons";

export default function ReportIssue() {
    const { isRTL } = useLanguage();
    const navigate = useNavigate();

    const [isAnonymous, setIsAnonymous] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [images, setImages] = useState([]); // { url: string, type: 'image' | 'video' }
    const [category, setCategory] = useState("");

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, {
                    url: reader.result,
                    type: file.type.startsWith('video') ? 'video' : 'image'
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            <m.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
            >
                <div className="max-w-3xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                            {isRTL ? "أبلغ عن مشكلة جديدة" : "Report a New Issue"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {isRTL
                                ? "ساعدنا في تحسين لبنان من خلال الإبلاغ عن المشاكل العامة في منطقتك."
                                : "Help us improve Lebanon by reporting public issues in your area."}
                        </p>
                    </div>

                    {/* Form Card */}
                    <form className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
                        {/* Section 1: Details */}
                        <div className="p-4 sm:p-6 md:p-8 space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Issue Title */}
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white" htmlFor="title">
                                        {isRTL ? "عنوان المشكلة" : "Issue Title"} <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-red-600/20 py-3 px-4 outline-none transition-all"
                                        id="title"
                                        placeholder={isRTL ? "مثال: حفرة في الشارع الرئيسي" : "e.g., Pothole on Main St"}
                                        type="text"
                                    />
                                </div>
                                {/* Category */}
                                <div className="col-span-2 md:col-span-1 space-y-2">
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white" htmlFor="category">
                                        {isRTL ? "الفئة" : "Category"} <span className="text-red-600">*</span>
                                    </label>
                                    <CustomSelect
                                        options={CATEGORIES.filter(c => c.id !== "all").map(c => ({
                                            value: c.id,
                                            label: isRTL ? c.labelAr : c.labelEn,
                                            icon: c.icon
                                        }))}
                                        value={category}
                                        onChange={setCategory}
                                        placeholder={isRTL ? "اختر فئة" : "Select a category"}
                                        isRTL={isRTL}
                                    />
                                </div>
                            </div>
                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-900 dark:text-white" htmlFor="description">
                                    {isRTL ? "الوصف" : "Description"} <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-red-600/20 py-3 px-4 outline-none transition-all resize-none"
                                    id="description"
                                    placeholder={isRTL ? "صف المشكلة بالتفصيل..." : "Describe the issue in detail..."}
                                    rows="4"
                                    onChange={(e) => setCharCount(e.target.value.length)}
                                ></textarea>
                                <div className={`flex ${isRTL ? "justify-start" : "justify-end"}`}>
                                    <span className="text-xs text-gray-400">{charCount}/500 {isRTL ? "حرف" : "characters"}</span>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />

                        {/* Section 2: Media */}
                        <div className="p-4 sm:p-6 md:p-8 space-y-4">
                            <label className="block text-sm font-bold text-gray-900 dark:text-white">
                                {isRTL ? "الأدلة المرئية" : "Media Evidence"}
                            </label>
                            <label className="flex justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 px-6 py-10 hover:bg-gray-50 dark:hover:bg-gray-800/30 hover:border-red-400 transition-all cursor-pointer group relative">
                                <input
                                    className="sr-only"
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                />
                                <div className="text-center">
                                    <UploadIcon className="h-10 w-10 text-gray-400 group-hover:text-red-600 transition-colors mx-auto mb-3" />
                                    <div className="flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        <span className="font-semibold text-red-600 hover:text-red-700">
                                            {isRTL ? "رفع ملف" : "Upload a file"}
                                        </span>
                                        <p className="px-1">{isRTL ? "أو اسحب وأفلت" : "or drag and drop"}</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">{isRTL ? "PNG, JPG, MP4 حتى 10 ميجابايت" : "PNG, JPG, MP4 up to 10MB"}</p>
                                </div>
                            </label>

                            {/* Uploaded Previews */}
                            {images.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 group border border-gray-100 dark:border-gray-800">
                                            {img.type === 'video' ? (
                                                <video src={img.url} className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                                            )}
                                            <button
                                                onClick={(e) => { e.preventDefault(); removeImage(idx); }}
                                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
                                                type="button"
                                            >
                                                <Cross2Icon className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />


                        {/* Section 3: Location */}
                        <div className="p-4 sm:p-6 md:p-8 space-y-6">
                            <label className="block text-sm font-bold text-gray-900 dark:text-white">
                                {isRTL ? "الموقع" : "Location"}
                            </label>

                            <LocationPicker
                                selectedPosition={selectedPosition}
                                setSelectedPosition={setSelectedPosition}
                                isRTL={isRTL}
                            />
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />

                        {/* Section 4: Privacy & Submit */}
                        <div className="p-4 sm:p-6 md:p-8 bg-gray-50/50 dark:bg-white/[0.02] flex flex-col gap-8">
                            {/* Anonymous Toggle */}
                            <div className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        {isRTL ? "النشر بهوية مجهولة" : "Post Anonymously"}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {isRTL ? "سيتم إخفاء اسمك من التقرير العام." : "Your name will be hidden from the public report."}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAnonymous ? "bg-red-600" : "bg-gray-200 dark:bg-gray-700"}`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnonymous ? (isRTL ? "-translate-x-6" : "translate-x-6") : (isRTL ? "-translate-x-1" : "translate-x-1")}`}
                                    />
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className={`flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                                <button
                                    type="button"
                                    onClick={() => navigate("/issues")}
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors py-2"
                                >
                                    {isRTL ? "إلغاء" : "Cancel"}
                                </button>
                                <button
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-base shadow-lg shadow-red-500/30 transition-all transform active:scale-95 group"
                                    type="submit"
                                    onClick={(e) => { e.preventDefault(); navigate("/issues"); }}
                                >
                                    {isRTL ? "نشر المشكلة" : "Post Issue"}
                                    <PaperPlaneIcon className={`h-5 w-5 group-hover:translate-x-1 ${isRTL ? "rotate-360" : ""} transition-transform`} />
                                </button>
                            </div>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-600 max-w-md mx-auto">
                        {isRTL
                            ? <>من خلال تقديم هذه المشكلة، فإنك توافق على <a className="underline hover:text-red-600" href="#">شروط الخدمة</a> و <a className="underline hover:text-red-600" href="#">سياسة الخصوصية</a> الخاصة بنا. سيتم إزالة المحتوى غير المناسب.</>
                            : <>By submitting this issue, you agree to our <a className="underline hover:text-red-600" href="#">Terms of Service</a> and <a className="underline hover:text-red-600" href="#">Privacy Policy</a>. Inappropriate content will be removed.</>}
                    </p>
                </div>
            </m.main>
        </LazyMotion>
    );
}
