import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CompanyLookUp } from "types/CompanyLookUp";
import { apiRoutes } from "./api-routes";

export const useGetCompanyList = (companyLookUpString: string) =>
  useQuery({
    queryKey: [companyLookUpString],
    queryFn: () =>
      axios
        .get(apiRoutes.companyLookUp, {
          params: {
            searchText: companyLookUpString,
          },
        })
        .then((res) => (res.data as CompanyLookUp).results),
    enabled: companyLookUpString.length > 2,
  });
