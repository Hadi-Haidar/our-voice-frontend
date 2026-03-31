import { useState, useEffect } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import LocationPicker from "../components/ReportIssue/LocationPicker";
import CustomSelect from "../components/CustomSelect";
import { CATEGORIES } from "../data/categories";
import { issueService } from "../services/issueService";
import {
    ChevronDownIcon,
    UploadIcon,
    Cross2Icon,
    PaperPlaneIcon,
    ExclamationTriangleIcon,
    UpdateIcon
} from "@radix-ui/react-icons";

export default function EditIssue() {
    const { id } = useParams();
    const { isRTL } = useLanguage();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [locationText, setLocationText] = useState("");
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [images, setImages] = useState([]); // { url: string, type: 'image' | 'video' }

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                setLoading(true);
                const response = await issueService.getIssueById(id);
                if (response.success) {
                    const issue = response.data;
                    setTitle(issue.title);
                    setDescription(issue.description);
                    setCategory(issue.category_id);
                    setLocationText(issue.location_text);
                    if (issue.lat && issue.lng) {
                        setSelectedPosition({ lat: issue.lat, lng: issue.lng });
                    }
                    const media = [];
                    if (issue.image_url) media.push({ url: issue.image_url, type: 'image' });
                    if (issue.video_url) media.push({ url: issue.video_url, type: 'video' });
                    setImages(media);
                }
            } catch (err) {
                console.error("Error fetching issue for edit:", err);
                setError(isRTL ? "تعذر تحميل بيانات المشكلة" : "Could not load issue data");
            } finally {
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id, isRTL]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !category || !locationText) {
            setError(isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const issueData = {
                title,
                description,
                category_id: category,
                location_text: locationText,
                lat: selectedPosition?.lat,
                lng: selectedPosition?.lng,
                image_url: images.find(img => img.type === 'image')?.url || null,
                video_url: images.find(img => img.type === 'video')?.url || null,
            };

            const response = await issueService.updateIssue(id, issueData);
            if (response.success) {
                navigate(`/issues/${id}`);
            }
        } catch (err) {
            console.error("Error updating issue:", err);
            setError(err.response?.data?.message || err.message || (isRTL ? "حدث خطأ أثناء تحديث البلاغ" : "Error updating the report"));
        } finally {
            setSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <LazyMotion features={domAnimation}>
            <m.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
            >
                <div className="max-w-3xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                            {isRTL ? "تعديل المنشور" : "Edit Issue Post"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {isRTL
                                ? "قم بتحديث تفاصيل البلاغ لضمان دقة المعلومات."
                                : "Update the report details to ensure accurate information."}
                        </p>
                    </div>

                    {/* Form Card */}
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">

                        {error && (
                            <div className="mx-4 mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                                <ExclamationTriangleIcon className="h-5 w-5 shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

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
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
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
                                            icon: c.iconStr
                                        }))}
                                        value={category}
                                        onChange={setCategory}
                                        placeholder={isRTL ? "اختر الفئة" : "Select Category"}
                                    />
                                </div>

                                {/* Location Text */}
                                <div className="col-span-2 space-y-2">
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white" htmlFor="location">
                                        {isRTL ? "الموقع (شارع، منطقة)" : "Location (Street, Area)"} <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-red-600/20 py-3 px-4 outline-none transition-all"
                                        id="location"
                                        placeholder={isRTL ? "بيروت، شارع الحمرا" : "e.g., Beirut, Hamra St"}
                                        type="text"
                                        value={locationText}
                                        onChange={(e) => setLocationText(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-span-2 space-y-2">
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white" htmlFor="description">
                                        {isRTL ? "تفاصيل المشكلة" : "Description"} <span className="text-red-600">*</span>
                                    </label>
                                    <textarea
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-red-600/20 py-3 px-4 outline-none transition-all min-h-[120px] resize-none"
                                        id="description"
                                        placeholder={isRTL ? "صف المشكلة بالتفصيل..." : "Describe the issue in detail..."}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />

                        {/* Section 2: Media */}
                        <div className="p-4 sm:p-6 md:p-8 space-y-4">
                            <label className="block text-sm font-bold text-gray-900 dark:text-white">
                                {isRTL ? "الأدلة المرئية (تعديل)" : "Media Evidence (Update)"}
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

                        {/* Section 3: Location Marker */}
                        <div className="p-4 sm:p-6 md:p-8 space-y-6">
                            <label className="block text-sm font-bold text-gray-900 dark:text-white">
                                {isRTL ? "الموقع على الخريطة (اختياري)" : "Location on Map (Optional)"}
                            </label>
                            <LocationPicker
                                selectedPosition={selectedPosition}
                                setSelectedPosition={setSelectedPosition}
                                onAddressSelect={(addr) => setLocationText(addr)}
                                isRTL={isRTL}
                            />
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />

                        {/* Section 4: Privacy & Submit */}
                        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 flex flex-col gap-6">
                            <div className={`flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                                <button
                                    type="button"
                                    onClick={() => navigate(`/issues/${id}`)}
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors py-2"
                                >
                                    {isRTL ? "إلغاء" : "Cancel"}
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-base shadow-lg shadow-emerald-500/30 transition-all transform active:scale-95 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                                    ) : (
                                        <>
                                            {isRTL ? "حفظ التغييرات" : "Save Changes"}
                                            <UpdateIcon className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </m.main>
        </LazyMotion>
    );
}
