export const getMockComments = (isRTL) => [
    {
        id: 1,
        author: { name: isRTL ? "سارة ك." : "Sarah K.", image: null },
        time: isRTL ? "منذ ساعتين" : "2 hours ago",
        text: isRTL ? "تم التواصل مع البلدية بخصوص هذا الموضوع، ووعدوا بحله قريباً." : "Contacted the municipality, they promised to fix it soon.",
        upvotes: 12
    },
    {
        id: 2,
        author: { name: isRTL ? "أحمد المصلح" : "Ahmad M.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwlF19f3-amz6hue1-teltQ4K59t7PxCvyWczzVnXfSebfAB-MiQ9TjsYxII_CmaJ4fOM9E1PT1KqVUZHRNOcRQE_QIOhmpnZIvnGhxxl1W6GjJHbnabzBcAb6Jt9BxYu9nYyFWYULDcdoKkFVhtAHiK_tkSXCLSKOCuLkJZ1U37tE7CsCuetFJwC82qY3agC8ha2LPaKojU2IGZ0V8ZisX4-ou_td78zAxhrZSMZVjqPrPdncYxUMJtgsSHwX3M6vmHVHQ2yx1nDJ" },
        time: isRTL ? "منذ 4 ساعات" : "4 hours ago",
        text: isRTL ? "هذه المشكلة مستمرة منذ أسبوعين للأسف." : "Unfortunately, this issue has been ongoing for two weeks.",
        upvotes: 8
    }
];
