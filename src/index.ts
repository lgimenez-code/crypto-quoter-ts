import { getListCrypto, getDataCrypto } from './api/cryptoApi';
import Currency from './models/Currency';

const formContainer = <HTMLDivElement>document.querySelector('.formContainer');
const loaderContainer = <HTMLDivElement>document.querySelector('.loaderContainer');

const selectCoin = <HTMLSelectElement>document.querySelector('#selectCoin');
const selectCrypto = <HTMLSelectElement>document.querySelector('#selectCrypto');
const inputForm = <HTMLInputElement>document.querySelector('#inputForm');
const resultSection = <HTMLDivElement>document.querySelector('#resultSection');

const imageCrypto = <HTMLImageElement>document.querySelector('.imageCrypto');
const actualPrice = <HTMLSpanElement>document.querySelector('#actualPrice');
const highestPrice = <HTMLSpanElement>document.querySelector('#highestPrice');
const lowestPrice = <HTMLSpanElement>document.querySelector('#lowestPrice');
const variationPrice = <HTMLSpanElement>document.querySelector('#variationPrice');
const lastUpdate = <HTMLSpanElement>document.querySelector('#lastUpdate');

const init = async () => {
  loadEvents();
  loadCoinField();
  loadCryptoField();
}

const loadEvents = () : void => {
  inputForm.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return false;
    }
    getInfoCrypto();
  });
}

const loadCoinField = () : void => {
  const listCoins : Array<Currency> = [
    { name: 'Dollar', code: 'USD' },
    { name: 'Euro', code: 'EUR' },
    { name: 'Pound sterling', code: 'GBP' },
  ];
  for (let i = 0; i < listCoins.length; i++) {
    let CoinName = '(' + listCoins[i].code + ') ' + listCoins[i].name;
    selectCoin.innerHTML += `<option value="${listCoins[i].code}">${ CoinName }</option>`;
  }
}

const loadCryptoField = async () => {
  const arraylist = await getListCrypto();
  for (let i = 0; i < arraylist.length; i++) {
    let cryptoName = '(' + arraylist[i].code + ') ' + arraylist[i].name;
    selectCrypto.innerHTML += `<option value="${arraylist[i].code}">${ cryptoName }</option>`;
  }
}

const getInfoCrypto = async () => {
  loadingPage(true);

  const data = await getDataCrypto(selectCoin.value, selectCrypto.value);

  imageCrypto.src = `https://cryptocompare.com/${data.IMAGEURL}`
  actualPrice.innerHTML = data.PRICE;
  highestPrice.innerHTML = data.HIGHDAY;
  lowestPrice.innerHTML = data.LOWDAY;
  variationPrice.innerHTML = data.CHANGEPCT24HOUR;
  lastUpdate.innerHTML = data.LASTUPDATE;

  loadingPage();
}

const validateFields = () : boolean => {
  selectCoin.classList.remove('errorField');
  selectCrypto.classList.remove('errorField');
  let isValid : boolean = true;

  if (selectCoin.value == "0") {
    selectCoin.classList.add('errorField');
    isValid = false;
  }
  if (selectCrypto.value == "0") {
    selectCrypto.classList.add('errorField');
    isValid = false;
  }
  return isValid;
}

const loadingPage = (active: boolean = false) => {
  if (active) {
    formContainer.classList.add('displayNone');
    loaderContainer.classList.remove('displayNone');
    resultSection.classList.add('hidden');
  }
  else {
    formContainer.classList.remove('displayNone');
    loaderContainer.classList.add('displayNone');
    resultSection.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', init);