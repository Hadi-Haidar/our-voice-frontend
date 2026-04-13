export const pollsMock = [
  {
    id: "p1",
    type: "poll",
    question_en: "How satisfied are you with local waste management services?",
    question_ar: "ما مدى رضاك عن خدمات إدارة النفايات المحلية؟",
    options: [
      { id: "o1", text_en: "Very satisfied", text_ar: "راضي جداً", votes: 45 },
      { id: "o2", text_en: "Satisfied", text_ar: "راضي", votes: 30 },
      { id: "o3", text_en: "Neutral", text_ar: "محايد", votes: 20 },
      { id: "o4", text_en: "Unsatisfied", text_ar: "غير راضي", votes: 5 },
    ],
    total_participants: 100,
    is_voted: false,
    is_sponsored: false,
    expires_at: "2026-05-12T00:00:00Z",
    created_at: "2026-04-10T10:00:00Z"
  },
  {
    id: "p2",
    type: "poll",
    is_sponsored: true,
    question_en: "Which new feature would you like us to add next?",
    question_ar: "ما هي الميزة الجديدة التي تود أن نضيفها لاحقاً؟",
    options: [
      { id: "o5", text_en: "Mobile App (iOS/Android)", text_ar: "تطبيق موبايل", votes: 60 },
      { id: "o6", text_en: "SMS Notifications", text_ar: "إشعارات SMS", votes: 15 },
      { id: "o7", text_en: "Online Payments", text_ar: "دفع أونلاين", votes: 25 },
    ],
    total_participants: 250,
    is_voted: false,
    is_sponsored: true,
    expires_at: "2026-06-01T00:00:00Z",
    created_at: "2026-04-11T09:00:00Z"
  },
  {
    id: "p3",
    type: "poll",
    question_en: "Should the municipality prioritize street lighting or park maintenance this summer?",
    question_ar: "هل يجب على البلدية إعطاء الأولوية لإنارة الشوارع أم لصيانة الحدائق هذا الصيف؟",
    options: [
      { id: "o8", text_en: "Street Lighting", text_ar: "إنارة الشوارع", votes: 85 },
      { id: "o9", text_en: "Park Maintenance", text_ar: "صيانة الحدائق", votes: 40 },
    ],
    total_participants: 125,
    is_voted: true,
    voted_option_id: "o8",
    is_sponsored: false,
    expires_at: "2026-04-30T00:00:00Z",
    created_at: "2026-04-12T08:00:00Z"
  }
];
