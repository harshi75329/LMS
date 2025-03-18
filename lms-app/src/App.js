import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnrollmentForm from "./components/EnrollmentForm";
import EnrollmentList from "./components/EnrollmentList";
import "./styles/enrollmentForm.css";
import "./styles/enrollmentList.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<div className="form-page"><EnrollmentForm /></div>} 
        />
        <Route 
          path="/enrollments" 
          element={<div className="list-page"><EnrollmentList /></div>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
