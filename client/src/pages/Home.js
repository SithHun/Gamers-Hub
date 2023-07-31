import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import GameCarousel from "../components/GameCarousel";
import SiteFooter from "../components/Footer";

const Home = () => {
  return (
    <div>
      <GameCarousel />
      <SiteFooter />
    </div>
  );
};

export default Home;
