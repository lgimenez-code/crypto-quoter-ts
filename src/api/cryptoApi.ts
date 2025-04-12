import Crypto from "../models/Crypto";
import CryptoQuotation from "../models/CryptoQuotation";

const urlBase = 'https://min-api.cryptocompare.com/data';

export const getListCrypto = async () : Promise<any> => {
  try {
    const url = `${urlBase}/top/totalvolfull?limit=20&tsym=USD`;
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error("An error as ocurred.");
    }
    const result = await response.json();

    const arrayCrypto = result.Data.map( (crypto: any) => {
      const object: Crypto = {
        id: crypto.CoinInfo.Id,
        name: crypto.CoinInfo.FullName,
        code: crypto.CoinInfo.Name,
      };
      return object;
    });
    return arrayCrypto;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


export const getDataCrypto = async (coin: string = '', crypto: string = '') : Promise<CryptoQuotation> => {
  try {
    const url = `${urlBase}/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error("An error as ocurred.");
    }
    const result = await response.json();
    return result.DISPLAY[crypto][coin];
  } catch (error: any) {
    throw new Error(error.message);
  }
}