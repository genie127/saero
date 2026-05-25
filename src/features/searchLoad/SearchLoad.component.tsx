'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface StudentInfo {
  address: string;
  schoolAddress: string;
}

interface Props {
  studentInfo: StudentInfo;
}

export const SearchLoad = ({ studentInfo }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = mapRef.current;

        if (!mapContainer) return;

        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 5,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const geocoder = new window.kakao.maps.services.Geocoder();

        // 집 주소 좌표 변환
        geocoder.addressSearch(
          studentInfo.address,
          (homeResult: any, homeStatus: string) => {
            if (
              homeStatus !== window.kakao.maps.services.Status.OK ||
              !homeResult.length
            ) {
              console.error('집 주소 변환 실패');
              return;
            }

            // 학교 주소 좌표 변환
            geocoder.addressSearch(
              studentInfo.schoolAddress,
              (schoolResult: any, schoolStatus: string) => {
                if (
                  schoolStatus !== window.kakao.maps.services.Status.OK ||
                  !schoolResult.length
                ) {
                  console.error('학교 주소 변환 실패');
                  return;
                }

                const homeCoords = new window.kakao.maps.LatLng(
                  homeResult[0].y,
                  homeResult[0].x
                );

                const schoolCoords = new window.kakao.maps.LatLng(
                  schoolResult[0].y,
                  schoolResult[0].x
                );

                // 지도 범위 설정
                const bounds = new window.kakao.maps.LatLngBounds();
                bounds.extend(homeCoords);
                bounds.extend(schoolCoords);
                map.setBounds(bounds);

                // 집 마커
                new window.kakao.maps.Marker({
                  map,
                  position: homeCoords,
                });

                // 학교 마커
                new window.kakao.maps.Marker({
                  map,
                  position: schoolCoords,
                });

                // 경로 라인
                const polyline = new window.kakao.maps.Polyline({
                  path: [homeCoords, schoolCoords],
                  strokeWeight: 5,
                  strokeColor: '#2563eb',
                  strokeOpacity: 0.9,
                  strokeStyle: 'solid',
                });

                polyline.setMap(map);
              }
            );
          }
        );
      });
    };

    // 이미 스크립트 있으면 바로 실행
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
      return;
    }

    // 카카오맵 스크립트 동적 로드
    const script = document.createElement('script');

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      loadKakaoMap();
    };
  }, [studentInfo.address, studentInfo.schoolAddress]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '500px',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    />
  );
};