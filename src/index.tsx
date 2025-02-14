import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './components/pages/AboutPage';
import HomePage from './components/pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ListeCarteIngredient from './components/ListeCarteIngredient';
import IngredientDetails from './components/IngredientDetails';
import IngredientDetailsForm from './components/IngredientDetailsForm';
import ListeCarteRecette from './components/ListeCarteRecette';
import LoginPage from './components/pages/LoginPage';
import { AuthProvider } from './components/utils/AuthContextType';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <AuthProvider>
    <BrowserRouter>
    <App />
    {/* Define Routes */}
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ingredients/:id/edit" element={<IngredientDetailsForm />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/ingredients" element={<ListeCarteIngredient />} />
          {/* <Route path="/recettes/:id/edit" element={<RecetteDetailsForm />} />
          <Route path="/recettes/:id" element={<RecetteDetails />} /> */}
          <Route path="/recettes" element={<ListeCarteRecette />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
