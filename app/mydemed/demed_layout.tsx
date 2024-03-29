'use client';
// MyDemed.tsx
import React from 'react'; 
import SideBar from './components/sidebar'; 
import Header from './components/header'; 

export default function DemedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div id="root"> 
      <div className="quanmed_dashboard_app">
        <SideBar />
        <div className="routes_container">
          <Header />
          {children}
        </div>
      </div> 
    </div>
  )
}