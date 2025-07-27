import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import AboutSection from "../components/about";
import Card from "../components/card";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AboutSection />
        <Card />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
