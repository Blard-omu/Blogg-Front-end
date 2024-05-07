import React from "react";
import Hero from "./Hero";
import Container from "react-bootstrap/Container";
import Trending from "./Trending";
import SliderComponent from "../components/SliderComponent";
import { useAuth } from "../contexts/AuthContext";
import CustomLoader from "../components/Loader";

const Home = () => {
  const { loading } = useAuth();
  // styling for the line
  const line = {
    width: "100%",
    border: "1px solid #26bdd2",
  };
  return (
    <>
      <div style={{paddingTop: '90px'}}></div>
      <Container className="container">
        <Hero />
      </Container>
      <div className="line" style={line}></div>
      <Container className="">
        {loading ? (
          <CustomLoader /> 
          // <p>loading</p>
        ) : (
          <>
            <Trending />
            <SliderComponent />
            <SliderComponent tag="Health" bg="#26d22d" />
            <SliderComponent tag="Entertainment" bg="#d2a126" />
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
