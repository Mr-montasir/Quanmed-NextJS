"use client";
import './styles/css/combined.css';
// Components
import Nav from './main/components/navigation';
import Footer from './main/components/footer';
import { SwiperProvider } from './main/components/SwiperContext';

export default function MainPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
