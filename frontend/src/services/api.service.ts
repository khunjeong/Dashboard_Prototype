import axios, { AxiosResponse } from "axios";

class ApiService {
  get endPoint() {
    return process.env.END_POINT;
    // return 'http://localhost:3000'
  }

  constructor() {
    console.log("[Api Service] constructor", process.env.END_POINT);
  }

  getEnvironmentDatas(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      axios
        .get(`${this.endPoint}/api/environment`)
        .then((res: AxiosResponse) => {
          if (res.data.success) {
            resolve(res.data.environments);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getVisitorDatas(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      axios
        .get(`${this.endPoint}/api/visitor`)
        .then((res: AxiosResponse) => {
          if (res.data.success) {
            resolve(res.data.visitors);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getVisitorDatasZone(zone: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      axios
        .get(`${this.endPoint}/api/zone/${zone}`)
        .then((res: AxiosResponse) => {
          if (res.data.success) {
            resolve(res.data.visitors);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const apiService = new ApiService();

export default apiService;
