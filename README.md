# Repository
### 1. config/ - 개발/배포 모드 설정<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key 모드 분기 후 export<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;development 개발모드 포트번호 export<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;production 배포모드 포트번호 export<br>

### 2. logs/ - logging 파일 경로<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error/ 에러(500) 로그 파일<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wran/ 주의(400) 로그 파일<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*.log 정상(200) 로그 파일<br>

### 3. module/ - DB 연결, 페이지별 GET/POST 방식 처리(CRUD), 암호화(crypto.js), 로깅(winston.js)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;crypto 사용자 비밀번호 암호화 및 암호비교<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;db_conn DB 연결 및 페이지 연결<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delete 사용자 정보 삭제 처리<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;edit 사용자 정보 수정 처리<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;login 사용자 정보 검색(로그인) 처리<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logout 로그아웃 및 쿠키/세션 삭제 처리<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;main 정상 로그인 보여질 화면 처리<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;regist 사용자 정보 삽입(회원가입) 처리<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;winston 로그 파일 생성 및 저장 처리<br>

### 4. public/ - 정적(static) 파일(css, js)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;css 정적 페이지 스타일<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;js 회원가입 유효성검사 스크립트<br>

### 5. views - 뷰 템플릿(html)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delete 회원 탈퇴 페이지<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;edit 회원 정보 수정 페이지<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;login 로그인 페이지<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;main 메인 페이지<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;regist 회원 가입 페이지<br>

### 6. app.js - node 서버 실행 및 모듈 설정 파일<br>
