const SummaryCards = ({
  totals,
  activeTeachers,
  totalActivities,
  mostActiveTeacher,
}) => {
  const cards = [
    { title: "Active Teachers", value: activeTeachers },
    { title: "Lessons Created", value: totals.totalLessons },
    { title: "Quizzes Conducted", value: totals.totalQuizzes },
    { title: "Assessments Made", value: totals.totalAssessments },
    {
      title: "Most Active Teacher",
      value: mostActiveTeacher?.teacherName || "-",
    },
  ];

  const colors = [
    "bg-purple-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-pink-50",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 border border-gray-200 shadow-sm ${colors[index]}`}
        >
          <h3 className="text-gray-600 text-sm mb-2">
            {card.title}
          </h3>
          <p className="text-2xl font-semibold text-gray-800">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;