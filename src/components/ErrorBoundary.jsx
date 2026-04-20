import React from "react";
import { ExclamationTriangleIcon, ReloadIcon, HomeIcon } from "@radix-ui/react-icons";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const isRTL = document.documentElement.dir === "rtl" || document.body.classList.contains("rtl");

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 animate-slide-up">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
              <ExclamationTriangleIcon className="h-10 w-10" />
            </div>
            
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
              {isRTL ? "عذراً، حدث خطأ غير متوقع" : "Oops, something went wrong"}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {isRTL 
                ? "واجه التطبيق مشكلة تقنية غير متوقعة. لقد تم تسجيل الخطأ وسنعمل على إصلاحه قريباً."
                : "The application encountered an unexpected error. Don't worry, we've logged it and will look into it."}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-500/30 transition-all active:scale-95"
              >
                <ReloadIcon className="h-5 w-5" />
                {isRTL ? "إعادة تحميل التطبيق" : "Reload Application"}
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95 border border-gray-200 dark:border-gray-700"
              >
                <HomeIcon className="h-5 w-5" />
                {isRTL ? "العودة للرئيسية" : "Back to Home"}
              </button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-left overflow-auto max-h-40 border border-gray-100 dark:border-gray-800">
                <p className="text-xs font-mono text-red-500 font-bold mb-1">Development Error Shell:</p>
                <p className="text-xs font-mono text-gray-500 break-words">{this.state.error?.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
