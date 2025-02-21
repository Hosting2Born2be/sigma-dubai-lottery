export const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom },
    }),
  };
  
  export const fadeInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom },
    }),
  };
  