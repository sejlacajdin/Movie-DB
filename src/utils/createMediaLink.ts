import config from "../config/api.config";

export const createMediaLink = (path: string, size: string) =>
  `${config.imageUrl}${size}${path}`;
