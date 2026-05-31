import { getAccident } from '@/shared/services/getAccident';
import { getCctv } from '@/shared/services/getCctv';
import { useEffect, useState } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}


interface MapAnalysisData {
accidentCount: number;
cctvCount: number;
illegalParkingCount: number;
}


interface StudentInfo {
    address: string;
    schoolAddress: string;
    local:string
    code:string
}

interface UseSearchLoadProps {
    studentInfo: StudentInfo;
    mapRef: React.RefObject<HTMLDivElement | null>;
}

export const useSearchLoad = ({
        studentInfo,
        mapRef,
    }: UseSearchLoadProps) => {

        
    const [analysisData, setAnalysisData] =
        useState<MapAnalysisData | null>(null);

    useEffect(() => {
        const loadKakaoMap = () => {

            if (!window.kakao) {
                console.error('window.kakao 없음');
                return;
            }

            if (!window.kakao.maps) {
                console.error('window.kakao.maps 없음');
                return;
            }


            window.kakao.maps.load(() => {

                const mapContainer = mapRef.current;

                if (!mapContainer) {
                    console.error('mapContainer 없음');
                    return;
                }

                const mapOption = {
                    center: new window.kakao.maps.LatLng(
                        37.5665,
                        126.978
                    ),
                    level: 5,
                };

                const map = new window.kakao.maps.Map(
                    mapContainer,
                    mapOption
                );

                const geocoder =
                    new window.kakao.maps.services.Geocoder();


                geocoder.addressSearch(
                    studentInfo.address,
                    (homeResult: any, homeStatus: string) => {

                        if (
                            homeStatus !==
                                window.kakao.maps.services.Status
                                    .OK ||
                            !homeResult.length
                        ) {
                            console.error(
                                '집 주소 변환 실패'
                            );
                            return;
                        }

                        geocoder.addressSearch(
                            studentInfo.schoolAddress,
                           async (
                                schoolResult: any,
                                schoolStatus: string
                            ) => {

                                if (
                                    schoolStatus !==
                                        window.kakao.maps
                                            .services.Status
                                            .OK ||
                                    !schoolResult.length
                                ) {
                                    console.error(
                                        '학교 주소 변환 실패'
                                    );
                                    return;
                                }

                                const homeCoords =
                                    new window.kakao.maps.LatLng(
                                        homeResult[0].y,
                                        homeResult[0].x
                                    );

                              const schoolCoords =
                                    new window.kakao.maps.LatLng(
                                        schoolResult[0].y,
                                        schoolResult[0].x
                                    );

                            // CCTV 조회

                            const cctvData = await getCctv(studentInfo.local);

                            const cctvList =
                                cctvData.response.body.items.item ?? [];
                                
                            const bounds =
                                    new window.kakao.maps.LatLngBounds();

                                bounds.extend(homeCoords);
                                bounds.extend(schoolCoords);

                                map.setBounds(bounds);

                                new window.kakao.maps.Marker({
                                    map,
                                    position: homeCoords,
                                });

                                new window.kakao.maps.Marker({
                                    map,
                                    position: schoolCoords,
                                });

                                
                            cctvList.forEach((cctv: any) => {
                                const marker = new window.kakao.maps.Marker({
                                    map,
                                    position: new window.kakao.maps.LatLng(
                                        Number(cctv.WGS84_LAT),
                                        Number(cctv.WGS84_LOT)
                                    ),
                                });

                                const infoWindow =
                                    new window.kakao.maps.InfoWindow({
                                        content: `
                                            <div style="padding:5px;">
                                                ${cctv.LCTN_ROAD_NM_ADDR}
                                            </div>
                                        `,
                                    });

                                window.kakao.maps.event.addListener(
                                    marker,
                                    'click',
                                    () => {
                                        infoWindow.open(map, marker);
                                    }
                                );
                            });
                                console.log(cctvData)

                            
                            // 사고 조회

                            const accidentData = await getAccident(studentInfo.code.substring(0,2), studentInfo.code.substring(2,5));
                             const accidentList =
                                accidentData.items.item ?? [];

                                console.log(accidentList)
                                
                                
                            accidentList.forEach((cctv: any) => {
                                const marker = new window.kakao.maps.Marker({
                                    map,
                                    position: new window.kakao.maps.LatLng(
                                        Number(cctv.WGS84_LAT),
                                        Number(cctv.WGS84_LOT)
                                    ),
                                });

                                const infoWindow =
                                    new window.kakao.maps.InfoWindow({
                                        content: `
                                            <div style="padding:5px;">
                                                ${cctv.LCTN_ROAD_NM_ADDR}
                                            </div>
                                        `,
                                    });

                                window.kakao.maps.event.addListener(
                                    marker,
                                    'click',
                                    () => {
                                        infoWindow.open(map, marker);
                                    }
                                );
                            });
                            

                            setAnalysisData({
                            accidentCount: accidentList.length,
                            cctvCount: cctvList.length,
                            illegalParkingCount: 0, // 나중에 안전신고 API 붙이면 추가
                            });


                                
                                const polyline =
                                    new window.kakao.maps.Polyline({
                                        path: [
                                            homeCoords,
                                            schoolCoords,
                                        ],
                                        strokeWeight: 5,
                                        strokeColor:
                                            '#2563eb',
                                        strokeOpacity: 0.9,
                                        strokeStyle:
                                            'solid',
                                    });

                                polyline.setMap(map);

                            }
                        );
                    }
                );
            });
        };

        if (window.kakao?.maps) {
            loadKakaoMap();
            return;
        }
        const script = document.createElement('script');

        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;

        script.async = true;

        script.onload = () => {
            loadKakaoMap();
        };

        script.onerror = (e) => {
            console.error(
                '카카오 스크립트 로드 실패',
                e
            );
        };

        document.head.appendChild(script);

       

        return () => {
            console.log('SearchLoad unmount');
        };
    }, [studentInfo.address, studentInfo.schoolAddress]);
    

    return {
        analysisData,
    };   
    
}