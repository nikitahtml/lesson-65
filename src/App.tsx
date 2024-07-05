import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Page from './pages/Page';
import Admin from './pages/Admin';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/pages/:pageName" element={<Page />} />
                <Route path="/pages/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;
