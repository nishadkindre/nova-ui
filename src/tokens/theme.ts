// Shadcn-inspired color palette for the design system
// Refined, modern, and balanced for consistent UI/UX

import { slate, zinc, gray, green, amber, yellow, sky, red } from './colors';

export const theme = {
  // Primary theme - used for main actions and highlights
  primary: {
    main: zinc[900], // Deep zinc - strong & modern
    hover: zinc[800], // Slightly lighter zinc for hover
    light: zinc[100], // Subtle zinc tint for backgrounds
    dark: zinc[950] // Deep zinc for dark backgrounds
  },

  // Secondary theme - used for less important actions
  secondary: {
    main: slate[600], // Neutral gray/blue tone
    hover: slate[700], // Darker cool gray for hover
    light: slate[200], // Light neutral gray for surfaces
    dark: slate[950] // Darker slate for dark backgrounds
  },

  // Success theme - used for success states and confirmations
  success: {
    main: green[700], // Fresh green
    hover: green[800], // Richer green on hover
    light: green[200], // Soft green background
    dark: green[950] // Darker green for dark backgrounds
  },

  // Warning theme - used for warning states and alerts
  warning: {
    main: amber[500], // Amber / modern warning yellow
    hover: amber[600], // Deeper amber
    light: yellow[200], // Light warm yellow background
    dark: yellow[950] // Darker yellow for dark backgrounds
  },

  // Info theme - used for informational states and messages
  info: {
    main: sky[600], // Light blue - main info color
    hover: sky[700], // Darker light blue for hover states
    light: sky[200], // Very light blue for info backgrounds
    dark: sky[950] // Darker sky blue for dark backgrounds
  },

  // Danger theme - alias for error theme to match API requirements
  danger: {
    main: red[700], // Modern red
    hover: red[800], // Stronger red for hover states
    light: red[200], // Light red background for alerts
    dark: red[950] // Darker red for dark backgrounds
  },

  // Text theme - used for all text content
  text: {
    primary: slate[900], // Deep slate for high contrast text
    secondary: slate[600] // Muted slate for secondary text
  },

  // Border theme - used for component borders
  border: {
    default: slate[200], // Light neutral gray border
    focus: slate[900], // Slate accent for focus
    error: red[700] // Red for error borders
  },

  // Background theme - used for component backgrounds
  background: {
    white: '#fff', // Pure white
    black: '#000', // Pure black
    light: slate[50], // Light neutral gray for surfaces
    dark: slate[950], // Darker slate for dark backgrounds
    gray: slate[50], // Light neutral gray for surfaces
    transparent: 'transparent' // Transparent background
  }
};
