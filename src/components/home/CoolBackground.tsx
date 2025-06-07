import React from 'react';
import styled, { keyframes, css } from 'styled-components'; // Import styled and keyframes

interface CoolBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

// --- Keyframe Animations ---

// Watery bubble-like flow animation
const bubbleFlow = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200px 300px; /* Adjust values to change direction and speed */
  }
`;

// Twinkling stars animation
const starTwinkle = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 0.3; /* Stars fade more to create a clearer twinkle */
    transform: scale(0.9); /* Slightly shrink */
  }
`;

// --- Styled Components ---

const StyledCoolBackgroundContainer = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  z-index: 0;
  /* Apply the passed className here */
  ${(props: CoolBackgroundProps) => props.className && css`${props.className}`}
`;

const GradientBase = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse at 50% 50%, #f0f8ff 0%, #e0f2f7 40%, #d0eff7 100%); /* Lighter, watery base */
`;

const RingContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

// Helper to create individual ring styles using CSS prop from styled-components
const Ring = styled.div<{ size: number; opacity: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${props => props.size}vw;
  height: ${props => props.size}vw;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, ${props => props.opacity}); /* White borders */
  opacity: ${props => props.opacity};
  filter: blur(${props => props.size / 50}px); /* Subtle blur for softness */
`;

const WateryBubblesOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 60%),
    radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 70%),
    radial-gradient(circle at 40% 5%, rgba(255, 255, 255, 0.12) 0%, transparent 65%),
    radial-gradient(circle at 90% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 75%),
    radial-gradient(circle at 20% 90%, rgba(255, 255, 255, 0.13) 0%, transparent 60%);
  background-repeat: repeat;
  background-size: 150px 150px, 120px 120px, 180px 180px, 100px 100px, 160px 160px;
  animation: ${bubbleFlow} 40s linear infinite; /* Apply the keyframe animation */
  pointer-events: none;
  z-index: 1;
`;

const StarOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: transparent;
  pointer-events: none;
  z-index: 2;
  box-shadow:
    10px 20px 0 0.5px rgba(255, 255, 255, 0.7),
    50px 70px 0 0.2px rgba(255, 255, 255, 0.9),
    90px 10px 0 0.6px rgba(255, 255, 255, 0.5),
    120px 50px 0 0.3px rgba(255, 255, 255, 0.8),
    150px 90px 0 0.7px rgba(255, 255, 255, 0.6),
    180px 30px 0 0.4px rgba(255, 255, 255, 0.9),
    220px 80px 0 0.5px rgba(255, 255, 255, 0.7),
    250px 20px 0 0.8px rgba(255, 255, 255, 0.5),
    280px 60px 0 0.3px rgba(255, 255, 255, 0.8),
    300px 100px 0 0.6px rgba(255, 255, 255, 0.9),
    350px 15px 0 0.2px rgba(255, 255, 255, 0.7),
    380px 95px 0 0.5px rgba(255, 255, 255, 0.6),
    420px 40px 0 0.7px rgba(255, 255, 255, 0.8),
    450px 110px 0 0.4px rgba(255, 255, 255, 0.5),
    480px 5px 0 0.8px rgba(255, 255, 255, 0.9),
    500px 75px 0 0.3px rgba(255, 255, 255, 0.7),
    530px 30px 0 0.6px rgba(255, 255, 255, 0.6),
    560px 100px 0 0.9px rgba(255, 255, 255, 0.8),
    600px 50px 0 0.5px rgba(255, 255, 255, 0.7),
    620px 120px 0 0.3px rgba(255, 255, 255, 0.9),
    650px 80px 0 0.6px rgba(255, 255, 255, 0.5),
    680px 25px 0 0.4px rgba(255, 255, 255, 0.8),
    710px 90px 0 0.7px rgba(255, 255, 255, 0.6);
    /* Add many, many more lines for a dense star field */
  animation: ${starTwinkle} 4s ease-in-out infinite alternate; /* Apply the keyframe animation */
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const CoolBackground: React.FC<CoolBackgroundProps> = ({ children, className = '' }) => {
  return (
    <StyledCoolBackgroundContainer className={className}>
      <GradientBase>
        {/* Concentric Rings (now white arcs) Layer */}
        <RingContainer>
          <Ring size={120} opacity={0.6} />
          <Ring size={90} opacity={0.4} />
          <Ring size={60} opacity={0.2} />
        </RingContainer>

        {/* Watery Bubble-like Motion Overlay Layer */}
        <WateryBubblesOverlay />

        {/* Stars Overlay Layer */}
        <StarOverlay />
      </GradientBase>

      {/* Content */}
      <ContentWrapper>{children}</ContentWrapper>
    </StyledCoolBackgroundContainer>
  );
};

export default CoolBackground;