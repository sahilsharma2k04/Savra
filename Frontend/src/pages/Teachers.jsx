import { useEffect, useState } from "react";
import API from "../services/api";
import { useFilters } from "../context/FilterContext";
import TeacherSelector from "../components/TeacherSelector";
import WeeklyChart from "../components/WeeklyChart";
import BreakdownSection from "../components/BreakdownSection";
import Header from "../components/Header";

const Teachers = () => {
  const [overview, setOverview] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [teacherAnalysis, setTeacherAnalysis] = useState(null);

  // 🔥 Get filters from context
  const { selectedGrade, selectedSubject, timeRange } = useFilters();

  // Fetch teacher list whenever filters change
  useEffect(() => {
    fetchOverview();
  }, [selectedGrade, selectedSubject]);

  // Fetch teacher-specific data when teacher OR filters change
  useEffect(() => {
    if (selectedTeacher) {
      fetchTeacherData(selectedTeacher);
    }
  }, [selectedTeacher, selectedGrade, selectedSubject, timeRange]);

  const fetchOverview = async () => {
    try {
      const res = await API.get(
        `/overview?grade=${selectedGrade}&subject=${selectedSubject}`
      );

      setOverview(res.data);

      if (res.data.teachers.length > 0) {
        setSelectedTeacher(res.data.teachers[0].teacherId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeacherData = async (teacherId) => {
    try {
      const weeklyRes = await API.get(
        `/weekly-trends?teacherId=${teacherId}&grade=${selectedGrade}&subject=${selectedSubject}`
      );

      const analysisRes = await API.get(
        `/teacher/${teacherId}?grade=${selectedGrade}&subject=${selectedSubject}`
      );

      setWeeklyData(weeklyRes.data);
      setTeacherAnalysis(analysisRes.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header
        title="Teacher Insights"
        subtitle="Detailed analytics for individual teacher performance"
      />

      {overview && (
        <TeacherSelector
          teachers={overview.teachers}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2">
          <WeeklyChart data={weeklyData} />
        </div>

        <div className="space-y-6">
          {teacherAnalysis && (
            <BreakdownSection data={teacherAnalysis} />
          )}
        </div>
      </div>
    </>
  );
};

export default Teachers;