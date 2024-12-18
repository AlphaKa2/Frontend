// src/utils/getImageForLocation.js

// 이미지 파일 임포트
import SeoulImage from '../assets/images/Seoul.png'; // 서울 특별시
import BusanImage from '../assets/images/Busan.png'; // 부산 광역시
import DaeguImage from '../assets/images/Daegu.png'; // 대구 광역시
import IncheonImage from '../assets/images/Incheon.png'; // 인천 광역시
import GwangjuImage from '../assets/images/Gwangju.png'; // 광주 광역시
import DaejeonImage from '../assets/images/Daejeon.png'; // 대전 광역시
import UlsanImage from '../assets/images/Ulsan.png'; // 울산 광역시
import SejongImage from '../assets/images/Sejong.png'; // 세종 특별자치시
import GyeonggiImage from '../assets/images/Gyeonggi.png'; // 경기도
import GangwonImage from '../assets/images/Gangwon.png'; // 강원도
import ChungbukImage from '../assets/images/Chungbuk.png'; // 충청북도
import ChungnamImage from '../assets/images/Chungnam.png'; // 충청남도
import JeonbukImage from '../assets/images/Jeonbuk.png'; // 전라북도
import JeonnamImage from '../assets/images/Jeonnam.png'; // 전라남도
import GyeongbukImage from '../assets/images/Gyeongbuk.png'; // 경상북도
import GyeongnamImage from '../assets/images/Gyeongnam.png'; // 경상남도
import JejuImage from '../assets/images/Jeju.png'; // 경상남도
import DefaultImage from '../assets/images/yt.png'; // 기본 이미지

// 지역 데이터
const locationData = {
  "경기": ["수원", "성남", "안양", "부천", "광명", "평택", "안산", "고양", "과천", "의왕", "구리", "남양주", "오산", "시흥", "군포", "의정부", "김포", "화성"],
  "강원": ["춘천", "원주", "강릉", "동해", "속초", "삼척", "홍천", "평창", "정선", "인제", "양양", "고성", "영월"],
  "충북": ["청주", "충주", "제천", "보은", "옥천", "영동", "진천", "괴산", "음성", "단양"],
  "충남": ["천안", "공주", "보령", "아산", "서산", "논산", "계룡", "당진", "부여", "태안"],
  "전북": ["전주", "군산", "익산", "정읍", "남원", "김제", "완주", "순창", "부안"],
  "전남": ["목포", "여수", "순천", "나주", "광양", "구례", "고흥", "보성", "장흥", "해남"],
  "경북": ["포항", "경주", "안동", "구미", "영주", "경산", "청도", "영덕", "성주", "울진"],
  "경남": ["창원", "진주", "통영", "고성", "사천", "김해", "밀양", "거제", "양산", "하동", "남해"],
};

// 특별시, 광역시, 특별자치시 이미지 매핑
const specialCityImages = {
  "서울": SeoulImage,
  "부산": BusanImage,
  "대구": DaeguImage,
  "인천": IncheonImage,
  "광주": GwangjuImage,
  "대전": DaejeonImage,
  "울산": UlsanImage,
  "세종": SejongImage,
  "제주": JejuImage,
};

// 유틸리티 함수
const getImageForLocation = (titleOrTravelName) => {
    if (!titleOrTravelName) return DefaultImage;
  
    // 특별시, 광역시, 특별자치시 체크
    for (const [city, image] of Object.entries(specialCityImages)) {
      if (titleOrTravelName.includes(city)) {
        return image;
      }
    }
  
    // 도 단위 및 시/군 매핑 체크
    for (const [province, cities] of Object.entries(locationData)) {
      if (cities.some((region) => titleOrTravelName.includes(region))) {
        switch (province) {
          case "경기":
            return GyeonggiImage;
          case "강원":
            return GangwonImage;
          case "충북":
            return ChungbukImage;
          case "충남":
            return ChungnamImage;
          case "전북":
            return JeonbukImage;
          case "전남":
            return JeonnamImage;
          case "경북":
            return GyeongbukImage;
          case "경남":
            return GyeongnamImage;
          case "제주":
            return JejuImage;
          case "인천":
            return IncheonImage;
          case "부산":
            return BusanImage;
          default:
            return DefaultImage;
        }
      }
    }
  
    // 매칭되지 않는 경우 기본 이미지 반환
    console.warn(`No specific image match found for: ${titleOrTravelName}`);
    return DefaultImage;
  };
  
  export default getImageForLocation;
