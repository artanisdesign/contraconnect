import { CaseTemplate } from "types";

export const document: CaseTemplate = {
  id: "bid",
  title: "Vételi ajánlat",
  documentsCount: 2,
  status: "draft",
  createdAt: "2021-09-01",
  updatedAt: "2021-09-01",
  documentsDetails: [
    {
      url: "0_azonositasi_adatlap.docx",
      title: "Azonosítási adatlap, Tényleges tulajdonos",
    },
    {
      url: "1_adatkerolap.docx",
      title: "Adatkérő lap személyes adatok kezeléséhez",
    },
  ],
  fieldSections: [
    {
      id: "seller-info",
      title: "Eladó adatai",
      fullWidth: true,
      fields: [
        {
          id: "sellerPersonOrCompany",
          title: "Az eladó:",
          fieldType: "radiogroup",
          mandatory: true,
          resetOnChange: true,
          fullWidth: true,
          options: [
            {
              value: "person",
              label: "Természetes személy",
            },
            {
              value: "company",
              label: "Jogi személy",
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      id: "section2",
      title: "Eladó személyes adatai",
      type: "person",
      fullWidth: true,
      visibleState: ["sellerPersonOrCompany"],
      visibleCondition: "person",
      fields: [
        {
          id: "SellerName",
          title: "Eladó teljes neve",
          fieldType: "text",
          mandatory: true,
          placeholder: "Kiss József",
        },
        {
          id: "SellerTaxID",
          title: "Adóazonosító jele",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "SellerPID",
          title: "Személyi azonosító",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "SellerEmail",
          title: "Email címe",
          fieldType: "text",
          mandatory: true,
          placeholder: "email@email.hu",
        },
        {
          id: "SellerBankAccountNR",
          title: "Bankszámla száma",
          fieldType: "text",
          mandatory: true,
          placeholder: "12345678-12345678-12345678",
        },
      ],
    },
    {
      id: "section2company",
      title:
        "Jogi személy vagy jogi személyiséggel nem rendelkező szervezet adatai",
      visibleState: ["personOrCompany"],
      visibleCondition: "company",
      type: "company",
      //fullWidth: true,
      fields: [
        {
          id: "companyName",
          title: "Név",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "companyAddress",
          title: "Székhely",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "companyBusinessType",
          title: "Fő tevékenységi kör",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "companyRegistrationNumber",
          title: "Cégjegyzékszám / nyilvántartási szám",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "companyTaxNumber",
          title: "Adószám",
          fieldType: "text",
          mandatory: true,
          placeholder: "13246849",
        },
      ],
    },
  ],
};
