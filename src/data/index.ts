import { documents } from "./datafiles";
//generate a function that imports the lease.ts from datafiles folder and create an exporter function that filters by input id

export const getData = (id: string) => {
  const data = documents.find((item) => item.id === id);
  return data;
};
