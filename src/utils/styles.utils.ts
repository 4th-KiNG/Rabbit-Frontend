export const isMobile = (): boolean => {
  return document.documentElement.clientWidth <= 700;
};

export const isMobileSettings = (): boolean => {
  return document.documentElement.clientWidth <= 475;
};