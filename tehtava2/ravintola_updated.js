/*
TIKO RAVINTOLA
OHJELMAKOODI
*/

const Ravintola = function () {
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 5 },
    { ruoka: 'LeipÃ¤', hinta: 3 },
    { ruoka: 'Vihersalaatti', hinta: 7 },
    { ruoka: 'Salsa', hinta: 4 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 7 },
    { ruoka: 'Makaroonilaatikko', hinta: 6 },
    { ruoka: 'Kasvispihvi', hinta: 6 },
    { ruoka: 'Kanasalaatti', hinta: 5 },
  ];
  this.jalkiruoat = [
    { ruoka: 'HedelmÃ¤salaatti', hinta: 4 },
    { ruoka: 'JÃ¤Ã¤telÃ¶', hinta: 5 },
    { ruoka: 'Pulla', hinta: 2 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { juoma: 'Tee', hinta: 2 },
    { juoma: 'Kahvi', hinta: 3 },
    { juoma: 'Maito', hinta: 2 },
    { juoma: 'Mehu', hinta: 2 },
  ];
  this.alkuruokaHinta = 4;
  this.paaruokaHinta = 6;
  this.jalkiruokaHinta = 4;
  this.juomaHinta = 3;
  this.paikkojenMaara = 15;
  this.paikat; // TÃ¤hÃ¤n muuttujaan paikkojen taulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Jos 'asiakkaidenMaara' on pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara', luo taulukon 'tilaukset'
 * johon tallennetaan yksittÃ¤isen asiakkaan tilaus. tilaaAteria-funktiolle annetaan satunnaiset boolean arvot
 * argumentteina.
 *
 * Palauttaa pÃ¤Ã¤tteeksi 'tilaukset' taulukon.
 * @param {number} asiakkaidenMaara
 * @return {object} object array
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  const onTilaa = this.tarkistaPaikkojenMaara(asiakkaidenMaara);
  if (!onTilaa) {
    return;
  }
  this.varaaPaikat(asiakkaidenMaara);

  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. MitÃ¤ teille saisi olla?',
    );
    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean()),
    );
    console.log('Asiakkaalle tarjoiltu. HyvÃ¤Ã¤ ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * Tarkistaa, ettÃ¤ 'asiakkaidenMaara' on suurempi kuin 0, mutta pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara'.
 *
 * Kirjoittaa konsoliin tulosteen tilanteesta, ja palauttaa onnistumisen boolean arvona.
 *
 * Jos 'asiakkaidenMaara' ei ole numero, heittÃ¤Ã¤ TypeErrorin.
 * @param {number} asiakkaidenMaara
 * @return {boolean} Onnistuminen
 */
Ravintola.prototype.tarkistaPaikkojenMaara = function (asiakkaidenMaara) {
  if (typeof asiakkaidenMaara !== 'number') {
    throw new TypeError();
  }
  if (asiakkaidenMaara <= 0) {
    console.log(
      'IkÃ¤vÃ¤ kyllÃ¤ emme voi tarjoilla ' + asiakkaidenMaara + ' asiakkaalle.',
    );
    return false;
  } else if (asiakkaidenMaara <= this.paikkojenMaara) {
    console.log(
      'Tilaa on ' +
        asiakkaidenMaara +
        ' asiakkaalle. Tervetuloa ravintolaamme!',
    );
    return true;
  } else {
    console.log(
      'IkÃ¤vÃ¤ kyllÃ¤ ravintolaamme ei mahdu ' +
        asiakkaidenMaara +
        ' asiakasta.',
    );
    return false;
  }
};

/**
 * Luo Ravintolan paikat-muuttujaan uuden taulukon, jonka koko mÃ¤Ã¤rÃ¤ytyy paikkojenMaara-muuttujan mukaisesti,
 * ja tÃ¤yttÃ¤Ã¤ taulukon boolean arvolla false.
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
  // Luodaan paikkojenMaara-kokoinen taulukko ja asetetaan kaikki paikat aluksi vapaiksi (false).S
};

/**
 * Varaa ravintolasta paikkoja.
 * Luo paikkataulukon tarvittaessa, tarkistaa vapaiden paikkojen määrän
 * ja varaa pyydetyn määrän paikkoja.
 *
 * @param {number} varauksenMaara Varattavien paikkojen määrä.
 * @returns {boolean} true jos paikat saatiin varattua, muuten false.
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara) {
  if (varauksenMaara === undefined) {
    varauksenMaara = 1;
  }

  if (!Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  // Lasketaan kuinka monta vapaata paikkaa taulukossa on
  let vapaitaPaikkoja = 0;

  for (let i = 0; i < this.paikat.length; i++) {
    if (this.paikat[i] === false) {
      vapaitaPaikkoja++;
    }
  }

  if (vapaitaPaikkoja < varauksenMaara) {
    return false;
  }

  let varattuja = 0;

  for (let i = 0; i < this.paikat.length; i++) {
    if (this.paikat[i] === false) {
      this.paikat[i] = true;
      varattuja++;
    }

    if (varattuja === varauksenMaara) {
      break;
    }
  }

  return true;
};

/**
 * Ottaa parametreina 3 boolean arvoa, joiden avulla mÃ¤Ã¤ritellÃ¤Ã¤n mitÃ¤ ruokia asiakas tilaa.
 * Jos parametrit eivÃ¤t ole tyyppiÃ¤ boolean, heitetÃ¤Ã¤n TypeError.
 *
 * Tilaukset tallennetaan 'ruoat' taulukkoon boolean parametrien mukaisesti.
 *
 * Lopuksi kutsutaan 'laskeLasku' funktiota, jolla lasketaan tilauksen lasku.
 *
 * Palauttaa objektin, joka sisÃ¤ltÃ¤Ã¤ numeron ja string-taulukon
 *
 * @param {boolean} ottaaAlkuruoan
 * @param {boolean} ottaaJalkiruoan
 * @param {boolean} ottaaJuoman
 * @return {object} object - number, string[]
 */
Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman,
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  ) {
    throw new TypeError();
  }

  const ruoat = [];
  let ruoka;

  if (ottaaAlkuruoan) {
    ruoka = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log('Ottaisin alkuruoaksi: ' + ruoka);
    ruoat.push(ruoka);
  }

  ruoka = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log('Ottaisin pÃ¤Ã¤ruoaksi: ' + ruoka);
  ruoat.push(ruoka);

  if (ottaaJalkiruoan) {
    ruoka = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log('Ottaisin jÃ¤lkiruoaksi: ' + ruoka);
    ruoat.push(ruoka);
  }

  if (ottaaJuoman) {
    ruoka = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log('Ottaisin juomaksi: ' + ruoka);
    ruoat.push(ruoka);
  }

  const summa = this.laskeLasku(ottaaAlkuruoan, ottaaJalkiruoan, ottaaJuoman);

  return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta
 * @param {string[]} taulukko
 * @return {string}
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee summan annettujen boolean parametrien mukaisesti.
 * Jos parametrit eivÃ¤t ole tyyppiÃ¤ boolean, heittÃ¤Ã¤ TypeErrorin.
 *
 * 'loppuSumma' muuttujaan lisÃ¤tÃ¤Ã¤n automaattisesti 'paaruokaHinta', ja loput hinnat sitten parametrien mukaisesti.
 *
 * Palauttaa lopussa 'loppuSumma'.
 *
 * @param {boolean} ottiAlkuruoan
 * @param {boolean} ottiJalkiruoan
 * @param {boolean} ottiJuoman
 * @return {number}
 */
Ravintola.prototype.laskeLasku = function (tilaus) {
  let loppuSumma = 0;

  for (let i = 0; i < tilaus.length; i++) {
    loppuSumma += tilaus[i].hinta;
  }

  return loppuSumma;
};

const ravintola = new Ravintola();

export default ravintola;
