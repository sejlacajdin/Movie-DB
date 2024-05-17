import axios from "axios";

import config from "../config/api.config";

interface QueryParams {
  [key: string]: string | number;
}

const mapQueryParamsToUrl = (qp: QueryParams): Array<string> => {
  return Object.keys(qp).map((key: string) => {
    return `${key}=${qp[key]}`;
  });
};

const correctFormatForQueryUrl = (qp: QueryParams): string => {
  if (qp === null) {
    return "";
  }
  const qpAsStr = mapQueryParamsToUrl(qp);
  const returnValue = qpAsStr.length === 0 ? "" : `?${qpAsStr.join("&")}`;
  return returnValue;
};

const handleError = (error: any): any => {
  if (error?.response) {
    return error.response;
  } else {
    return { error: "An unknown error happened" };
  }
};

const ApiService = {
  Get: async <T extends object>(
    route: string,
    qp: QueryParams = {}
  ): Promise<T> => {
    const queryString = correctFormatForQueryUrl(qp);
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(
          `${config.apiUrl}/${route}${queryString}`
        );
        resolve(result.data);
        return result.data;
      } catch (error: any) {
        reject(handleError(error));
      }
    });
  },
  GetById: async <T extends object>(
    id: number | string,
    route: string
  ): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${config.apiUrl}/${route}/${id}`);
        resolve(result.data);
        return result.data;
      } catch (error: any) {
        reject(handleError(error));
      }
    });
  },
  Post: async <T extends object>(route: string, data: any): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.post(`${config.apiUrl}/${route}`, data);
        resolve(result.data);
        return result.data;
      } catch (error: any) {
        reject(handleError(error));
      }
    });
  },
  Update: async <T extends object>(
    id: string,
    route: string,
    data: any
  ): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.put(`${config.apiUrl}/${route}/${id}`, data);
        resolve(result.data);
        return result.data;
      } catch (error: any) {
        reject(handleError(error));
      }
    });
  },
  Delete: async <T extends object>(id: string, route: string): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.delete(`${config.apiUrl}/${route}/${id}`);
        resolve(result.data);
        return result.data;
      } catch (error: any) {
        reject(handleError(error));
      }
    });
  },
};

export default ApiService;
