import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ResetPassword from "../ResetPassword/ResetPassword";

import { Provider } from "react-redux";
import storeRedux from "../../config/redux/store/store";
import Quiz from "../Quiz/Quiz";

const App = () => {
  return (
    <Provider store={storeRedux}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
