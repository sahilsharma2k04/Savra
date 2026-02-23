import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [timeRange, setTimeRange] = useState("week");

  return (
    <FilterContext.Provider
      value={{
        selectedGrade,
        setSelectedGrade,
        selectedSubject,
        setSelectedSubject,
        timeRange,
        setTimeRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);