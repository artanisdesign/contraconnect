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
      url: "1_Vételi szándéknyilatkozat SIMPLE.docx",
      title: "Vételi szándéknyilatkozat",
    },
    {
      url: "2_adasveteli_szerzodes.docx",
      title: "Adásvételi szerződés",
    }
  ],
  fieldSections: [
    {
      id: "seller-info",
      title: "Eladó adatai",
      fullWidth: true,
      fields: [
        {
          id: "sellerIs",
          title: "Az eladó:",
          fieldType: "radiogroup",
          mandatory: true,
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
      visibleState: ["sellerIs"],
      visibleCondition: "person",
      fields: [
        {
          id: "SellerName",
          title: "Eladó teljes neve",
          fieldType: "text",
          mandatory: true,
          placeholder: "Kiss József",
          preLoadValues: [
            "Nagy Beáta",
            "Kokcsik Béla",
            "Kiss József",
            "Kiss Józsefné",
            "Péteri János",
          ],
        },
        {
          id: "SellerTaxID",
          title: "Adóazonosító jele",
          fieldType: "text",
          mandatory: false,
          preLoadValues: ["12345678-1-12", "12345678-1-13", "12345678-1-14"],
        },
        {
          id: "SellerPID",
          title: "Személyi azonosító",
          fieldType: "text",
          mandatory: false,
          preLoadValues: ["123456AB", "123456AC", "123456AD"],
        },
        {
          id: "SellerIDCardNumber",
          title: "Személyi igazolvány száma",
          fieldType: "text",
          mandatory: false,
          preLoadValues: ["12345678", "12345679", "12345680"],
        },
        {
          id: "SellerAddressCardNumber",
          title: "Lakcímkártya száma",
          fieldType: "text",
          mandatory: false,
          preLoadValues: ["12345678", "12345679", "12345680"],
        },
        {
          id: "SellerEmail",
          title: "Email címe",
          fieldType: "text",
          mandatory: true,
          placeholder: "email@email.hu",
          preLoadValues: [
            "eladomahazam@gmail.com",
            "marika35@gmail.com",
            "jozsikerlek@gmail.com",
            "piri462@gmail.com",
          ],
        },
        {
          id: "SellerPhone",
          title: "Telefonszáma",
          fieldType: "text",
          mandatory: false,
          placeholder: "+36 30 123 4567",
          preLoadValues: [
            "+36 30 123 4567",
            "+36 30 123 4568",
            "+36 30 123 4569",
          ],
        },
        {
          id: "SellerBankAccountNR",
          title: "Bankszámla száma",
          fieldType: "text",
          mandatory: false,
          placeholder: "12345678-12345678-12345678",
          preLoadValues: [
            "12345678-12345678-12345678",
            "12345678-12345678-12345679",
            "12345678-12345678-12345680",
          ],
        },
      ],
    },
    {
      id: "buyer-info",
      title: "Vevő adatai",
      fullWidth: true,
      fields: [
        {
          id: "buyerIs",
          title: "A vevő:",
          fieldType: "radiogroup",
          mandatory: true,
          fullWidth: true,
          options: [
            {
              value: "person",
              label: "Természetes személy",
              disabled: true,
            },
            {
              value: "company",
              label: "Jogi személy",
            },
          ],
        },
      ],
    },
    {
      id: "buyer-company",
      title:
        "Jogi személy vagy jogi személyiséggel nem rendelkező szervezet adatai",
      visibleState: ["buyerIs"],
      visibleCondition: "company",
      type: "company",
      fullWidth: true,
      fields: [
        {
          id: "BuyerName",
          title: "Vevő neve",
          fieldType: "text",
          mandatory: true,
          preLoadValues: [
            "Nagy Kft.",
            "Kokcsik Bt.",
            "Kiss Kft.",
            "Kiss Kft.",
            "Péteri Kft.",
          ],
        },
        {
          id: "BuyerRegistrationNR",
          title: "Nyilvántartási (cégjegyzék) száma:",
          fieldType: "text",
          mandatory: true,
          preLoadValues: ["12345678", "12345679", "12345680"],
        },
        {
          id: "BuyerRepName",
          title: "Képviseli",
          fieldType: "text",
          mandatory: true,
          placeholder: "Kiss József",
          preLoadValues: ["Numi Beáta", "Koli Béla"],
        },
        {
          id: "BuyerRepPosition",
          title: "Képviselő poziciója",
          fieldType: "text",
          mandatory: false,
          placeholder: "ügyvezető",
          preLoadValues: ["ügyvezető", "tulajdonos"],
        },
        {
          id: "BuyerPID",
          title: "Képviselő személyi azonosító",
          fieldType: "text",
          mandatory: true,
          preLoadValues: ["123456AB", "123456AC", "123456AD"],
        },
        {
          id: "BuyerRepIDCardNumber",
          title: "Képviselő személyi igazolvány száma",
          fieldType: "text",
          mandatory: true,
          preLoadValues: ["712345678", "712345679", "712345680"],
        },
        {
          id: "BuyerRepAddressCardNumber",
          title: "Képviselő lakcímkártya száma",
          fieldType: "text",
          mandatory: true,
          preLoadValues: ["312345678", "312345679", "312345680"],
        },
        {
          id: "BuyerEmail",
          title: "Email címe",
          fieldType: "text",
          mandatory: true,
          placeholder: "email@email.com",
          preLoadValues: ["ceg@info.com"],
        },
        {
          id: "BuyerPhone",
          title: "Telefonszáma",
          fieldType: "text",
          mandatory: true,
          placeholder: "+36 30 123 4567",
          preLoadValues: ["+36 30 123 4567"],
        },
      ],
    },
    {
      id: "real-estate-info",
      title: "Ingatlan adatai",
      fullWidth: true,
      fields: [
        {
          id: "REAddress",
          title: "Ingatlan címe",
          fieldType: "text",
          mandatory: true,
          preLoadValues: [
            "Kossuth Lajos utca 1.",
            "Kossuth Lajos utca 2.",
            "Béla Lajos utca 3.",
            "Kossuth Lajos utca 4.",
          ],
        },
        {
          id: "City",
          title: "Település",
          fieldType: "text",
          mandatory: true,
          preLoadValues: [
            "Budapest",
            "Kaposvár",
            "Debrecen",
            "Szeged",
            "Miskolc",
          ],
        },
        {
          id: "ToplotNR",
          title: "Helyrajzi szám",
          fieldType: "text",
          mandatory: true,
          preLoadValues: ["12345678", "12345679", "12345680"],
        },
        {
          id: "ReRatioNR1",
          title: "Tulajdoni hányad",
          fieldType: "text",
          mandatory: true,
          placeholder: "1/1",
          defaultValue: "1/1",
          disabled: true,
        },
        {
          id: "REType",
          title: "Megnevezés tulajdoni lapon",
          fieldType: "select",
          mandatory: true,
          defaultValue: "apartment",
          options: [
            {
              value: "apartment",
              label: "lakás",
            },
            {
              value: "house",
              label: "kivett lakóház, udvar",
              disabled: true,
            },
            {
              value: "storage",
              label: "tároló",
              disabled: true,
            },
            {
              value: "garage",
              label: "teremgarázs",
              disabled: true,
            },
            {
              value: "plot",
              label: "kivett, beépítetlen terület",
              disabled: true,
            },
            {
              value: "office",
              label: "iroda",
              disabled: true,
            },
            {
              value: "businessplace",
              label: "üzlethelyiség",
              disabled: true,
            },
            {
              value: "other",
              label: "egyéb",
              disabled: true,
            },
          ],
        },
        {
          id: "FloorArea",
          title: "Alapterület (m2)",
          fieldType: "text",
          mandatory: true,
          endDecorator: "m2",
          placeholder: "76",
          preLoadValues: ["76", "77", "78"],
        },
        {
          id: "hasPreNote",
          title: "Széljegy",
          fieldType: "select",
          mandatory: true,
          defaultValue: "no",
          options: [
            {
              value: "no",
              label: "Nincs széljegy",
            },
            {
              value: "tul-be",
              label: "Tulajdonjog bejegyzési kérelem",
              disabled: true,
            },
            {
              value: "mort-be",
              label: "Jelzálog bejegyzési kérelem",
              disabled: true,
            },
            {
              value: "other",
              label: "Egyéb",
              disabled: true,
            },
          ],
        },
        {
          id: "hasEncumbrance",
          title: "Teher",
          fieldType: "select",
          mandatory: true,
          defaultValue: "no",
          options: [
            {
              value: "no",
              label: "Tehermentes",
            },
            {
              value: "mortgage",
              label: "Jelzálog",
              disabled: true,
            },
            {
              value: "no-sell",
              label: "Elidegenítési és/vagy terhelési tilalom",
              disabled: true,
            },
            {
              value: "no-sell1",
              label: "Végrehajtási jog",
              disabled: true,
            },
            {
              value: "no-sell2",
              label: "Haszonélvezeti jog",
              disabled: true,
            },
            {
              value: "no-sell3",
              label: "Elővásárlási jog",
              disabled: true,
            },
            {
              value: "no-sell4",
              label: "Tulajdonjog-fenntartással történt eladás ténye",
              disabled: true,
            },
            {
              value: "buyback",
              label: "Vételi jog",
              disabled: true,
            },
            {
              value: "sellback",
              label: "Eladási jog",
              disabled: true,
            },
            {
              value: "rebuy",
              label: "Visszavásárlási jog",
              disabled: true,
            },
            {
              value: "other",
              label: "Egyéb (szabad szavas)",
              disabled: true,
            },
          ],
        },
        {
          id: "RECondition",
          title: "Lakóingatlan állapota",
          fieldType: "select",
          mandatory: true,
          defaultValue: "good",
          options: [
            {
              value: "perfect",
              label: "Kiváló",
            },
            {
              value: "good",
              label: "Jó",
            },
            {
              value: "medium",
              label: "Közepes",
            },
            {
              value: "mustrenovate",
              label: "Felújítandó",
            },
            {
              value: "mustdemolish",
              label: "Bontandó",
            },
          ],
        },
        {
          id: "EnergyCertificateNR",
          title: "Energetikai tanúsítvány száma",
          fieldType: "text",
          mandatory: false,
          placeholder: "123456789",
        },
        {
          id: "hasOccupant",
          title: "Ingatlan kinek a birtokában van?",
          fieldType: "select",
          mandatory: false,
          defaultValue: "no",
          options: [
            {
              value: "no",
              label: "Eladó",
            },
            {
              value: "tul-be",
              label: "Bérlő",
              disabled: true,
            },
            {
              value: "tt",
              label: "Haszonélvező",
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      id: "priceandfinancing",
      title: "Vételár - finanszírozás",
      fullWidth: true,
      fields: [
        {
          id: "PurchasePrice",
          title: "Teljes vételár",
          fieldType: "text",
          endDecorator: "Ft",
          mandatory: true,
          preLoadValues: ["10000000", "11000000", "12000000"],
        },
        {
          id: "PurchaseSecureDep",
          title: "Ajánlati biztosítékot ad (ingatlanosnál leteszi)?",
          fieldType: "select",
          mandatory: true,
          defaultValue: "yes",
          options: [
            {
              value: "yes",
              label: "Igen",
            },
            {
              value: "no",
              label: "Nem",
              disabled: true,
            },
          ],
        },
        {
          id: "BidSecAmount",
          title: "Ajánlati biztosíték összege",
          fieldType: "text",
          mandatory: true,
          helperText: "Beleszámít a foglalóba",
          endDecorator: "Ft",
          preLoadValues: ["100000", "110000", "120000"],
        },
        {
          id: "HowManyInstallments",
          title: "Hány részletben fizet?",
          fieldType: "select",
          mandatory: true,
          defaultValue: "2",
          options: [
            {
              value: "1",
              label: "1",
              disabled: true,
            },
            {
              value: "2",
              label: "2",
            },
            {
              value: "3",
              label: "3",
              disabled: true,
            },
          ],
        },
        {
          id: "isFirstDownPayment",
          title: "Első részlet foglaló-e?",
          fieldType: "select",
          fullWidth: true,
          mandatory: true,
          defaultValue: "yes",
          options: [
            {
              value: "yes",
              label: "Igen",
            },
            {
              value: "no",
              label: "Nem",
            },
          ],
        },
        {
          id: "DownPayment",
          title: "Első részlet összege",
          fieldType: "text",
          endDecorator: "Ft",
          mandatory: true,
          preLoadValues: ["1000000", "1100000", "1200000"],
        },
        {
          id: "DownPaymentDate",
          title: "Első részlet fizetési határideje",
          fieldType: "select",
          mandatory: true,
          defaultValue: "now",
          options: [
            {
              value: "now",
              label: "a jelen Szerződés megkötésekor megfizet",
            },
            {
              value: "3",
              disabled: true,
              label: "szerződés megkötése + 3 nap",
            },
            {
              value: "5",
              disabled: true,
              label: "szerződés megkötése + 5 nap",
            },
          ],
        },
        {
          id: "SecondInstallment",
          title: "Második részlet összege",
          fieldType: "text",
          endDecorator: "Ft",
          mandatory: true,
          preLoadValues: ["9000000", "9900000", "10800000"],
        },
        {
          id: "SecondInstallmentDate",
          title: "Második részlet fizetési határideje",
          fieldType: "select",
          mandatory: true,
          defaultValue: "now",
          options: [
            {
              value: "now",
              label: "Szerződéskötés napján",
            },
            {
              value: "5",
              label: "Szerződéskötés + 5 nap",
            },
            {
              value: "10",
              label: "szerződés megkötése + 10 nap",
            },
            {
              value: "15",
              label: "szerződés megkötése + 15 nap",
            },
            {
              value: "30",
              label: "szerződés megkötése + 30 nap",
            },
            {
              value: "45",
              label: "szerződés megkötése + 45 nap",
            },
          ],
        },
        {
          id: "PosTransferDate",
          title: "Birtokba adás dátuma",
          fieldType: "select",
          mandatory: true,
          defaultValue: "afterpaid",
          options: [
            {
              value: "afterpaid",
              label: "Vételár kiegyenlítését követően haladéktalanul",
            },
            {
              value: "3",
              label: "Vételár kiegyenlítését követő 3 munkanapon belül",
            },
            {
              value: "now",
              label: "a jelen Szerződés megkötését követően",
            },
          ],
        },
        {
          id: "BankLoanUsed",
          title: "Bankkölcsönt igénybe vesz?",
          fieldType: "select",
          mandatory: true,
          defaultValue: "no",
          options: [
            {
              value: "no",
              label: "Nem",
            },
            {
              value: "yes",
              label: "Igen",
              disabled: true,
            },
          ],
        },
        {
          id: "UseStateSupport",
          title: "Állami támogatást vesz igénybe?",
          fieldType: "select",
          mandatory: true,
          defaultValue: "no",
          options: [
            {
              value: "no",
              label: "Nem",
            },
            {
              value: "csok",
              label: "CSOK",
              disabled: true,
            },
            {
              value: "vcsok",
              label: "falusi CSOK",
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      id: "bidIsValid",
      title: "Vételi ajánlat kötöttségenek időtartama",
      fullWidth: false,
      fields: [
        {
          id: "BidObligationTerm",
          title: "Vételi ajánlat kötöttségenek időtartama",
          fieldType: "select",
          mandatory: true,
          fullWidth: true,
          defaultValue: "10",
          options: [
            {
              value: "3",
              label: "3 nap",
            },
            {
              value: "5",
              label: "5 nap",
            },
            {
              value: "7",
              label: "7 nap",
            },
            {
              value: "10",
              label: "10 nap",
            },
            {
              value: "15",
              label: "15 nap",
            },
          ],
        },
      ],
    },
    {
      id: "moreConditions",
      title: "További feltételek",
      fullWidth: false,
      fields: [
        {
          id: "dutyDiscounts",
          title: "Illetékmentesség / kedvezmények",
          fieldType: "select",
          mandatory: false,
          fullWidth: true,
          options: [
            {
              value: "1",
              label:
                "cserepótló vétel (a vevő 3 éven belül eladott/1 éven belül elad)",
            },
            {
              value: "2",
              label:
                "építési telek vásárlása (önkormányzati nyilvántartás, nem tul. lap alapján)",
            },
            {
              value: "3",
              label: "CSOK illetékmentesség",
            },
            {
              value: "4",
              label:
                "a vevő 35. életévét be nem töltött fiatal, az ingatlan első lakástulajdona",
            },
            {
              value: "5",
              label:
                "a felek egyenes ági rokonok (pl. szülő-gyermek, nagyszülő-unoka)",
            },
            {
              value: "6",
              label: "a felek házastársak",
            },
            {
              value: "7",
              label: "a felek testvérek",
            },
            {
              value: "8",
              label: " egyéb (érdeklődjön az ellenjegyző ügyvédnél)",
            },
          ],
        },
      ],
    },
    {
      id: "section_dates",
      title: "Keltezés",
      fullWidth: true,
      fields: [
        {
          id: "PlaceOfSigning",
          title: "Keltezés helye",
          fieldType: "text",
          mandatory: true,
          placeholder: "Budapest",
        },
        {
          id: "DateOfSigning",
          title: "Keltezés dátuma",
          fieldType: "text",
          mandatory: true,
          placeholder: "2023.01.01.",
        },
      ],
    },
  ],
};
