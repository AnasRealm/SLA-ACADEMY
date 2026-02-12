import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../navbar/Navbar';
import VerificationBanner from '../../feature/auth/components/VerificationBanner';




const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <VerificationBanner />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;