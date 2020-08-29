import React, {PropsWithChildren, useContext} from 'react';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';


const axiosConfig : AxiosRequestConfig = {
  baseURL : 'https://api.pupple.me',
  headers: {
    'Content-Type' : 'application/json',
  },
  withCredentials: false,
};

const axiosInstance : AxiosInstance = axios.create(axiosConfig)

export const axiosContext = React.createContext<AxiosInstance>(axiosInstance);

export function useApi() : AxiosInstance {
  return useContext(axiosContext)
}

const ApiProvider : React.FC<PropsWithChildren<{}>> = ({children}) => {


  return (
    <axiosContext.Provider value={axiosInstance}>{children}</axiosContext.Provider>
  );
};

export default ApiProvider;
