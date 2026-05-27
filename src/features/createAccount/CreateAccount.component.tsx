'use client'

import AddressSearch from "@/shared/components/AddressSearch/AddressSearch";
import { useRouter } from "next/navigation";
import { useState } from "react";

type School = {
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  ORG_RDNMA: string;
  ATPT_OFCDC_SC_CODE: string
};

type FormState = {
  studentName: string;
  address: string;
  schoolName: string;
  schoolCode: string;
  schoolAddress: string;
  grade: string;
  class: string;
  atpt:string,
  schul:string,
};

export const CreateAccount = () => {

  const [schools, setSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
    const {replace} = useRouter();
  const [form, setForm] = useState<FormState>({
    studentName: "",
    address: "",
    schoolName: "",
    schoolCode: "",
    schoolAddress: "",
    grade: "",
    class: "",
    atpt:'',
    schul:'',
  });

  // 학교 검색
  async function onSearch() {
    if (!searchTerm.trim()) return;

    const res = await fetch(`/api/school?keyword=${searchTerm}`);
    const data = await res.json();

    setSchools(data);
  }

  // 학교 선택
  function handleSelectSchool(school: School) {
    setForm(prev => ({
      ...prev,
      schoolName: school.SCHUL_NM,
      schoolCode: school.SD_SCHUL_CODE,
      schoolAddress: school.ORG_RDNMA,
      atpt: school.ATPT_OFCDC_SC_CODE,
    }));

    setSearchTerm(school.SCHUL_NM);
    setSchools([]);
  }

  // 쿠키 저장
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 간단 검증
    if (!form.studentName || !form.schoolName) {
      alert("필수 정보를 입력해주세요.");
      return;
    }

    const value = encodeURIComponent(JSON.stringify(form));

    document.cookie = `studentInfo=${value}; path=/; max-age=86400`; // 1일 유지

    replace('/dashboard');
  }

  return (
    <div className="tit_sec">
      <div>
        <h2>우리 아이의 정보를 입력해주세요.</h2>
        <p>초등학교 시작을 돕는 꼭 필요한 정보예요.</p>
      </div>

      <form className="info_sec" onSubmit={handleSubmit}>

        <p>
          <label>아이의 이름</label>
          <input
            type="text"
            value={form.studentName}
            onChange={(e) =>
              setForm(prev => ({ ...prev, studentName: e.target.value }))
            }
          />
        </p>

        <p>
          <label>집 주소</label>
          <AddressSearch
            value={form.address}
            onChangeAddress={(address) =>
              setForm(prev => ({
                ...prev,
                address,
              }))
            }
          />
        </p>

        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="학교명 입력"
          />

          <ul>
             {schools.map(school => {
                console.log(school.ORG_RDNMA);
                return(
                  <li key={school.SD_SCHUL_CODE}>
                    <button
                      type="button"
                      onClick={() => handleSelectSchool(school)}
                    >
                      <p>{school.SCHUL_NM}</p>
                      <p>{school.ORG_RDNMA}</p>
                    </button>
                  </li>
                )
              })}
          </ul>

          <button type="button" onClick={onSearch}>
            검색
          </button>
        </div>

        <div className="grade">
          <p>
            <label>학년</label>
            <input
              type="text"
              value={form.grade}
              onChange={(e) =>
                setForm(prev => ({ ...prev, grade: e.target.value }))
              }
            />
          </p>
          <p>
            <label>반</label>
            <input
              type="text"
              value={form.class}
              onChange={(e) =>
                setForm(prev => ({ ...prev, class: e.target.value }))
              }
            />
          </p>
        </div>

        <button type="submit">
          정보 저장하고 시작하기
        </button>
      </form>
    </div>
  );
};
