module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Next.js 경로
    "./public/index.html",       // 일반 HTML 파일 경로
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // 원하는 primary 색상
        "primary-foreground": "#FFFFFF", // 버튼의 텍스트 색상
        ring: "#3B82F6", // 링 효과 색상
      },
      translate: {
        '44': '176px', // -translate-y-45 를 180px으로 설정
      },
      height: {
        '88': '352px', // h-88 클래스를 352px로 설정
      },
    },
  },
  plugins: [],
};
