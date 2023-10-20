import React from 'react';
import HeroImg from "../../assets/HomePageHero1.jpg"

export default function HeroPage() {
  return (
    <div
      className='h-screen w-full bg-cover bg-center bg-no-repeat z-[-1]'
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <h1 className=''>Find the best</h1>
      <h1>medical praticiner for you with Docifind</h1>
    </div>
  );
}
