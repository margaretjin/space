// types.ts

export interface ExposInfoItem {
  exposPubuseGbCdNm: string;
  flrNoNm: string;
  area: number;
  etcPurps: string;
  mainPurpsCdNm: string;
  activeDong: string;
  activeFloor: string
  hoNm: string;  // hoNm 속성 추가
}


export interface BuildingTotal {
  archArea: number;
  atchBldArea: number;
  atchBldCnt: number;
  bcRat: number;
  bjdongCd: number;
  bldNm: string;
  block: string;
  bun: string;
  bylotCnt: number;
  crtnDay: string;
  engrEpi: number;
  engrGrade: string;
  engrRat: number;
  etcPurps: string;
  fmlyCnt: number;
  gnBldCert: number;
  gnBldGrade: string;
  hhldCnt: number;
  hoCnt: number;
  indrAutoArea: number;
  indrAutoUtcnt: number;
  indrMechArea: number;
  indrMechUtcnt: number;
  itgBldCert: number;
  itgBldGrade: string;
  ji: string;
  lot: string;
  mainBldCnt: number;
  mainPurpsCd: string;
  mainPurpsCdNm: string;
  mgmBldrgstPk: string;
  naBjdongCd: number;
  naMainBun: number;
  naRoadCd: number;
  naSubBun: number;
  naUgrndCd: number;
  newOldRegstrGbCd: number;
  newOldRegstrGbCdNm: string;
  newPlatPlc: string;
  oudrAutoArea: number;
  oudrAutoUtcnt: number;
  oudrMechArea: number;
  oudrMechUtcnt: number;
  platArea: number;
  platGbCd: number;
  platPlc: string;
  pmsDay: string;
  pmsnoGbCd: string;
  pmsnoGbCdNm: string;
  pmsnoKikCd: string;
  pmsnoKikCdNm: string;
  pmsnoYear: string;
  regstrGbCd: number;
  regstrGbCdNm: string;
  regstrKindCd: number;
  regstrKindCdNm: string;
  rnum: number;
  sigunguCd: number;
  splotNm: string;
  stcnsDay: string;
  totArea: number;
  totPkngCnt: number;
  useAprDay: string;
  vlRat: number;
  vlRatEstmTotArea: number;
  dongNm: string;
}
export interface SideInfoType {
  vlRatEstmTotArea: number;
  dongNm: string;
}
export type BuildingTitleItem = {
  hhldCnt: number;
  vlRat: number;
  platArea: number;
  ugrndFlrCnt:number;
  heit: number;
  archArea: number;
  atchBldArea: number;
  atchBldCnt: number;
  bcRat: number;
  bjdongCd: number;
  bldNm: string;
  mainPurpsCdNm: string;
  totArea: string;
  etcPurps: string;
  regstrKindCdNm: string;
  dongNm: string;
  grndFlrCnt: number;
}

export interface BuildingInfoType {
  total_info: {
    response: {
      body: {
        items: {
          item: BuildingTotal;
        };
      };
    };
  };
  title_info: {
    response: {
      body: {
        items: {
          item: BuildingTitleItem | BuildingTitleItem[];
        };
      };
    };
  };
  grouped_expos_data: any;
  floor_info?: any;
}

export interface LandInfoItem {
  tpgrphHgCodeNm?: string;
  stdrYear?: string;
  lndcgrCodeNm?: string;
  roadSideCodeNm?: string;
  pblntfPclnd?: string;
  prposArea1Nm?: string;
  prposArea2Nm?: string;
  ladUseSittnNm?: string;
  ladSn?: string;
  tpgrphFrmCodeNm?: string;
  lastUpdtDt?: string;
  regstrSeCodeNm?: string;
  lndpclAr?: string;
  ldCode?: string;
  ldCodeNm?: string;
  mnnmSlno?: string;
  pnu?: string;
}

export type Address = {
  juso: string;
  njuso: string;
  nameFull: string; // Optional in case it's not always available

};
