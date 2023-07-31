import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";

const NavbarParticles = (props) => {
  const options = useMemo(() => {
    return {
      background: {
        color: "#081417",
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        color: {
          value: "#00A86B",
        },
        links: {
          color: "#4CBB17",
          enable: true,
          distance: 130,
          opacity: 0.3,
        },
        move: {
          enable: true,
          speed: { min: 0.1, max: 2 },
        },
        opacity: {
          value: { min: 0.3, max: 0.4 },
        },
        size: {
          value: { min: 0.4, max: 1 },
        },
        number: {
          value: 69,
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default NavbarParticles;
