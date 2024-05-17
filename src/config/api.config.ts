const { REACT_APP_API_URL, REACT_APP_API_KEY, REACT_APP_IMAGE_URL } =
  process.env;
export class ApiConfig {
  apiUrl: string;
  apiKey: string;
  imageUrl: string;

  constructor() {
    this.apiUrl = REACT_APP_API_URL!;
    this.apiKey = REACT_APP_API_KEY!;
    this.imageUrl = REACT_APP_IMAGE_URL!;
  }
}
const config = new ApiConfig();
export default config;
