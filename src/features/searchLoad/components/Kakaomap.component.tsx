'use client';

import { useEffect, useRef } from 'react';
import { useSearchLoad } from '../hooks/useSearchLoad.hooks';
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

interface Props {
  studentInfo: StudentInfo;
  onAnalysisData: (data: MapAnalysisData) => void;
}

export const KakaoMap = ({
  studentInfo,
  onAnalysisData,
}: Props) => {

  const mapRef = useRef<HTMLDivElement>(null);

  const { analysisData } = useSearchLoad({
    studentInfo,
    mapRef,
  });

  useEffect(() => {
    if (analysisData) {
      onAnalysisData(analysisData);
    }
  }, [analysisData]);
  
        useSearchLoad({
            studentInfo,
            mapRef,
        });

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
}