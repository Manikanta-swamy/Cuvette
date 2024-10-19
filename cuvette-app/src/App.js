import { Route, Routes, Navigate } from "react-router-dom";
import Welcomepage from "./components/home/Welcomepage";
import { createContext} from "react";
import { useReducer } from "react";
import PostJobs from "./components/jobs/PostJobs";
import DashboardLayout from "./components/DashboardLayout";
import JobsHome from "./components/jobs/JobsHome";
import Error404 from "./Error404";

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "register":
      return { ...state, auth: "register" };
    case "login":
      return { ...state, auth: "login" };
    default:
      return state;
  }
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {

  const initialState = {
    auth: "register", // Initial count or state can be changed according to your requirements
  };

  const [appState, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="" element={<JobsHome />} />
          <Route path="post-jobs" element={<PostJobs />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
