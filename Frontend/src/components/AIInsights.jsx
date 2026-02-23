const AIInsights = ({ overview }) => {
  if (!overview) return null;

  const mostActive = overview.teachers.reduce((prev, curr) =>
    prev.lessons + prev.quizzes + prev.assessments >
    curr.lessons + curr.quizzes + curr.assessments
      ? prev
      : curr
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        AI Pulse Summary
      </h2>

      <div className="space-y-4 text-sm text-gray-700">
        <div className="p-3 bg-purple-50 rounded-lg">
          {mostActive.teacherName} is the most active teacher this period.
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          Total of {overview.totals.totalLessons +
            overview.totals.totalQuizzes +
            overview.totals.totalAssessments} activities created.
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          {overview.teachers.length} teachers contributed this week.
        </div>
      </div>
    </div>
  );
};

export default AIInsights;