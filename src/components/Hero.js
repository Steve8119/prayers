import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ onButtonClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section className="hero-section">
      <div className="prayer-background">
        <div className="floating-cross">✝</div>
        <div className="floating-dove">🕊</div>
        <div className="floating-bible">📖</div>
      </div>
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="main-title">
          Prayer Program
        </motion.h1>
        
        <motion.p variants={itemVariants} className="scripture">
          "Pray without ceasing" - 1 Thessalonians 5:17
        </motion.p>

        <motion.div variants={itemVariants} className="prayer-cards">
          <motion.div className="prayer-card">
            <h3>🙏 Daily Prayer</h3>
            <p>Join us in daily communion with God</p>
          </motion.div>
          
          <motion.div className="prayer-card">
            <h3>⭐ Weekly Fellowship</h3>
            <p>Wednesday Bible Study & Prayer</p>
          </motion.div>
          
          <motion.div className="prayer-card">
            <h3>🌅 Sunday Service</h3>
            <p>Worship with us every Sunday at 10 AM</p>
          </motion.div>
        </motion.div>

        <motion.div className="action-buttons" variants={itemVariants}>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="btn btn-salvation"
            onClick={() => onButtonClick('salvation')}
          >
            ✝ I Want to Be Saved
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="btn btn-prayer"
            onClick={() => onButtonClick('prayer')}
          >
            🙏 Prayer Request
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="btn btn-testimony"
            onClick={() => onButtonClick('testimony')}
          >
            ⭐ Share Testimony
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;