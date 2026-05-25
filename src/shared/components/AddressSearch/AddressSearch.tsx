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
}

export default function AddressSearch({
  value,
  onChangeAddress,
}: Props) {
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        onChangeAddress(data.address);
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
      />

      <button
        type="button"
        onClick={openPostcode}
      >
        주소 찾기
      </button>
    </>
  );
}