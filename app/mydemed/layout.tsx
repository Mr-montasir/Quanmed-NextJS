'use client';
// MyDemed.tsx
import React from 'react'; 
import SideBar from './components/sidebar'; 
import Header from './components/header';
import DemedLayout from './demed_layout';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <DemedLayout>
      {children}
    </DemedLayout>
  )
}