import { useEffect, useState } from "react";
import API from "../services/api";
import { useFilters } from "../context/FilterContext";
import SummaryCards from "../components/SummaryCards";
import WeeklyChart from "../components/WeeklyChart";
import AIInsights from "../components/AIInsights";
import Header from "../components/Header";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  // Get filters from context
  const { selectedGrade, selectedSubject, timeRange } = useFilters();

  // Fetch when filters change
  useEffect(() => {
    fetchOverview();
    fetchWeekly();
  }, [selectedGrade, selectedSubject, timeRange]);

  const fetchOverview = async () => {
    try {
      const res = await API.get(
        `/overview?grade=${selectedGrade}&subject=${selectedSubject}`
      );
      setOverview(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeekly = async () => {
    try {
      const res = await API.get(
        `/weekly-trends?grade=${selectedGrade}&subject=${selectedSubject}`
      );
      setWeeklyData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Derived Metrics
  const totalActivities = overview
    ? overview.totals.totalLessons +
      overview.totals.totalQuizzes +
      overview.totals.totalAssessments
    : 0;

  const activeTeachers = overview ? overview.teachers.length : 0;

  const mostActiveTeacher = overview
    ? overview.teachers.reduce((prev, curr) =>
        prev.lessons + prev.quizzes + prev.assessments >
        curr.lessons + curr.quizzes + curr.assessments
          ? prev
          : curr
      )
    : null;

  return (
    <>
      <Header
        title="Admin Companion"
        subtitle="See what's happening across your school"
      />

      {overview && (
        <SummaryCards
          totals={overview.totals}
          activeTeachers={activeTeachers}
          totalActivities={totalActivities}
          mostActiveTeacher={mostActiveTeacher}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2">
          <WeeklyChart data={weeklyData} />
        </div>

        <AIInsights overview={overview} />
      </div>
    </>
  );
};

export default Dashboard;