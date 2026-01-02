import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function LoginParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      className="absolute inset-0 z-0"
    options={{
  fullScreen: false,
  background: {
    color: "transparent",
  },

  detectRetina: true,

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400, 
        links: {
          opacity: 1, 
        },
      },
      push: {
        quantity: 4,
      },
    },
  },

  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800,
      },
    },

    color: {
      value: "#a3e635", // lime-700
    },

    shape: {
      type: "circle",
    },

    opacity: {
      value: 0.5,
    },

    size: {
      value: { min: 1, max: 3 },
      random: true,
    },

    links: {
      enable: true,
      distance: 150,
      color: "#4d7c0f",
      opacity: 0.6,
      width: 1.2, // thicker lines
    },

    move: {
      enable: true,
      speed: 1, 
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
}}
    />
  );
}
