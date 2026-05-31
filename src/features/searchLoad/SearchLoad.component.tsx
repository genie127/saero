'use client'
import './searchLoad.scss'
import { useEffect, useState } from "react";
import { KakaoMap } from "./components/Kakaomap.component";
import { createMapAnalysisPrompt } from "@/prompts/MapAnalysis.prompt";
import Link from 'next/link';

interface AnalysisData {
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
}

export const SearchLoad = ({ studentInfo }: Props) => {
	const [analysis, setAnalysis] = useState(''); 
	const [loading, setLoading] = useState(true);
	const [analysisData, setAnalysisData] =
  		useState<AnalysisData | null>(null);


	useEffect(() => {
		if (!analysisData) return;

		const fetchAnalysis = async () => {
			try {

			const promptTxt = createMapAnalysisPrompt({
				accidentCount: analysisData.accidentCount,
				cctvCount: analysisData.cctvCount,
				illegalParkingCount:
				analysisData.illegalParkingCount,
			});

			const res = await fetch(
				'/api/ai/analyzeMap',
				{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					promptTxt,
				}),
				}
			);

			const data = await res.json();


			setAnalysis(data.text);

			setAnalysis(data.text);

			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchAnalysis();

		}, [analysisData]);


	return (
		<div className='searchLoad'>
			<KakaoMap
				studentInfo={studentInfo}
				onAnalysisData={setAnalysisData}
			/>

			<div className="coaching">
				<p>{loading ? '로딩중' : analysis}</p>
			</div>




			<Link href="/dashboard" className='btn_next'>대시보드 화면으로</Link>
		</div>
	);
};

