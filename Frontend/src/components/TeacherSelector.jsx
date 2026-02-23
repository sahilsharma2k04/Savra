const TeacherSelector = ({
  teachers,
  selectedTeacher,
  setSelectedTeacher,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-8">
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Select Teacher
      </label>

      <select
        value={selectedTeacher || ""}
        onChange={(e) => setSelectedTeacher(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        {teachers.map((teacher) => (
          <option key={teacher.teacherId} value={teacher.teacherId}>
            {teacher.teacherName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeacherSelector;