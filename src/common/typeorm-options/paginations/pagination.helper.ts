export const skip = (page: number, take: number): number => {
  return (page - 1) * take || 0;
};
