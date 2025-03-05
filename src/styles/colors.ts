export const colors = {
  // Brand Colors
  primary: {
    DEFAULT: '#1f2f5c', // Dark blue
    hover: '#1a2849',
    light: '#2a3f7a',
  },
  secondary: {
    DEFAULT: '#1eb5b6', // Teal
    hover: '#1a9fa0',
    light: '#23cccd',
  },
  background: {
    DEFAULT: '#fdfdfe', // White
    secondary: '#f8f9fc', // Light gray
  },
  // UI Colors
  text: {
    primary: '#1f2f5c',
    secondary: '#64748b',
    light: '#94a3b8',
  },
  border: {
    DEFAULT: '#e2e8f0',
    focus: '#1eb5b6',
  },
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }
} as const;

// Utility function to get color with opacity
export function withOpacity(color: string, opacity: number): string {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
} 