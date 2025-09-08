import React from 'react';

type SpinnerSize = 'small' | 'medium' | 'large';

const dimensions: Record<
  SpinnerSize,
  {
    width: string;
    height: string;
    leafWidth: string;
    leafHeight: string;
    radius: string;
  }
> = {
  small: { width: '16px', height: '16px', leafWidth: '2px', leafHeight: '6px', radius: '8px' },
  medium: { width: '18px', height: '18px', leafWidth: '2px', leafHeight: '7px', radius: '9px' },
  large: { width: '20px', height: '20px', leafWidth: '2.5px', leafHeight: '8px', radius: '10px' }
};

// Loading spinner component (radix-ui inspired)
export const LineSpinner: React.FC<{ size: SpinnerSize }> = ({ size }) => {
  const { width, height, leafWidth, leafHeight, radius } = dimensions[size];

  const spinnerStyles: React.CSSProperties = {
    width,
    height,
    position: 'relative',
    display: 'inline-block'
  };

  const leafStyles: React.CSSProperties = {
    position: 'absolute',
    width: leafWidth,
    height: leafHeight,
    backgroundColor: 'currentColor',
    borderRadius: `calc(${leafWidth} / 2)`,
    transformOrigin: `center ${radius}`,
    opacity: 0.2,
    animation: 'fade 1s linear infinite'
  };

  // Generate 8 leafs with different rotations and delays
  const leafs = Array.from({ length: 8 }, (_, index) => {
    const rotation = index * 45; // 0, 45, 90, 135, 180, 225, 270, 315 degrees
    const delay = -(index * 0.125); // -0, -0.125, -0.25, -0.375, -0.5, -0.625, -0.75, -0.875 seconds

    const leafStyle: React.CSSProperties = {
      ...leafStyles,
      transform: `rotate(${rotation}deg)`,
      animationDelay: `${delay}s`
    };

    return <div key={index} style={leafStyle} />;
  });

  return (
    <div style={spinnerStyles}>
      {leafs}
      <style>{`
        @keyframes fade {
          0% { opacity: 0.2; }
          12.5% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};
