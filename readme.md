# deeplink-solution-session-jsconf-2022

JSConf 2022 - 딥링크 솔루션 직접 만들어보기

워크샵에서 사용된 발표자료와 소스코드입니다.

각 단계별로 구현이 나누어 커밋되어 있어서 특정 커밋을 checkout 하는 것으로 단계를 건너띄는 것이 가능합니다.

example-app/app.json 의 ios applinks 의 subdomain 과 android intent-filter host 의 subdomain 을 자신의 Cloudflare Workers 서브도메인으로 교체하여 사용해주세요.

deeplink-test-page/source/constant/cloudflare.ts 의 subdomain 을 자신의 Cloudflare Workers 서브도메인으로 교체하여 사용해주세요.

워크샵 참가자가 아닌 경우, 직접 example-app 을 빌드해야 합니다. 앱을 빌드할 때 애플개발자계정 (맴버십필요) 및 Android Keystore 을 이용해 서명을 해야만 정상 테스트가 가능합니다. 그리고 http-deeplink-worker/source/constant/application.ts 의 애플개발자계정 Team ID 와 Android Keystore SHA256 Fingerprint 를 교체해서 빌드해야 합니다.

## 목표

- 딥링크가 무엇이지 이해합니다.
- 딥링크에는 어떤 문제들이 있는지 이해합니다.
- 이 문제들을 해결하는 딥링크 솔루션을 직접 개발합니다.

## 목차

1. 딥링크란 무엇인가?
2. 딥링크 솔루션 미리보기
3. HTTP 딥링크
4. Scheme 딥링크
5. 정리

## 소스코드

- example-app: 딥링크를 테스트하는데 활용할 expo 앱 입니다.
- http-deeplink-worker: HTTP 딥링크를 처리하는 Cloudflare Worker 입니다.
- scheme-deeplink-worker: Scheme 딥링크를 처리하는 Cloudflare Worker 입니다.