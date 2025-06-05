const baseUrl = process.env.REACT_APP_API_URL;

const urls = {
  ROOT: `${baseUrl}/v1`,
  AUTH: `${baseUrl}/v1/auth`,
  PLAYER: `${baseUrl}/v1/players`,
  GAME: `${baseUrl}/v1/games`,
};

export default urls;
