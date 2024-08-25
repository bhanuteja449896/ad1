// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import LoginPage from './components/LoginPage';
// import AdminPage from './components/AdminPage'; // Import the new AdminPage component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/admin" element={<AdminPage />} /> {/* Add this route */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainHome from './components/Homepage';
import Body from './components/Body';
// import Timetable from './components/Timetable'; 
import Login from './components/LoginPage';
import AdminPage from './components/AdminPage'; // Assuming this is the login component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainHome />} /> {/* Home page */}
        <Route path="/notes" element={<Body />} /> {/* Notes page */}
        {/* <Route path="/timetable" element={<Timetable />} />  */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;

