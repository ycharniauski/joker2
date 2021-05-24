import { DataProvider } from "../providers/dataProvider/models/DataProvider";

let dataProvider: DataProvider;

export default {
  getDataProvider: (): DataProvider => {
    return dataProvider;
  },
  registerDataProvider: (instance: DataProvider): void => {
    dataProvider = instance;
  },
};
