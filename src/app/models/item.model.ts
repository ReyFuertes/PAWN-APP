export interface Item {
  id?: number;
  item_name?: string;
  item_type?: string;
  grams?: string;
  karat?: string;
  description?: string;
  created?: string;
  modified?: string;
}

export enum ItemTypeEnum {
  'M-RING' = 0,
  'L-RING' = 1,
  'W-RING' = 2,
  'C-RING' = 3,
  'E-RING' = 4,
  'B-LET' = 5,
  'N-LACE' = 6,
  'PNDT' = 7,
  'ANK' = 8,
  'CHN' = 9,
  'BNGLE' = 10,
  'SCRAP' = 11
}

export enum ItemColorEnum {
  'YG' = 0,
  'WG' = 1,
  'PT' = 2,
  'CC' = 3,
  '2TONE' = 4,
  '3COLORS' = 5,
  'MULTI-C' = 6,
}

export enum ItemBirthstoneEnum {
  'Garnet' = 0,
  'Amethyst' = 1,
  'Aquamarine' = 2,
  'Diamond' = 3,
  'Emerald' = 4,
  'Pearl' = 5,
  'Ruby' = 6,
  'Peridot' = 7,
  'Sapphire' = 8,
  'Opal' = 9,
  'Topaz' = 10,
  'Turquiose' = 11
}