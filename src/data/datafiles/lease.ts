import { CaseTemplate } from "types";

export const document: CaseTemplate = {
  id: "lease3252",
  title: "Lakás bérbeadás szerződés",
  documentsCount: 3,
  status: "draft",
  createdAt: "2021-09-01",
  updatedAt: "2021-09-01",
  documentsDetails: [
    {
      url: "0_berleti_szerzodes.docx",
      title: "Lakás bérleti szerződés",
    },
    {
      url: "1_felszerelesi_targyak.docx",
      title: "Felszerelési tárgyak listája",
    },
    {
      url: "2_jegyzokonyv.docx",
      title: "Birtokbaadási jegyzőkönyv",
    },
  ],
  fieldSections: [
    {
      id: "section1",
      title: "Bérbeadó adatai",
      type: "person",
      fields: [
        {
          id: "lessorName",
          title: "Név",
          fieldType: "text",
          mandatory: true,
          placeholder: "Kiss József",
        },
        {
          id: "lessorBirthName",
          title: "Születési név",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "lessorBirthPlaceAndTime",
          title: "Születési hely és idő",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "lessorMothersName",
          title: "Anyja neve",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "lessorAddress",
          title: "Lakcím",
          fieldType: "text",
          mandatory: true,
          placeholder: "1111 Budapest, Kossuth Lajos utca 1.",
          fullWidth: true,
        },
        {
          id: "lessorPhoneNumber",
          title: "Telefonszám",
          fieldType: "text",
          mandatory: true,
          placeholder: "+36 30 123 4567",
        },
        {
          id: "lessorEmail",
          title: "E-mail cím",
          fieldType: "email",
          mandatory: true,
        },
        {
          id: "lessorBank",
          title: "Bank",
          fieldType: "text",
          mandatory: true,
          fullWidth: true,
        },
        {
          id: "lessorBankAccountNumber",
          title: "Bankszámlaszám",
          fieldType: "text",
          mandatory: true,
          fullWidth: true,
          placeholder: "12345678-12345678-12345678",
        },
      ],
    },
    {
      id: "section2",
      title: "Bérlő adatai",
      type: "person",
      fields: [
        {
          id: "lesseeName",
          title: "Név",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "lesseeBirthName",
          title: "Születési név",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "lesseeBirthPlaceAndTime",
          title: "Születési hely és idő",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "lesseeMothersName",
          title: "Anyja neve",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "lesseeAddress",
          title: "Lakcím",
          fieldType: "text",
          mandatory: true,
          placeholder: "1111 Budapest, Kossuth Lajos utca 1.",
          fullWidth: true,
        },
        {
          id: "lesseePhoneNumber",
          title: "Telefonszám",
          fieldType: "text",
          mandatory: true,
          placeholder: "+36 30 123 4567",
        },
        {
          id: "lesseeEmail",
          title: "E-mail cím",
          fieldType: "text",
          mandatory: true,
        },
      ],
    },
    {
      id: "section3",
      title: "Ingatlan adatai",
      type: "flat",
      fullWidth: true,
      fields: [
        {
          id: "flatAddress",
          title: "Cím",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "flatAddressLocalNumber",
          title: "Helyrajzi szám",
          fieldType: "text",
          mandatory: true,
          placeholder: "Budapest (belterület) 325/23142",
        },
        {
          id: "flatArea",
          title: "Alapterület",
          fieldType: "text",
          mandatory: true,
          endDecorator: "m2",
          placeholder: "34",
        },
        {
          id: "flatParentBuilding",
          title: "Társasház neve",
          fieldType: "text",
          mandatory: true,
          placeholder: "Kikerics társasház",
        },
        {
          id: "flatExtras",
          title: "Tartozik hozzá",
          fieldType: "text",
          mandatory: true,
          placeholder: "garázs, vagy tároló (nem) tartozik",
          defaultValue: "garázs, vagy tároló (nem) tartozik",
        },
        {
          id: "flatSmokingAllowed",
          title: "Jogosult a dohányzásra a bérleményben",
          fieldType: "text",
          mandatory: false,
          placeholder: "nem",
          defaultValue: "nem",
        },
        {
          id: "flatInsuranceCompany",
          title: "Biztosító",
          fieldType: "text",
          mandatory: true,
          placeholder: "Biztosító Zrt.",
        },
        {
          id: "flatInsuranceCompanyProduct",
          title: "Biztosítás neve",
          fieldType: "text",
          mandatory: true,
          placeholder: "Teljes LB",
        },
        {
          id: "flatEnergyCertificateNumber",
          title: "Energetikai tanúsítvány száma",
          fieldType: "text",
          mandatory: true,
          placeholder: "1345678",
          startDecorator: "HET-",
        },
        {
          id: "flatEnergyCertificateResult",
          title: "Energetikai besorolás",
          fieldType: "text",
          mandatory: true,
          placeholder: "BB",
        },
        {
          id: "flatEnergyCertificateResultExplanation",
          title: "Energetikai besorolás magyarázat",
          fieldType: "text",
          mandatory: true,
          placeholder: "Jó",
        },
      ],
    },
    {
      id: "section4",
      title: "Szerződés feltételei",
      fullWidth: true,
      fields: [
        {
          id: "contractStartDate",
          title: "Bérleti jogviszony kezdete",
          fieldType: "text",
          mandatory: true,
          placeholder: "2023.01.01.",
        },
        {
          id: "contractEndDate",
          title: "Bérleti idő",
          fieldType: "text",
          mandatory: true,
          placeholder: "1 éves (2024.01.01.)",
        },
        {
          id: "contractPrice",
          title: "Bérleti díj",
          fieldType: "text",
          mandatory: true,
          placeholder: "150000",
          endDecorator: "Ft",
        },
        {
          id: "contractPriceText",
          title: "Bérleti díj szöveggel",
          fieldType: "text",
          mandatory: true,
          placeholder: "egyszázötvenezer",
          endDecorator: "Ft",
        },
        {
          id: "contractPaymentDate",
          title: "Havi fizetési határidő: tárgyhónap",
          fieldType: "text",
          mandatory: true,
          placeholder: "10.",
          endDecorator: " napjáig",
          defaultValue: "10.",
        },
        {
          id: "contractFirstPaymentDate",
          title: "Törthavi, első fizetési határidő",
          fieldType: "text",
          mandatory: true,
          placeholder: "2021.01.15",
        },
        {
          id: "contractAcceptTitleDate",
          title: "Birtokba adás napja",
          fieldType: "text",
          mandatory: true,
          placeholder: "2021.01.12",
        },
        {
          id: "contractPropertyLeaveIn",
          title: "Ingatlan visszaadása a bérbeadó részére",
          fieldType: "text",
          mandatory: true,
          placeholder: "10",
          defaultValue: "10",
          endDecorator: "napon belül",
        },
      ],
    },
    {
      id: "section_5",
      title: "Költségek",
      fullWidth: true,
      fields: [
        {
          id: "costCommonCostFrom",
          title: "Közös költség fizetésének kezdő dátuma",
          fieldType: "text",
          mandatory: true,
          placeholder: "2023.02.01.",
        },
        {
          id: "costCommonCost",
          title: "Közös költség",
          fieldType: "text",
          mandatory: true,
          placeholder: "13000",
          endDecorator: "Ft/hó",
        },
        {
          id: "costElectricityCompany",
          title: "Villamos energia szolgáltató",
          fieldType: "text",
          mandatory: true,
          placeholder: "MVM Zrt.",
        },
        {
          id: "costElectricityCost",
          title: "Villamos energia díj",
          fieldType: "text",
          mandatory: true,
          placeholder: "8000",
          endDecorator: "Ft/hó",
        },
        {
          id: "costWaterCompany",
          title: "Víz szolgáltató",
          fieldType: "text",
          mandatory: true,
          placeholder: "Vízmű Zrt.",
        },
        {
          id: "costWaterCompany2",
          title: "Csatorna szolgáltató",
          fieldType: "text",
          mandatory: true,
          placeholder: "BCSM Zrt.",
        },
        {
          id: "costWaterCost",
          title: "Víz és csatorna díj",
          fieldType: "text",
          mandatory: true,
          placeholder: "12000",
          endDecorator: "Ft/hó",
        },
        {
          id: "costLatePaymentInterest",
          title: "Késedelmi kamat (%)",
          fieldType: "text",
          mandatory: true,
          placeholder: "15",
          endDecorator: "%",
          defaultValue: "15",
        },
        {
          id: "costDeposit",
          title: "Óvadék",
          fieldType: "text",
          mandatory: true,
          placeholder: "300000",
        },
        {
          id: "costDepositText",
          title: "Óvadék számmal",
          fieldType: "text",
          mandatory: true,
          placeholder: "háromszázezer",
        },
        {
          id: "costDepositEarlyTermination",
          title: "Korai felmondás, szerződésszegés esetén (havi bérleti díj)",
          fieldType: "text",
          mandatory: true,
          placeholder: "3",
          defaultValue: "3",
          endDecorator: "havi",
        },
        {
          id: "costGeneralMaintenance",
          title: "Rendes karbantartás összege",
          fieldType: "text",
          mandatory: true,
          placeholder: "30000 Ft, azaz harmincezer",
          endDecorator: "forint",
        },
        {
          id: "costDepositUse",
          title: "Óvadék felhasználás / visszatartása esetenént",
          fieldType: "text",
          mandatory: true,
          placeholder: "100.000",
          endDecorator: ",-Ft",
        },
        {
          id: "costDepositUseForCleaning",
          title: "Óvadék nem kitakarított állapot esetén",
          fieldType: "text",
          mandatory: true,
          placeholder: "75.000",
          endDecorator: ",-Ft",
        },
        {
          id: "costExtraInterest",
          title: "Jogtalan használattal kapcsolatos különleges kamat",
          fieldType: "text",
          mandatory: true,
          placeholder: "150",
          defaultValue: "150",
          endDecorator: "%",
        },
        {
          id: "costHelperCost",
          title: "Lakhatási költségtérítés",
          fieldType: "text",
          mandatory: true,
          placeholder: "80",
          defaultValue: "80",
          endDecorator: "%",
        },
      ],
    },
    {
      id: "section_dates",
      title: "Keltezés",
      fullWidth: true,
      fields: [
        {
          id: "contractSigningPlace",
          title: "Keltezés helye",
          fieldType: "text",
          mandatory: true,
          placeholder: "Budapest",
        },
        {
          id: "contractSigningDate",
          title: "Keltezés dátuma",
          fieldType: "text",
          mandatory: true,
          placeholder: "2023.01.01.",
        },
      ],
    },
  ],
};
