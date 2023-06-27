import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Main from './components/Main';
import reportWebVitals from './components/reportWebVitals';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter baseline="/">
    <Routes>
    <Route path='/' element={<App />} />
    <Route path='/more' element={<Main />} />
    </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
