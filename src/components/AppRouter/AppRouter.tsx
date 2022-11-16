import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "../../router/routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;
