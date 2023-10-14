import React from "react";
import Hero from "./Hero";
import Container from "react-bootstrap/Container";
import Trending from "./Trending";
import SliderComponent from "./SliderComponent";

const Home = () => {
  // styling for the line
  const line = {
      width: '100%',
      border: '1px solid #26bdd2'
  }
  return (
    <>
      <div className="line" style={line}></div>
      <Container className="">
        <Hero />
      </Container>
      <div className="line" style={line}></div>
      <Container className="">
        <Trending />
        <SliderComponent/>
        <SliderComponent tag="Health" bg="#26d22d"/>
        <SliderComponent tag="Entertainment" bg="#d2a126"/>
      </Container>
    </>
  );
};

export default Home;
