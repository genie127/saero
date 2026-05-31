'use client';

import Script from 'next/script';

declare global {
  interface Window {
    daum: any;
  }
}

interface Props {
  value: string;
  onChangeAddress: (address: string) => void;
  code: string
  onChangeCode: (code: string) => void
  local: string
  onChangeLocal: (local: string) => void
}

export default function AddressSearch({
  value,
  onChangeAddress,
  code,
  onChangeCode,
  local,
  onChangeLocal,
}: Props) {
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        onChangeAddress(data.address);
         onChangeCode(data.bcode);

         let sido = '';

          if(data.sido == '서울'){
            sido =  data.sido+='특별시'
          }else if(data.sido =='인천' || data.sido =='부산'|| data.sido =='대구'|| data.sido =='광주'|| data.sido =='대전'|| data.sido =='울산'){
            sido = data.sido+='광역시'
          }else if(data.sido == '세종특별자치시' ||data.sido == '강원특별자치도'  ||data.sido == '전북특별자치도'||data.sido == '제주특별자치도'){
            sido = data.sido
          }else if(data.sido == '전남'){
            sido = '전라남도'
          }else if(data.sido == '경북'){
            sido = '경상북도'
          }else if(data.sido == '경남'){
            sido = '경상남도'
          }else if(data.sido == '충북'){
            sido = '충청북도'
          }else if(data.sido == '충남'){
            sido = '충청남도'
          }else{
            sido = data.sido+'도'
          }

         onChangeLocal(sido +' ' + data.sigungu);
      },
    }).open();

  };

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />

      <input
        value={value}
        readOnly
        placeholder="주소를 검색하세요"
        required
      />
      <input type="hidden" value={code} />
      <input type="hidden" value={local} />

      <button
        type="button"
        onClick={openPostcode}
         className='btn_search'
      >
        주소 찾기
      </button>
    </>
  );
}