import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/Teachers";
import Reports from "./pages/Reports";
import Classrooms from "./pages/Classrooms";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";

const AppRoutes = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      {!isAuth ? (
        <Login />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classrooms" element={<Classrooms />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
};

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <AppRoutes />
      </FilterProvider>
    </AuthProvider>
  );
}

export default App;