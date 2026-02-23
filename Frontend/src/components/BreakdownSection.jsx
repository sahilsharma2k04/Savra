const BreakdownSection = ({ data }) => {
  const { totals, subjectBreakdown, classBreakdown } = data;

  return (
    <div className="space-y-8">
      {/* Totals Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Teacher Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Lessons</p>
            <p className="text-2xl font-semibold text-gray-800">
              {totals.lessons}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Quizzes</p>
            <p className="text-2xl font-semibold text-gray-800">
              {totals.quizzes}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Assessments</p>
            <p className="text-2xl font-semibold text-gray-800">
              {totals.assessments}
            </p>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Subject Breakdown
        </h2>

        <div className="space-y-3">
          {subjectBreakdown.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2 text-gray-700"
            >
              <span>{item.subject}</span>
              <span className="font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Class Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Class Breakdown
        </h2>

        <div className="space-y-3">
          {classBreakdown.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2 text-gray-700"
            >
              <span>Grade {item.class}</span>
              <span className="font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakdownSection;