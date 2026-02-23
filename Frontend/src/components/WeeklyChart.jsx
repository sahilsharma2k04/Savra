import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const WeeklyChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Weekly Activity
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="lessons" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="quizzes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="assessments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="lessons"
              stroke="#8b5cf6"
              fill="url(#lessons)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="quizzes"
              stroke="#3b82f6"
              fill="url(#quizzes)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="assessments"
              stroke="#10b981"
              fill="url(#assessments)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;