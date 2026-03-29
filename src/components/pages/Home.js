import React from 'react';
import '../../App.css';

import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Footer from '../Footer';
import MyCarousel from '../MyCarousel';
import What from '../What';


function Home() {
  return (
    <>
      <HeroSection />
      <What/>
      <Cards />
      <MyCarousel />
      <Footer />
    </>
  );
}

export default Home;