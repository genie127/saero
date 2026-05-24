'use client';

import Script from 'next/script';
import { useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

export default function AddressSearch() {
  const [address, setAddress] = useState('');

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setAddress(data.address);
      },
    }).open();
  };

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />

      <input value={address} readOnly placeholder="주소를 검색하세요" />
      <button type="button" onClick={openPostcode}>
        주소 찾기
      </button>
    </>
  );
}