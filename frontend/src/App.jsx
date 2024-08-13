import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import Grid from "@mui/material/Grid";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import { WorkersStatusPage } from "./pages/WorkersStatusPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback"; // Import the fallback component

function App() {
  const [token, setToken] = useState(
    sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null,
  );
  // const [token] = useState(() => sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      console.log(token);
    }
  }, [token]);
  return (
    <Router>
      <Grid className=".app-container">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // Optionally reset any global state here
          }}
        >
          <Routes>
            <Route path="/" element={<LoginPage setToken={setToken} />} />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route
              path="/workers_status"
              element={
                token ? (
                  <WorkersStatusPage setToken={setToken} />
                ) : (
                  <LoginPage setToken={setToken} />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </Grid>
    </Router>
  );
}

export default App;
