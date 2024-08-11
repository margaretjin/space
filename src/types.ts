// types.ts

// 각 호의 정보를 나타내는 인터페이스입니다.
export interface ExposInfoItem {
  exposPubuseGbCdNm: string;  // 노출 사용 구분 코드 이름
  flrNoNm: string;            // 층 번호 이름
  area: number;               // 면적
  etcPurps: string;           // 기타 용도
  mainPurpsCdNm: string;      // 주요 용도 코드 이름
  activeDong: string;         // 활성 동
  activeFloor: string;        // 활성 층
  hoNm: string;               // 호 번호
}

// 건물의 총괄 정보를 나타내는 인터페이스입니다.
export interface BuildingTotal {
  archArea: number;           // 건축 면적
  atchBldArea: number;        // 부속 건물 면적
  atchBldCnt: number;         // 부속 건물 수
  bcRat: number;              // 건폐율
  bjdongCd: number;           // 법정동 코드
  bldNm: string;              // 건물 이름
  block: string;              // 블록
  bun: string;                // 번지
  bylotCnt: number;           // 필지 수
  crtnDay: string;            // 생성 날짜
  engrEpi: number;            // 에너지 효율 지표
  engrGrade: string;          // 에너지 등급
  engrRat: number;            // 에너지 비율
  etcPurps: string;           // 기타 용도
  fmlyCnt: number;            // 세대 수
  gnBldCert: number;          // 일반 건물 인증
  gnBldGrade: string;         // 일반 건물 등급
  hhldCnt: number;            // 가구 수
  hoCnt: number;              // 호 수
  indrAutoArea: number;       // 실내 자동화 면적
  indrAutoUtcnt: number;      // 실내 자동화 유닛 수
  indrMechArea: number;       // 실내 기계화 면적
  indrMechUtcnt: number;      // 실내 기계화 유닛 수
  itgBldCert: number;         // 통합 건물 인증
  itgBldGrade: string;        // 통합 건물 등급
  ji: string;                 // 지번
  lot: string;                // 로트
  mainBldCnt: number;         // 주요 건물 수
  mainPurpsCd: string;        // 주요 용도 코드
  mainPurpsCdNm: string;      // 주요 용도 코드 이름
  mgmBldrgstPk: string;       // 건물 관리 등록 키
  naBjdongCd: number;         // 행정동 코드
  naMainBun: number;          // 행정동 메인 번지
  naRoadCd: number;           // 도로 코드
  naSubBun: number;           // 행정동 서브 번지
  naUgrndCd: number;          // 지하 코드
  newOldRegstrGbCd: number;   // 신구 등록 구분 코드
  newOldRegstrGbCdNm: string; // 신구 등록 구분 코드 이름
  newPlatPlc: string;         // 신설된 도로명
  oudrAutoArea: number;       // 실외 자동화 면적
  oudrAutoUtcnt: number;      // 실외 자동화 유닛 수
  oudrMechArea: number;       // 실외 기계화 면적
  oudrMechUtcnt: number;      // 실외 기계화 유닛 수
  platArea: number;           // 대지 면적
  platGbCd: number;           // 대지 구분 코드
  platPlc: string;            // 대지 위치
  pmsDay: string;             // 허가 날짜
  pmsnoGbCd: string;          // 허가 번호 구분 코드
  pmsnoGbCdNm: string;        // 허가 번호 구분 코드 이름
  pmsnoKikCd: string;         // 허가 기관 코드
  pmsnoKikCdNm: string;       // 허가 기관 코드 이름
  pmsnoYear: string;          // 허가 연도
  regstrGbCd: number;         // 등록 구분 코드
  regstrGbCdNm: string;       // 등록 구분 코드 이름
  regstrKindCd: number;       // 등록 종류 코드
  regstrKindCdNm: string;     // 등록 종류 코드 이름
  rnum: number;               // 행 번호
  sigunguCd: number;          // 시군구 코드
  splotNm: string;            // 대지 이름
  stcnsDay: string;           // 착공 날짜
  totArea: number;            // 총 면적
  totPkngCnt: number;         // 총 주차 공간 수
  useAprDay: string;          // 사용 승인 날짜
  vlRat: number;              // 용적률
  vlRatEstmTotArea: number;   // 용적률 평가 총 면적
  dongNm: string;             // 동 이름
}

// 부수적인 건물 정보를 나타내는 인터페이스입니다.
export interface SideInfoType {
  vlRatEstmTotArea: number;
  dongNm: string;
}

// 건물 표제부의 각 항목을 나타내는 타입입니다.
export type BuildingTitleItem = {
  hhldCnt: number;            // 가구 수
  vlRat: number;              // 용적률
  platArea: number;           // 대지 면적
  ugrndFlrCnt:number;         // 지하 층 수
  heit: number;               // 건물 높이
  archArea: number;           // 건축 면적
  atchBldArea: number;        // 부속 건물 면적
  atchBldCnt: number;         // 부속 건물 수
  bcRat: number;              // 건폐율
  bjdongCd: number;           // 법정동 코드
  bldNm: string;              // 건물 이름
  mainPurpsCdNm: string;      // 주요 용도 코드 이름
  totArea: string;            // 총 면적
  etcPurps: string;           // 기타 용도
  regstrKindCdNm: string;     // 등록 종류 코드 이름
  dongNm: string;             // 동 이름
  grndFlrCnt: number;         // 지상 층 수
}

// 건물 정보를 나타내는 인터페이스입니다.
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
  grouped_expos_data: any;      // 전유부 데이터를 그룹화한 정보
  floor_info?: any;             // 층별 정보 (선택적)
}

// 토지 정보를 나타내는 인터페이스입니다.
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

// 주소 정보를 나타내는 타입입니다.
export type Address = {
  juso: string;
  njuso: string;
  nameFull: string; // 선택적 속성으로, 이름이 항상 제공되지 않을 수도 있음
};

// 건물 전유부 정보를 나타내는 인터페이스입니다.
export interface BuildingExposInfo {
  [dong: string]: {
      [floor: string]: {
          [ho: string]: ExposInfoItem[];
      };
  };
}
