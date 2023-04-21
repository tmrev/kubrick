import { AxiosProxyConfig } from "axios";
import proxy from "../data/proxy.json";

const createProxy = (): AxiosProxyConfig => {
  const randomIndex = Math.floor(Math.random() * proxy.length);
  const randomProxy = proxy[randomIndex];

  return {
    host: randomProxy.ip,
    port: Number(randomProxy.port),
  };
};

export default createProxy;
