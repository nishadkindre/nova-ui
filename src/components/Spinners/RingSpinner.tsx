import React from 'react';

type SpinnerSize = 'small' | 'medium' | 'large';

// Loading spinner component
const spinnerDimensions: Record<SpinnerSize, number> = {
  small: 16,
  medium: 20,
  large: 24
} as const;

export const RingSpinner: React.FC<{ size: SpinnerSize }> = ({ size }) => {
  const dimension = spinnerDimensions[size] || spinnerDimensions.medium;
  const strokeWidth = 2;
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg width={dimension} height={dimension} viewBox={`0 0 ${dimension} ${dimension}`} style={{ display: 'block', animation: 'spin 0.8s linear infinite' }} aria-hidden="true">
      <circle
        cx={dimension / 2}
        cy={dimension / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference * 0.75 + ' ' + circumference}
        strokeDashoffset="0"
        strokeLinecap="round"
      />
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
};
