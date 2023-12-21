export const setBgColor = (index) => {
  const colors = ['blue.400', 'red.400', 'green.400', 'yellow.400', 'purple.400', 'pink.400'];
  return colors[index % colors.length];
};
