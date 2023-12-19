# diary
- DEMO!!!!!! https://diary-virams-projects.vercel.app/v1r4m
- 이슈를 쓰면 예쁘게 다이어리로 퍼블리싱해주는 일기장
- 왜 굳이 이슈로 쓰냐면... 그게 '멋지니까'
- react minified error 는 천천히.. 핸들링하기 

## Quick Start
- create a repository name of `issue-diary-yourgithubuserid`
- so my example will be `issue-diary-v1r4m`, and the url is https://github.com/yourgithubuserid/issue-diary-yourgithubuserid
- On issue, write your first diary. The title of the issue must be one-character emoji.
- go to https://diary-two.vercel.app/yourgithubuserid and your diary will be ready right away.

## 생각해 볼 점
- 지난 날의 일기를 어떻게 쓸 수 있게 만들 것인가? 
    - 사실 생각해보면 깃헙 이슈연동은 순전히 내 욕심이자 부가기능이므로 깃험에서는 지난 날의 일기를 쓰지 않는다고 가정하는게 제일 맞는 것 같다. 

## 우선순위
- [ ] 모두가 쓸 수 있게 만들기 + 배포(홈 디렉터리에 리드미 연동)
- [ ] 캘린더 월요일 시작 / 일요일 시작 토글 기능 만들기
- [ ] timezone을 직접 지정할 수 있도록 만들기
- [ ] diary to issue 쌍방 업데이트 가능하게 만들기
- [ ] private diary 작성 가능하게 만들기
- [ ] 지난 날의 일기 쓸 수 있게 만들기
- [ ] 일기 백업 및 불러오기 가능하게 만들기
- [ ] 깃헙 이슈 기능을 사용하는 만큼, Jekyll 블로그처럼 댓글 기능을 만들 것인지 고민하기

## 배포시
- 코드를 똑같이 가져가되 기준 레포지토리만 `diary`에서 `issue-diary-v1r4m`으로 변경할 것