import { Cevap } from './Cevap';
import { Uye } from './Uye';

export class Soru {
  Id: number;
  baslik: string;
  icerik: string;
  tarih: string;
  katId: number;
  uyeId: string;

  cevaplar?: Cevap[];
  uye?: Uye;
}
