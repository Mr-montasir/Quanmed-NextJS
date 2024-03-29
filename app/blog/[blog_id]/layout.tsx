"use client";
// Components
import Nav from '../../main/components/navigation';
import Footer from '../../main/components/footer';
import { SwiperProvider } from '../../main/components/SwiperContext';
import MainPageLayout from '../../main_layout';

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
};
