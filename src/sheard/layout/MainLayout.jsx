import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../navbar/Navbar';



const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;