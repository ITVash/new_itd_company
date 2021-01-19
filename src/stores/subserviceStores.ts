import { makeAutoObservable } from "mobx";
import { serviceApi, subserviceApi } from "../api";
import { IService, ISubService } from "../Types";
import serviceStores from "./serviceStores";

class SubServiceStores {
  isLoad: boolean = false;
  subservice: ISubService[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  create = async (e: ISubService): Promise<void> => {
    try {
      const { data } = await subserviceApi.create(e);
      if (data.status === "success") {
        this.subservice.push(data.data);
        await serviceStores.fetchService();
        const service: IService[] = serviceStores.service.filter(
          (item) => item._id === data.data.serviceID
        );
        if (service.length) {
          const obj = {
            _id: service[0]._id,
            subService: [...service[0].subService!, data.data._id],
          };
          await serviceApi.update(obj);
        }
        alert("Данные сохранены!");
      }
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  };
  update = async (e: ISubService): Promise<void> => {
    try {
      const { data } = await subserviceApi.update(e);
      if (data.status === "success") {
        this.subservice = this.subservice.map((item) =>
          item._id === e._id ? (item = e) : item
        );
        //await serviceStores.fetchService()
        alert("Данные обновлены!");
      }
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  };
  delete = async (e: string): Promise<void> => {
    try {
      const { data } = await subserviceApi.delete(e);
      if (data.status === "success") {
        this.subservice = this.subservice.filter((item) => item._id !== e);
        alert("Данные удалены!");
      }
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  };
  fetchService = async (): Promise<void> => {
    try {
      const { data } = await subserviceApi.show();
      this.subservice = data.data;
      this.isLoad = true;
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  };
}

export default new SubServiceStores();
