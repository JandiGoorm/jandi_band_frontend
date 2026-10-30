![Presentation](https://github.com/user-attachments/assets/812d8060-0b3d-412a-bc33-cfc6c6767eb5)
![Presentation (4)](https://github.com/user-attachments/assets/bc12c78a-4ba9-4fe3-9d6d-37fa5d984f16)
![Presentation (5)](https://github.com/user-attachments/assets/3606e8bb-d95a-4f5f-b07f-6f05ea7fd179)

<h2 align="center"> RhythMeet : 밴드부를 위한 연습 일정, 곡 선정 통합 플랫폼 </h2>

## 로컬 환경변수

이 저장소 루트의 `.env.example`을 `.env.local`로 복사한다. `VITE_*` 값은 프론트 개발 서버에서 사용하며, 실제 `.env.local`은 Git에 올리지 않는다. 카카오 로그인·지도·공유를 사용할 때는 관리자에게 같은 카카오 앱의 키와 localhost 설정을 확인한다.

```powershell
Copy-Item .env.example .env.local
```

프론트·Spring·FastAPI·MySQL을 함께 실행하는 Docker 구성은 [백엔드의 로컬 개발 안내](https://github.com/JandiGoorm/jandi_band_backend#로컬-개발-프론트엔드springfastapimysql을-docker로-실행)를 참고한다. 각 저장소를 같은 부모 폴더에 두며, 백엔드와 FastAPI 환경 파일도 각각의 저장소에서 관리한다.

<img width="1332" height="1089" alt="유저_플로우" src="https://github.com/user-attachments/assets/efffe4c9-dee5-410b-925a-87c9d5e6b317" />
