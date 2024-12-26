export const MAX_LEVEL = 8;

const getNextLevel = (currentLevel: number, isSuccess: boolean) => {
  if (isSuccess) {
    if (currentLevel === MAX_LEVEL) {
      return MAX_LEVEL;
    }
    return currentLevel + 1;
  }
  if (currentLevel === 0) {
    return 0;
  }
  return currentLevel - 1;
};

export default getNextLevel;
