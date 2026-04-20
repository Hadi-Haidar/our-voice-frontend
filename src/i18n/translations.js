/**
 * Translations file for Our Voice Lebanon
 * Structure: { en: {...}, ar: {...} }
 * Keys use dot notation for nested access (e.g., "hero.title")
 */

const translations = {
    en: {
        common: {
            anonymous: "Anonymous",
            back: "Back",
        },
        // Navigation
        nav: {
            home: "Home",
            issues: "Issues",
            polls: "Polls & Votes",
            announcements: "Announcements",
            communityChat: "Community Chat",
            districtChat: "District Chat",
            about: "About",
            avatar: "Avatar",
            myProfile: "My Profile",
            settings: "Settings",
            logout: "Logout",
            helpCenter: "Help Center",
            donate: "Donate",
            supportPlatform: "Support the Platform",
            openMenu: "Open menu",
            ourVoice: "Our Voice",
            login: "Login",
            signup: "Sign Up",
        },

        // Hero Section
        hero: {
            badge: "Community-driven • 🇱🇧",
            title: "Your Voice Matters in Lebanon",
            subtitle:
                "Report local issues, support each other with votes and comments, and track progress transparently.",
            browseIssues: "Browse Issues",
            reportIssue: "Report an Issue",
            submitIssue: "Submit an Issue",
            fastSubmit: "Fast to submit",
            transparentVotes: "Transparent votes",
            communityDriven: "Community-driven",
            imageAlt: "Lebanon community illustration",
        },

        // Problems Section
        problems: {
            title: "Everyday issues go unheard",
            subtitle:
                "Our Voice makes it easy for citizens to report problems, support them with votes, and keep everything visible.",
            electricity: {
                title: "Electricity Cuts",
                desc: "Track outages and highlight urgent areas.",
            },
            water: {
                title: "Water Interruptions",
                desc: "Report disruptions and share updates.",
            },
            roads: {
                title: "Road Damage",
                desc: "Flag potholes and unsafe streets quickly.",
            },
            internet: {
                title: "Internet Issues",
                desc: "Document connectivity problems by region.",
            },
        },

        // How It Works Section
        howItWorks: {
            title: "How the platform works",
            subtitle: "A simple process designed to keep issues visible and accountable.",
            steps: {
                submit: {
                    title: "Submit an Issue",
                    desc: "Document a local problem with clear details.",
                },
                support: {
                    title: "Community Support",
                    desc: "Other citizens vote and comment to confirm impact.",
                },
                visibility: {
                    title: "Public Visibility",
                    desc: "Issues gain visibility through collective attention.",
                },
                track: {
                    title: "Track Progress",
                    desc: "Follow updates and status changes transparently.",
                },
            },
        },

        // Stats Section
        stats: {
            reportedIssues: "Reported Issues",
            communityVotes: "Community Votes",
            activeCitizens: "Active Citizens",
            resolvedProblems: "Resolved Problems",
        },

        // Trust Section
        trust: {
            title: "Built on trust and transparency",
            subtitle: "The platform prioritizes clarity, fairness, and public visibility.",
            points: {
                community: {
                    title: "Community-Driven",
                    desc: "Built around citizen participation, not popularity.",
                },
                transparent: {
                    title: "Transparent",
                    desc: "Votes, comments, and updates remain publicly visible.",
                },
                independent: {
                    title: "Independent",
                    desc: "No hidden agendas or algorithmic promotion.",
                },
                local: {
                    title: "Local Focus",
                    desc: "Designed with Lebanon's daily realities in mind.",
                },
            },
        },

        // CTA Section
        cta: {
            title: "Start with one issue in your area.",
            p1: "Our Voice is a public platform where citizens document local problems and keep them visible over time.",
            p2: "No trends. No algorithms. No noise.",
            p3: "Just issues that affect daily life.",
            reportIssue: "Report an issue",
            browseIssues: "Browse issues",
        },

        // Footer
        footer: {
            copyright: "Our Voice 🇱🇧 — Built for the community.",
        },

        // About Page
        about: {
            title: "About Our Voice 🇱🇧",
            description: "Why this platform exists and who it is for.",
            p1: "Our Voice is a community-driven platform that allows people in Lebanon to raise local issues, share ideas, and follow their progress.",
            p2: "The goal is to create transparency, encourage participation, and give citizens a simple way to make their voices heard.",
        },

        // Issues Page
        issues: {
            title: "Issues",
        },

        // Polls Page
        polls: {
            title: "Polls & Votes",
            subtitle: "Participate in community polls and share your opinion on local matters.",
            vote: "Vote",
            voting: "Voting...",
            voted: "Voted",
            results: "Results",
            participants: "Participants",
            expires: "Expires",
            sponsored: "Sponsored",
            sponsoredAd: "Sponsored Ad",
            sponsoredPoll: "Sponsored Poll",
            learnMore: "Learn More",
            participate: "Participate",
            votedSuccess: "Your vote has been recorded!",
            alreadyVoted: "You have already voted in this poll",
            noPolls: "No polls available at the moment. Check back later!",
            requestPaid: "Request Paid Poll",
            balance: "Balance",
            pollCost: "Poll Cost",
            requestTitle: "Create a Paid Poll",
            requestSubtitle: "Submit your poll for review. Admin will approve it after confirming payment.",
            questionPlaceholder: "Your Question (e.g., What is the most urgent issue in your neighborhood?)",
            optionPlaceholder: "Option",
            addOption: "Add Option",
            submitRequest: "Submit Request",
            insufficientBalance: "Insufficient balance. Please top up your wallet.",
            requestSuccess: "Request submitted! Admin will review it shortly.",
            minimumOptions: "Please provide at least 2 options.",
            maxOptions: "Maximum 5 options allowed.",
            all: "All",
            sponsoredTab: "Sponsored",
            active: "Active",
            votedTab: "Voted",
            popular: "Popular",
            newest: "Newest",
            sortBy: "Sort by",
            options: "Poll Options",
            duration: "Poll Duration",
            days: "Days",
            totalCost: "Total Cost",
        },

        // Not Found Page
        notFound: {
            title: "Page not found",
            description: "The page you are looking for does not exist.",
            goHome: "Go back home",
        },

        // Language Switcher
        language: {
            en: "EN",
            ar: "AR",
        },

        // Sidebar
        sidebar: {
            viewAll: "View All",
            reportIssue: "Report Issue",
            login: "Login",
            signup: "Sign Up",
            closeSidebar: "Close sidebar",
            openSidebar: "Open sidebar",
            darkMode: "Dark Mode",
            lightMode: "Light Mode",
            logout: "Logout",
        },

        // Authentication
        auth: {
            // Login
            login: {
                title: "Welcome back",
                subtitle: "Sign in to continue to Our Voice",
                emailPlaceholder: "Enter email or username",
                passwordPlaceholder: "Enter password",
                forgotPassword: "Forgot password?",
                continueButton: "Continue",
                signingIn: "Signing in...",
                noAccount: "Don't have an account?",
                signupLink: "Sign up",
                termsPrefix: "By continuing, you agree to our",
                terms: "Terms",
                and: "and",
                privacy: "Privacy Policy",
                signInWithGoogle: "Sign in with Google",
                or: "or",
                changeEmail: "Change",
            },
            // Forgot Password
            forgotPassword: {
                title: "Forgot your password?",
                subtitle: "Enter your email address and we'll send you a link to reset your password.",
                emailPlaceholder: "Enter your email",
                button: "Send reset link",
                loading: "Sending link...",
                backToLogin: "Back to login",
                successTitle: "Check your email",
                successSubtitle: "We've sent a password reset link to {email}",
                resetTitle: "Reset your password",
                resetSubtitle: "Enter the 6-digit code sent to {email} and your new password.",
                otpPlaceholder: "Enter 6-digit OTP code",
                newPasswordPlaceholder: "Enter new password",
                resetButton: "Reset Password",
                resettingButton: "Resetting...",
                didntReceive: "Didn't receive code?",
                changeEmail: "Change email",
            },
            // Signup
            signup: {
                title: "Welcome to Our Voice",
                subtitle: "Create your account and discover world-class civic engagement",
                namePlaceholder: "Full name",
                emailPlaceholder: "Email address",
                passwordPlaceholder: "Password (6+ characters)",
                createButton: "Create Account",
                creatingAccount: "Creating account...",
                haveAccount: "Already have an account?",
                signinLink: "Sign in",
                termsPrefix: "Creating an account means you're okay with our",
                termsOfService: "Terms of Service",
                privacyPolicy: "Privacy Policy",
                and: "and",
                notificationSettings: "Notification Settings",
                signUpWithGoogle: "Sign up with Google",
                or: "or",
            },
        },
    },

    ar: {
        common: {
            anonymous: "مجهول",
            back: "رجوع",
        },
        // Navigation
        nav: {
            home: "الرئيسية",
            issues: "المشاكل",
            polls: "استطلاعات وتصويت",
            announcements: "إعلانات",
            communityChat: "دردشة المجتمع",
            districtChat: "دردشة المناطق",
            about: "عن المنصة",
            avatar: "الصورة الشخصية",
            myProfile: "ملفي الشخصي",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            helpCenter: "مركز المساعدة",
            donate: "التبرع",
            supportPlatform: "ساهم بدعم المنصة",
            openMenu: "فتح القائمة",
            ourVoice: "صوتنا",
            login: "تسجيل الدخول",
            signup: "إنشاء حساب",
        },

        // Hero Section
        hero: {
            badge: "بدعم من المجتمع • 🇱🇧",
            title: "صوتك مهم في لبنان",
            subtitle:
                "أبلغ عن المشاكل المحلية، ادعم الآخرين بالتصويت والتعليقات، وتابع التقدم بشفافية.",
            browseIssues: "تصفح المشاكل",
            reportIssue: "أبلغ عن مشكلة",
            submitIssue: "أرسل مشكلة",
            fastSubmit: "إرسال سريع",
            transparentVotes: "تصويت شفاف",
            communityDriven: "بدعم المجتمع",
            imageAlt: "رسم توضيحي لمجتمع لبنان",
        },

        // Problems Section
        problems: {
            title: "المشاكل اليومية لا تُسمع",
            subtitle:
                "صوتنا تسهّل على المواطنين الإبلاغ عن المشاكل، ودعمها بالتصويت، وإبقائها مرئية للجميع.",
            electricity: {
                title: "انقطاع الكهرباء",
                desc: "تتبع الانقطاعات وحدد المناطق الطارئة.",
            },
            water: {
                title: "انقطاع المياه",
                desc: "أبلغ عن الانقطاعات وشارك التحديثات.",
            },
            roads: {
                title: "أضرار الطرقات",
                desc: "أشر إلى الحفر والشوارع غير الآمنة بسرعة.",
            },
            internet: {
                title: "مشاكل الإنترنت",
                desc: "وثّق مشاكل الاتصال حسب المنطقة.",
            },
        },

        // How It Works Section
        howItWorks: {
            title: "كيف تعمل المنصة",
            subtitle: "عملية بسيطة مصممة لإبقاء المشاكل مرئية وخاضعة للمساءلة.",
            steps: {
                submit: {
                    title: "أرسل مشكلة",
                    desc: "وثّق مشكلة محلية بتفاصيل واضحة.",
                },
                support: {
                    title: "دعم المجتمع",
                    desc: "المواطنون الآخرون يصوتون ويعلقون لتأكيد التأثير.",
                },
                visibility: {
                    title: "الظهور العام",
                    desc: "المشاكل تكتسب ظهوراً من خلال الاهتمام الجماعي.",
                },
                track: {
                    title: "تتبع التقدم",
                    desc: "تابع التحديثات وتغييرات الحالة بشفافية.",
                },
            },
        },

        // Stats Section
        stats: {
            reportedIssues: "مشكلة تم الإبلاغ عنها",
            communityVotes: "تصويتات مجتمعية",
            activeCitizens: "مواطنون نشطون",
            resolvedProblems: "مشكلة تم حلها",
        },

        // Trust Section
        trust: {
            title: "مبني على الثقة والشفافية",
            subtitle: "المنصة تعطي الأولوية للوضوح والإنصاف والظهور العام.",
            points: {
                community: {
                    title: "بدعم المجتمع",
                    desc: "مبني حول مشاركة المواطنين، وليس الشعبية.",
                },
                transparent: {
                    title: "شفاف",
                    desc: "التصويتات والتعليقات والتحديثات تبقى مرئية للعموم.",
                },
                independent: {
                    title: "مستقل",
                    desc: "لا أجندات خفية ولا ترويج خوارزمي.",
                },
                local: {
                    title: "تركيز محلي",
                    desc: "مصمم مع مراعاة واقع لبنان اليومي.",
                },
            },
        },

        // CTA Section
        cta: {
            title: "ابدأ بمشكلة واحدة في منطقتك.",
            p1: "صوتنا هي منصة عامة حيث يوثق المواطنون المشاكل المحلية ويبقونها مرئية مع الوقت.",
            p2: "لا ترندات. لا خوارزميات. لا ضجيج.",
            p3: "فقط مشاكل تؤثر على الحياة اليومية.",
            reportIssue: "أبلغ عن مشكلة",
            browseIssues: "تصفح المشاكل",
        },

        // Footer
        footer: {
            copyright: "صوتنا 🇱🇧 — مبني للمجتمع.",
        },

        // About Page
        about: {
            title: "عن صوتنا 🇱🇧",
            description: "لماذا توجد هذه المنصة ولمن هي.",
            p1: "صوتنا هي منصة مجتمعية تسمح للناس في لبنان برفع المشاكل المحلية، ومشاركة الأفكار، ومتابعة تقدمها.",
            p2: "الهدف هو خلق الشفافية، وتشجيع المشاركة، ومنح المواطنين طريقة بسيطة لإيصال أصواتهم.",
        },

        // Issues Page
        issues: {
            title: "المشاكل",
        },

        // Polls Page
        polls: {
            title: "استطلاعات وتصويت",
            subtitle: "شارك في استطلاعات المجتمع وعبر عن رأيك في القضايا المحلية.",
            vote: "تصويت",
            voting: "جاري التصويت...",
            voted: "تم التصويت",
            results: "النتائج",
            participants: "مشارك",
            expires: "ينتهي في",
            sponsored: "إعلان ممول",
            sponsoredAd: "إعلان ممول",
            sponsoredPoll: "استطلاع ممول",
            learnMore: "تعلم المزيد",
            participate: "شارك الآن",
            votedSuccess: "تم تسجيل تصويتك بنجاح!",
            alreadyVoted: "لقد شاركت بالفعل في هذا الاستطلاع",
            noPolls: "لا توجد استطلاعات حالياً. عد لاحقاً!",
            requestPaid: "طلب استطلاع ممول",
            balance: "الرصيد",
            pollCost: "تكلفة الاستطلاع",
            requestTitle: "إنشاء استطلاع ممول",
            requestSubtitle: "أرسل استطلاعك للمراجعة. سيقوم المسؤول بالموافقة عليه بعد تأكيد الدفع.",
            questionPlaceholder: "سؤالك (مثلاً: ما هي القضية الأكثر إلحاحاً في منطقتك؟)",
            optionPlaceholder: "خيار",
            addOption: "إضافة خيار",
            submitRequest: "إرسال الطلب",
            insufficientBalance: "رصيدك غير كافٍ. يرجى شحن محفظتك.",
            requestSuccess: "تم إرسال الطلب! سيقوم المسؤول بمراجعته قريباً.",
            minimumOptions: "يرجى تقديم خيارين على الأقل.",
            maxOptions: "الحد الأقصى 5 خيارات مسموح بها.",
            all: "الكل",
            sponsoredTab: "ممول",
            active: "نشط",
            votedTab: "تم التصويت",
            popular: "الأكثر مشاركة",
            newest: "الأحدث",
            sortBy: "ترتيب حسب",
            options: "خيارات الاستطلاع",
            duration: "مدة الاستطلاع",
            days: "أيام",
            totalCost: "التكلفة الإجمالية",
        },

        // Not Found Page
        notFound: {
            title: "الصفحة غير موجودة",
            description: "الصفحة التي تبحث عنها غير موجودة.",
            goHome: "العودة للرئيسية",
        },

        // Language Switcher
        language: {
            en: "EN",
            ar: "AR",
        },

        // Sidebar
        sidebar: {
            viewAll: "عرض الكل",
            reportIssue: "إبلاغ عن مشكلة",
            login: "تسجيل الدخول",
            signup: "إنشاء حساب",
            closeSidebar: "إغلاق القائمة الجانبية",
            openSidebar: "فتح القائمة الجانبية",
            darkMode: "الوضع الداكن",
            lightMode: "الوضع الفاتح",
            logout: "تسجيل الخروج",
        },

        // Authentication
        auth: {
            // Login
            login: {
                title: "مرحباً بعودتك",
                subtitle: "سجّل دخولك للمتابعة إلى صوتنا",
                emailPlaceholder: "أدخل البريد الإلكتروني أو اسم المستخدم",
                passwordPlaceholder: "أدخل كلمة المرور",
                forgotPassword: "نسيت كلمة المرور؟",
                continueButton: "متابعة",
                signingIn: "جاري تسجيل الدخول...",
                noAccount: "ليس لديك حساب؟",
                signupLink: "إنشاء حساب",
                termsPrefix: "بالمتابعة، أنت توافق على",
                terms: "الشروط",
                and: "و",
                privacy: "سياسة الخصوصية",
                signInWithGoogle: "تسجيل الدخول بواسطة Google",
                or: "أو",
                changeEmail: "تغيير",
            },
            // Forgot Password
            forgotPassword: {
                title: "نسيت كلمة المرور؟",
                subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور الخاصة بك.",
                emailPlaceholder: "أدخل بريدك الإلكتروني",
                button: "إرسال رابط الإعادة",
                loading: "جاري الإرسال...",
                backToLogin: "العودة لتسجيل الدخول",
                successTitle: "تحقق من بريدك الإلكتروني",
                successSubtitle: "لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى {email}",
                resetTitle: "إعادة تعيين كلمة المرور",
                resetSubtitle: "أدخل الرمز المكون من 6 أرقام المرسل إلى {email} وكلمة المرور الجديدة.",
                otpPlaceholder: "أدخل رمز التحقق المكون من 6 أرقام",
                newPasswordPlaceholder: "أدخل كلمة المرور الجديدة",
                resetButton: "تغيير كلمة المرور",
                resettingButton: "جاري التغيير...",
                didntReceive: "لم تستلم الرمز؟",
                changeEmail: "تغيير البريد الإلكتروني",
            },
            // Signup
            signup: {
                title: "مرحباً بك في صوتنا",
                subtitle: "أنشئ حسابك واكتشف المشاركة المدنية على أعلى مستوى",
                namePlaceholder: "الاسم الكامل",
                emailPlaceholder: "عنوان البريد الإلكتروني",
                passwordPlaceholder: "كلمة المرور (6 أحرف على الأقل)",
                createButton: "إنشاء حساب",
                creatingAccount: "جاري إنشاء الحساب...",
                haveAccount: "لديك حساب بالفعل؟",
                signinLink: "تسجيل الدخول",
                termsPrefix: "إنشاء حساب يعني أنك توافق على",
                termsOfService: "شروط الخدمة",
                privacyPolicy: "سياسة الخصوصية",
                and: "و",
                notificationSettings: "إعدادات الإشعارات",
                signUpWithGoogle: "إنشاء حساب بواسطة Google",
                or: "أو",
            },
        },
    },
};
export default translations;
