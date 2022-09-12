# example-app

딥링크 솔루션의 테스트용 앱입니다.

## 준비

app.json 의 `http-deeplink-worker.0xwof.workers.dev` 이 부분을 자신의 Cloudflare Workers 의 서브도메인에 맞게 수정해주세요.

## 빌드

```
eas build --profile preview
```