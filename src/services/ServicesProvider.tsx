import { createContext, PropsWithChildren } from "react";
import { TodosServiceImpl } from "./TodosServiceImpl";
import { ServicesContextModel } from "../models/ServicesContext";

const services: ServicesContextModel = {
  todosService: new TodosServiceImpl(),
};

const ServicesContext = createContext<ServicesContextModel>(services);

const ServicesProvider = ({ children }: PropsWithChildren) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesProvider };
