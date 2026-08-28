# El Noh — Academic Homepage

공주대학교 대기과학과 박사후연구원 **노엘(El Noh)**의 개인 연구 홈페이지 소스입니다.
빌드 도구 없이 순수 HTML / CSS / JavaScript 로만 만들어져 있어, 파일을 저장하고
push 하면 그대로 배포됩니다.

---

## 파일 구조

```
homepage_noel/
├── index.html              ← 홈페이지 본문 (여기만 고치면 내용이 바뀝니다)
├── assets/
│   ├── css/style.css       ← 색·글꼴·여백 등 디자인
│   └── js/main.js          ← 다크모드 토글, EN/KO 전환, 내비게이션
├── images/                 ← 사진과 연구 그림 (지금은 자리표시자)
│   ├── profile-placeholder.svg
│   └── research-1~4-placeholder.svg
├── cv/CV_Noh.pdf           ← 홈페이지에서 다운로드되는 CV
├── research/               ← 논문 원문 PDF (기본적으로 업로드 제외, .gitignore 참고)
├── .nojekyll               ← GitHub Pages 가 Jekyll 처리를 건너뛰게 함
└── .gitignore
```

---

## 자주 바꾸게 되는 것

| 하고 싶은 일 | 고칠 곳 |
|---|---|
| 프로필 사진 넣기 | `images/profile.jpg` 저장 → `index.html` 의 `images/profile-placeholder.svg` 를 `images/profile.jpg` 로 변경 |
| 연구 그림 넣기 | `images/research-1.png` 등 저장 → 각 카드의 `<img src="...">` 변경 |
| 논문 추가 | `index.html` 의 `<!-- Peer-reviewed -->` 아래 `<li class="pub">` 블록 복사 후 수정 |
| 색 바꾸기 | `assets/css/style.css` 맨 위 `:root { --accent: ... }` |
| 프로필 링크 추가/삭제 | `index.html` 의 `<a class="pill">` 블록을 복사 또는 삭제 |
| 한국어 문구 수정 | `<span class="lang-ko">` 안의 내용 |
| 영어 문구 수정 | `<span class="lang-en">` 안의 내용 |

> **EN/KO 전환 원리** — 같은 자리에 `lang-en` / `lang-ko` 두 요소를 나란히 두고,
> CSS가 현재 언어에 맞는 쪽만 보여줍니다. 새 문장을 넣을 때도 두 벌을 나란히 쓰면 됩니다.

---

## 로컬에서 미리보기

파일을 더블클릭해서 열어도 대부분 잘 보이지만, 정식으로 확인하려면:

```bash
cd ~/SynologyDrive/Mac/Others/homepage_noel
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

---

## 확인이 필요한 항목 (TODO)

- [ ] 프로필 사진 촬영 후 `images/profile.jpg` 로 교체
- [ ] 연구 그림 4장 교체
- [x] Google Scholar / ORCID / GitHub 링크 연결
- [ ] `Environmental Pollution` 논문 DOI 확인 (`10.1016/j.envpol.2021.118051` — 규칙으로 추정한 값)
- [x] Open Graph `og:url` 설정 (`og:image` 는 사진 업로드 후 주석 해제)
- [ ] `research/` PDF 공개 여부 결정 (저널 저작권 정책 확인)

---

## GitHub Pages 배포 요약

저장소: **`noel-dyn/noel-dyn.github.io`** → 사이트 주소: **https://noel-dyn.github.io**

처음 한 번만:

```bash
cd ~/SynologyDrive/Mac/Others/homepage_noel
git init -b main
git config user.name "El Noh"
git config user.email "noel.modny@gmail.com"
git add .
git commit -m "Initial homepage"
git remote add origin https://github.com/noel-dyn/noel-dyn.github.io.git
git push -u origin main
```

그 다음 GitHub 저장소에서 `Settings → Pages → Source: Deploy from a branch → main / (root)` 저장.

이후 수정할 때마다:

```bash
git add .
git commit -m "무엇을 바꿨는지 한 줄"
git push
```

---

## 링크

- 사이트: https://noel-dyn.github.io
- Google Scholar: https://scholar.google.com/citations?user=WfQKq7wAAAAJ
- ORCID: https://orcid.org/0000-0001-5550-7747
- GitHub: https://github.com/noel-dyn
