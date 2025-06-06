const getWinRate = (stats) => {
  const { wins = 0, losses = 0, draws = 0 } = stats || {};
  const totalGames = wins + losses + draws;

  if (totalGames === 0) return "N/A";

  const winRate = (wins / totalGames) * 100;
  return `${winRate.toFixed(1)}%`;
};

export default getWinRate;
