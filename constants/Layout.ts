interface LayoutType {
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  padding: {
    horizontal: number;
    vertical: number;
  };
}

export const Layout: LayoutType = {
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  padding: {
    horizontal: 0.8,
    vertical: 16,
  },
};
