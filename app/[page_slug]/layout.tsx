"use client";
// Components
import MainPageLayout from '../main_layout';

export default function BlogPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <MainPageLayout> 
        {children}
    </MainPageLayout> 
  );
}
