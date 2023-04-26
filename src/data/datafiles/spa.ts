import { CaseTemplate } from "types";

export const document: CaseTemplate = {
  id: "spa",
  title:
    "Ügyfélazonosítás, tényleges tulajdonosi nyilatkozat, adatkezelési hozzájárulás",
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
      id: "section1",
      title: "Azonosítást végző ügyvéd/iroda adatai",
      fields: [
        {
          id: "lawyerName",
          title: "Ügyvéd Neve",
          fieldType: "text",
          mandatory: true,
          placeholder: "Kiss József",
        },
        {
          id: "lawyerOffice",
          title: "Ügyvédi iroda",
          fieldType: "text",
          mandatory: false,
          placeholder: "Kiss József Ügyvédi Iroda",
        },
        {
          id: "lawyerAddress",
          title: "Cím",
          fieldType: "text",
          mandatory: true,
        },
      ],
    },
    {
      id: "section-select",
      title: "Természetes vagy jogi személy",
      fields: [
        {
          id: "personOrCompany",
          title: "Az ügyfél:",
          fieldType: "radiogroup",
          mandatory: true,
          resetOnChange: true,
          options: [
            {
              value: "person",
              label: "Természetes személy",
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
      id: "section2",
      title: "Természetes személy adatai",
      type: "person",
      visibleState: ["personOrCompany"],
      visibleCondition: "person",
      fields: [
        {
          id: "personName",
          title: "Családi és utónév",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "personBirthName",
          title: "Születési családi és utónév",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "personNationality",
          title: "Állampolgárság",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "personBirthPlaceAndTime",
          title: "Születési helye és ideje",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "personAddress",
          title: "Lakcím / tartózkodási hely",
          fieldType: "text",
          mandatory: true,
          placeholder: "1111 Budapest, Kossuth Lajos utca 1.",
          fullWidth: true,
        },
        {
          id: "personMotherName",
          title: "Anyja születési neve",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "personIDDocument",
          title: "Azonosító okmánya (típus, száma)",
          placeholder: "személyi igazolvány, 123456AA",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "personEmail",
          title: "Email címe",
          fieldType: "text",
          placeholder: "email@email.com",
        },
        {
          id: "personPhoneNumber",
          title: "Telefonszám",
          fieldType: "text",
          placeholder: "+36303319260",
        },
        {
          id: "additionalPersonalData",
          title:
            "További személyes adatok felsorolása (ha szükséges az ügylethet)",
          fieldType: "text",
          fullWidth: true,
        },
        {
          id: "missingDataConsequences",
          title: "Adatszolgáltatás elmaradásának következményei:",
          fieldType: "text",
          fullWidth: true,
          placeholder:
            "megbízással érintett okirat ellenjegyzésének megtagadása, ingatlan-nyilvántartási kérelem hatóság általi elutasítása",
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
    {
      id: "section3company",
      title: "Képviseletre jogosult adatai",
      visibleState: ["personOrCompany"],
      visibleCondition: "company",
      //fullWidth: true,
      fields: [
        {
          id: "declarantName",
          title: "Neve, beosztása",
          fieldType: "text",
          mandatory: true,
          placeholder: "Nagy József, ügyvezető",
        },
        {
          id: "declarantBirthName",
          title: "Születési családi és utóneve",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "declarantNationality",
          title: "Állampolgársága",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "declarantBirthPlaceAndTime",
          title: "Születési helye, ideje",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "declarantAddress",
          title: "Lakcíme",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "declarantMotherName",
          title: "Anyja születési neve",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "declarantEmail",
          title: "Email címe",
          fieldType: "text",
          placeholder: "email@email.com",
        },
        {
          id: "declarantPhoneNumber",
          title: "Telefonszám",
          fieldType: "text",
          placeholder: "+36303319260",
        },
        {
          id: "declarantTaxNumber",
          title: "Adóazonosító jele",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "declarantIdCardNumber",
          title: "SZIG/útlevél száma",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "declarantAddressCardNumber",
          title: "Lakcímkártyá száma",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "additionalPersonalData",
          title:
            "További személyes adatok felsorolása (ha szükséges az ügylethet)",
          fieldType: "text",
          fullWidth: true,
        },
        {
          id: "missingDataConsequences",
          title: "Adatszolgáltatás elmaradásának következményei:",
          fieldType: "text",
          fullWidth: true,
          placeholder:
            "megbízással érintett okirat ellenjegyzésének megtagadása, ingatlan-nyilvántartási kérelem hatóság általi elutasítása",
        },
      ],
    },
    {
      id: "section3",
      title: "Közszereplői nyilatkozat",
      visibleState: ["personOrCompany"],
      visibleCondition: "person",
      fields: [
        {
          id: "personPoliticallyExposed",
          title: "Kiemelt közszereplőnek minősül-e?",
          fieldType: "radiogroup",
          fullWidth: true,
          mandatory: true,
          defaultValue: "no",
          options: [
            { value: "no", label: "Nem" },
            { value: "yes", label: "Igen" },
          ],
          helperText:
            "az államfő, a kormányfő, a miniszter, a miniszterhelyettes, az államtitkár, Magyarországon az államfő, a miniszterelnök, a miniszter és az államtitkár, az országgyűlési képviselő vagy a hasonló jogalkotó szerv tagja, Magyarországon az országgyűlési képviselő és a nemzetiségi szószóló, a politikai párt irányító szervének tagja, Magyarországon a politikai párt vezető testületének tagja és tisztségviselője, a legfelsőbb bíróság, az alkotmánybíróság és olyan magas rangú bírói testület tagja, amelynek a döntései ellen fellebbezésnek helye nincs, Magyarországon az Alkotmánybíróság, az ítélőtábla és a Kúria tagja, a számvevőszék és a központi bank igazgatósági tagja, Magyarországon a Állami Számvevőszék elnöke és alelnöke, a Monetáris Tanács és a Pénzügyi Stabilitási Tanács tagja, a nagykövet, az ügyvivő és a fegyveres erők magas rangú tisztviselője, Magyarországon a rendvédelmi feladatokat ellátó szerv központi szervének vezetője és annak helyettese, valamint a Honvéd Vezérkar főnöke és a Honvéd Vezérkar főnökének helyettesei, többségi állami tulajdonú vállalatok igazgatási, irányító vagy felügyelő testületének tagja, Magyarországon a többségi állami tulajdonú vállalkozás ügyvezetője, irányítási vagy felügyeleti jogkörrel rendelkező vezető testületének tagja, nemzetközi szervezet vezetője, vezetőhelyettese, vezető testületének tagja vagy ezzel egyenértékű feladatot ellátó személy",
        },
        {
          id: "personPoliticallyExposedType",
          visibleState: ["personPoliticallyExposed"],
          visibleCondition: "yes",
          title: "Megjelölése",
          fieldType: "text",
          fullWidth: true,
          mandatory: true,
        },
        {
          id: "personPoliticallyExposedRelation",
          title:
            "Kiemelt közszereplő közeli hozzátartozójának vagy kapcsolatban álló személynek minősül-e?",
          fieldType: "radiogroup",
          fullWidth: true,
          mandatory: true,
          defaultValue: "no",
          options: [
            { value: "no", label: "Nem" },
            { value: "yes", label: "Igen" },
          ],
          helperText:
            "kiemelt közszereplő házastársa, élettársa; vér szerinti, örökbefogadott, mostoha- és nevelt gyermeke, továbbá ezek házastársa vagy élettársa; vér szerinti, örökbefogadó, mostoha- és nevelőszülője,  bármely természetes személy, aki a kiemelt közszereplővel ugyanazon jogi személy vagy jogi személyiséggel nem rendelkező szervezet tényleges tulajdonosa vagy vele szoros üzleti kapcsolatban áll; vagy bármely természetes személy, aki egyszemélyes tulajdonosa olyan jogi személynek vagy jogi személyiséggel nem rendelkező szervezetnek, amelyet kiemelt közszereplő javára hoztak létre.",
        },
      ],
    },
    {
      id: "section4",
      title: "Közszereplői adatok",
      fullWidth: true,
      visibleState: [
        "personPoliticallyExposed",
        "personPoliticallyExposedRelation",
      ],
      visibleCondition: "yes",
      fields: [
        {
          id: "moneySourceInfo",
          title:
            "Ha természetes személy Ügyfél kiemelt közszereplőnek minősül, a pénzeszköz forrására vonatkozó információ",
          fieldType: "text",
          fullWidth: true,
          placeholder: "Pénzeszköz forrása",
        },
        {
          id: "dataSourceInfo",
          title:
            "Ha természetes személy Ügyfél kiemelt közszereplőnek minősül és ennek rögzítésére nem az ügyfél nyilatkozata, hanem a bemutatott okiratok, valamint a nyilvánosan hozzáférhető nyilvántartások alapján kerül sor, az adat forrása",
          fieldType: "text",
          fullWidth: true,
          placeholder: "Adat forrása",
        },
      ],
    },
    {
      id: "section5",
      title:
        "Bemutatott iratok -  Természetes személy esetén (jogi személyt képviselő természetes személy is köteles kitölteni!)",
      fullWidth: true,
      fields: [
        {
          id: "localCitizenDocuments",
          title: "Magyar állampolgár esetén",
          fieldType: "checkbox",
          mandatory: true,
          options: [
            {
              value: "local_idcard",
              label:
                "a személyazonosság igazolására alkalmas hatósági igazolvány",
            },
            {
              value: "local_addresscard",
              label: "lakcímet igazoló hatósági igazolvány",
            },
            { value: "local_taxcard", label: "adókártya" },
            { value: "local_passport", label: "útlevél" },
          ],
        },
        {
          id: "alienCitizenDocuments",
          title: "Külföldi állampolgár esetén",
          fieldType: "checkbox",
          mandatory: true,
          options: [
            { value: "alien_passport", label: "úti okmány" },
            {
              value: "alien_idcard",
              label:
                "magyar személyazonosító igazolvány, ha az magyarországi tartózkodásra jogosít",
            },
            {
              value: "alien_residencycard",
              label:
                "tartózkodási jogot igazoló okmány, vagy tartózkodásra jogosító okmány",
            },
          ],
        },
        {
          id: "companyDocuments",
          title:
            "Dokumentumok - Jogi személy, jogi személyiséggel nem rendelkező szervezet esetén",
          fieldType: "checkbox",
          visibleState: ["personOrCompany"],
          visibleCondition: "company",
          mandatory: true,
          fullWidth: true,
          options: [
            {
              value: "company_doc_1",
              label:
                "harminc napnál nem régebbi okirat, hogy belföldi gazdálkodó szervezetet a cégbíróság bejegyezte, vagy a gazdálkodó szervezet a bejegyzési kérelmét benyújtotta, egyéni vállalkozó esetében azt, hogy az egyéni vállalkozói igazolvány kiadása vagy a nyilvántartásba vételről szóló igazolás kiállítása megtörtént",
            },
            {
              value: "company_doc_2",
              label:
                "harminc napnál nem régebbi okirat, hogy belföldi jogi személy esetén, ha annak létrejöttéhez hatósági vagy bírósági nyilvántartásba vétel szükséges, a nyilvántartásba vétel megtörtént",
            },
            {
              value: "company_doc_3",
              label:
                "harminc napnál nem régebbi okirat, hogy külföldi jogi személy vagy jogi személyiséggel nem rendelkező szervezet esetén a saját országának joga szerinti bejegyzése vagy nyilvántartásba vétele megtörtént",
            },
            { value: "company_doc_4", label: "Létesítő okirat" },
          ],
        },
      ],
    },
    {
      id: "section7",
      title: "Saját nevében jár el?",
      fullWidth: true,
      visibleState: ["personOrCompany"],
      visibleCondition: "person",
      fields: [
        {
          id: "imRealOwner",
          title: "Nyilatkozat",
          fieldType: "radiogroup",
          mandatory: true,
          fullWidth: true,
          defaultValue: "yes",
          options: [
            { value: "yes", label: "Saját nevemben és érdekemben járok el" },
            {
              value: "no",
              label:
                "Tényleges tulajdonos nevében vagy érdekében járok el - (Pmt. – 3 § 38. pont c) pont alapján tényleges tulajdonos az a természetes személy, akinek megbízásából valamely ügyletet végrehajtanak, vagy aki egyéb módon tényleges irányítást, ellenőrzést gyakorol a természetes személy ügyfél tevékenysége felett)",
            },
          ],
        },
      ],
    },
    {
      id: "section8",
      title: "Tényleges tulajdonosra vonatkozó nyilatkozat",
      fullWidth: true,
      visibleState: ["imRealOwner"],
      visibleCondition: "no",
      fields: [
        {
          id: "realownerName",
          title: "Családi és utónév",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerBirthName",
          title: "Születési családi és utónév",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerNationality",
          title: "Állampolgárság",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerBirthPlaceAndTime",
          title: "Születési hely, idő",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerAddress",
          title: "Lakcím (tartózkodási hely)",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerOwnerType",
          title: "Tulajdonosi érdekeltség jellege",
          visibleState: ["personOrCompany"],
          visibleCondition: "company",
          fieldType: "select",
          mandatory: true,
          options: [
            {
              value: "",
              label: "Jogi személy (nem alapítvány)",
              disabled: true,
            },
            {
              value: "A",
              label:
                "Tulajdoni hányad/szavazati jog közvetlenül vagy közvetve legalább 25%-a",
            },
            {
              value: "B",
              label: "Irányító, ellenőrző funkció",
            },
            {
              value: "C",
              label:
                "Meghatározó befolyás (Ptk. 8:2. § (2) bekezdésében meghatározott)",
            },
            {
              value: "D",
              label:
                "Ha a fentiek szerint nem megállapítható, akkor a vezető tisztségviselő (valamennyi)",
            },
            {
              value: "",
              label: "Alapítványi ügyfél",
              disabled: true,
            },
            {
              value: "E-a",
              label: "Kedvezményezett (vagyon legalább 25%-ára nézve)",
            },
            {
              value: "E-b",
              label:
                "Érdekében hozták létre/működtetik (fenti kedvezményezett hiányában)",
            },
            {
              value: "E-c",
              label:
                "Kezelő szerv tagja vagy meghatározó befolyás az alapítvány vagyona felett (legalább 25%)",
            },
            {
              value: "E-d",
              label:
                "E-a)-E-c) hiányában, aki az alapítvány képviseletében eljár",
            },
            {
              value: "",
              label:
                "Bizalmi vagyonkezelési szerződéssel érintett ügyfél esetén (minden lentiek szerint meghatározható természetes személyt kérünk felsorolni)",
              disabled: true,
            },
            {
              value: "F-a",
              label:
                "Vagyonrendelő (vagy ha jogi személy, akkor az A/B pont szerinti tényleges tulajdonosa)",
            },
            {
              value: "F-b",
              label:
                "Vagyonkezelő (vagy ha jogi személy, akkor az A/B pont szerinti tényleges tulajdonosa)",
            },
            {
              value: "F-c",
              label:
                "Kedvezményezett (vagy ha jogi személy, akkor az A/B pont szerinti tényleges tulajdonosa)",
            },
            {
              value: "F-d",
              label: "Ellenőrzés, irányítás egyéb módon a kezelt vagyon felett",
            },
            {
              value: "F-e",
              label: "A vagyonkezelést ellenőrző személy(ek)",
            },
          ],
        },
        {
          id: "realownerPercent",
          title: "Tulajdonosi érdekeltség mértéke",
          fieldType: "text",
          visibleState: ["personOrCompany"],
          visibleCondition: "company",
          endDecorator: "%",
        },
        {
          id: "realownerPoliticallyExposed",
          title:
            "Tényleges tulajdonos kiemelt közszereplő vagy közeli hozzátartozójának minősül-e?",
          fieldType: "radiogroup",
          mandatory: true,
          defaultValue: "no",
          options: [
            { value: "no", label: "Nem" },
            { value: "yes", label: "Igen" },
          ],
        },
        {
          id: "realownerOther",
          title: "Egyéb adat",
          fieldType: "text",
          fullWidth: true,
        },
      ],
    },
    {
      id: "section9",
      title:
        "Tényleges tulajdonosra (a képviselt jogi személy tényleges tulajdonosa) vonatkozó nyilatkozat",
      fullWidth: true,
      visibleState: ["personOrCompany"],
      visibleCondition: "company",
      fields: [
        {
          id: "realownerName",
          title: "Családi és utónév",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerBirthName",
          title: "Születési családi és utónév",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerNationality",
          title: "Állampolgárság",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerBirthPlaceAndTime",
          title: "Születési hely, idő",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerAddress",
          title: "Lakcím (tartózkodási hely)",
          fieldType: "text",
          mandatory: true,
        },
        {
          id: "realownerOwnerType",
          title: "Tulajdonosi érdekeltség jellege",
          fieldType: "select",
          mandatory: true,
          options: [
            {
              value: "",
              label: "Jogi személy (nem alapítvány)",
              disabled: true,
            },
            {
              value: "A",
              label:
                "Tulajdoni hányad/szavazati jog közvetlenül vagy közvetve legalább 25%-a",
            },
            {
              value: "B",
              label: "Irányító, ellenőrző funkció",
            },
            {
              value: "C",
              label:
                "Meghatározó befolyás (Ptk. 8:2. § (2) bekezdésében meghatározott)",
            },
            {
              value: "D",
              label:
                "Ha a fentiek szerint nem megállapítható, akkor a vezető tisztségviselő (valamennyi)",
            },
            {
              value: "",
              label: "Alapítványi ügyfél",
              disabled: true,
            },
            {
              value: "E-a",
              label: "Kedvezményezett (vagyon legalább 25%-ára nézve)",
            },
            {
              value: "E-b",
              label:
                "Érdekében hozták létre/működtetik (fenti kedvezményezett hiányában)",
            },
            {
              value: "E-c",
              label:
                "Kezelő szerv tagja vagy meghatározó befolyás az alapítvány vagyona felett (legalább 25%)",
            },
            {
              value: "E-d",
              label:
                "E-a)-E-c) hiányában, aki az alapítvány képviseletében eljár",
            },
            {
              value: "",
              label:
                "Bizalmi vagyonkezelési szerződéssel érintett ügyfél esetén (minden lentiek szerint meghatározható természetes személyt kérünk felsorolni)",
              disabled: true,
            },
            {
              value: "F-a",
              label:
                "Vagyonrendelő (vagy ha jogi személy, akkor az A/B pont szerinti tényleges tulajdonosa)",
            },
            {
              value: "F-b",
              label:
                "Vagyonkezelő (vagy ha jogi személy, akkor az A/B pont szerinti tényleges tulajdonosa)",
            },
            {
              value: "F-c",
              label:
                "Kedvezményezett (vagy ha jogi személy, akkor az A/B pont szerinti tényleges tulajdonosa)",
            },
            {
              value: "F-d",
              label: "Ellenőrzés, irányítás egyéb módon a kezelt vagyon felett",
            },
            {
              value: "F-e",
              label: "A vagyonkezelést ellenőrző személy(ek)",
            },
          ],
        },
        {
          id: "realownerPercent",
          title: "Tulajdonosi érdekeltség mértéke",
          fieldType: "text",
          endDecorator: "%",
          visibleState: ["realownerOwnerType"],
          visibleCondition: "A",
        },
        {
          id: "realownerPoliticallyExposed",
          title:
            "Tényleges tulajdonos iemelt közszereplő vagy közeli hozzátartozójának minősül-e?",
          fieldType: "radiogroup",
          mandatory: true,
          defaultValue: "no",
          options: [
            { value: "no", label: "Nem" },
            { value: "yes", label: "Igen" },
          ],
        },
        {
          id: "realownerOther",
          title: "Egyéb adat",
          fieldType: "text",
          fullWidth: true,
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
