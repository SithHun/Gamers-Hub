import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import GameCarousel from "../components/GameCarousel";
import SiteFooter from "../components/Footer";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <div>
      <GameCarousel />
      <Reviews />
      <SiteFooter />
    </div>
  );
};

export default Home;
