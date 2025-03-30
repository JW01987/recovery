require("dotenv").config({ path: ".env.test" });
module.exports = {
  preset: "ts-jest", // ts-jest 사용
  testEnvironment: "node", // 테스트 환경 설정
  transform: {
    "^.+\\.tsx?$": "ts-jest", // TypeScript 파일 처리
  },
  // 추가 설정 (필요한 경우)
  moduleFileExtensions: ["ts", "tsx", "js"], // 파일 확장자 설정
};
