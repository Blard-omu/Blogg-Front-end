import React from "react";
import Hero from "./Hero";
import Container from "react-bootstrap/Container";
import Trending from "./Trending";
import { useAuth } from "../contexts/AuthContext";
import CustomLoader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Popular from "../components/Popular";

const Home = () => {
  const { loading, auth, setAuth } = useAuth();
  const navigate = useNavigate();
  // styling for the line
  const line = {
    width: "100%",
    border: "1px solid #26bdd2",
  };

  return (
    <>
      <div style={{ paddingTop: "90px" }}></div>
      <Container className="container">
        <Hero />
      </Container>
      <div className="line" style={line}></div>
      <Container className="">
        <Trending />
        <Popular tag="sport" bg="#6726D2" />
        <Popular tag="Health care" bg="#26D22D"/>
        <Popular tag="Entertainment" bg="#D2A126"/>
      </Container>
    </>
  );
};

export default Home;

