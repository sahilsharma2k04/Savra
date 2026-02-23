import { useFilters } from "../context/FilterContext";

const Header = ({ title, subtitle }) => {
  const {
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    timeRange,
    setTimeRange,
  } = useFilters();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex flex-wrap items-center gap-4">

        {/* Grade */}
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white shadow-sm"
        >
          <option>All Grades</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>

        {/* Subject */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white shadow-sm"
        >
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>Social Studies</option>
        </select>

        {/* Time Filter */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 text-sm rounded-lg ${
              timeRange === "week"
                ? "bg-white shadow-sm"
                : "text-gray-600"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 text-sm rounded-lg ${
              timeRange === "month"
                ? "bg-white shadow-sm"
                : "text-gray-600"
            }`}
          >
            This Month
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;