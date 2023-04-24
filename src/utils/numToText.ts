function szazas(x: number) {
  switch (x) {
    case 0:
      return "";
    case 1:
      return "egyszáz";
    case 2:
      return "kettőszáz";
    case 3:
      return "háromszáz";
    case 4:
      return "négyszáz";
    case 5:
      return "ötszáz";
    case 6:
      return "hatszáz";
    case 7:
      return "hétszáz";
    case 8:
      return "nyolcszáz";
    case 9:
      return "kilencszáz";
  }
}

function tizes(x: number) {
  switch (x) {
    case 0:
      return "";
    case 1:
      return "tizen";
    case 2:
      return "huszon";
    case 3:
      return "harminc";
    case 4:
      return "negyven";
    case 5:
      return "ötven";
    case 6:
      return "hatvan";
    case 7:
      return "hetven";
    case 8:
      return "nyolcvan";
    case 9:
      return "kilencven";
  }
}

function tizes2(x: number) {
  switch (x) {
    case 0:
      return "";
    case 1:
      return "tíz";
    case 2:
      return "húsz";
    case 3:
      return "harminc";
    case 4:
      return "negyven";
    case 5:
      return "ötven";
    case 6:
      return "hatvan";
    case 7:
      return "hetven";
    case 8:
      return "nyolcvan";
    case 9:
      return "kilencven";
  }
}

function egyes(x: number) {
  switch (x) {
    case 0:
      return "";
    case 1:
      return "egy";
    case 2:
      return "kettő";
    case 3:
      return "három";
    case 4:
      return "négy";
    case 5:
      return "öt";
    case 6:
      return "hat";
    case 7:
      return "hét";
    case 8:
      return "nyolc";
    case 9:
      return "kilenc";
  }
}

export function numToText(num: string) {
  var ki = "";
  let va = num;

  var i = 1; // szamjegyszámláló
  var elozo = 0; // előző számjegy
  
  while (va.length > 0) {
    var e = parseInt(va.charAt(va.length - 1));
    if (i === 7) ki = "millió-" + ki;
    if (i === 4) ki = "ezer-" + ki;
    if (i % 3 === 1) ki = egyes(e) + ki;
    if (i % 3 === 2) {
      if (elozo === 0) ki = tizes2(e) + ki;
      else ki = tizes(e) + ki;
    }
    if (i % 3 === 0) ki = szazas(e) + ki;
    i++;
    elozo = e;
    va = va.substring(0, va.length - 1);
  }
  if (parseInt(num) % 1000000 === 0) ki = ki.substring(0, ki.length - 5); // ezer- le
  if (ki.indexOf("-ezer-") > -1) {
    ki =
      ki.substring(0, ki.indexOf("-ezer-") + 1) +
      ki.substring(ki.indexOf("-ezer-") + 6, ki.length);
  }
  if (ki.charAt(ki.length - 1) === "-") ki = ki.substring(0, ki.length - 1); // milliós - le
  return ki;
}
