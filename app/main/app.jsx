import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Pages
import Homepage from './pages/homepage'; 
import Single from './pages/single';
import Page from './pages/page';  
import Blog from './pages/blog'; 

// Components
import Nav from './components/navigation';
import Footer from './components/footer';
import { SwiperProvider } from './components/SwiperContext';


function App() {
    return (
      <SwiperProvider>
        <div className="main_app">
          <Routes>
            <Route path="/" element={<Homepage />} />  
            <Route path="/logout" element={<Homepage />} />  
            <Route path="/blog" element={<Blog />} /> 
            <Route path="/:slug" element={<Page />} />
            <Route path="/blog/:id" element={<Single />} />
          </Routes>
          <Nav />
          <Footer />
        </div>
      </SwiperProvider> 
    );
}

export default App;