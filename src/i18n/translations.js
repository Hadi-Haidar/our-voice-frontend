/**
 * Translations file for Our Voice Lebanon
 * Structure: { en: {...}, ar: {...} }
 * Keys use dot notation for nested access (e.g., "hero.title")
 */

const translations = {
    en: {
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
        },

        // Hero Section
        hero: {
            badge: "Community-driven • 🇱🇧",
            title: "Your Voice Matters in Lebanon",
            subtitle:
                "Report local issues, support each other with votes and comments, and track progress transparently.",
            browseIssues: "Browse Issues",
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
        },
    },

    ar: {
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
        },

        // Hero Section
        hero: {
            badge: "بدعم من المجتمع • 🇱🇧",
            title: "صوتك مهم في لبنان",
            subtitle:
                "أبلغ عن المشاكل المحلية، ادعم الآخرين بالتصويت والتعليقات، وتابع التقدم بشفافية.",
            browseIssues: "تصفح المشاكل",
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
        },
    },
};

export default translations;
