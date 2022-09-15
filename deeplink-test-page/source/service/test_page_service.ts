import { CLOUDFLARE } from '../constant/cloudflare'

const createDependency = () => {}

createDependency.createTestPageService = () => ({
    CLOUDFLARE,
})

const createTestPageService = (): TestPageService => {
    const { CLOUDFLARE } = createDependency.createTestPageService()

    const httpDeeplink = `https://http-deeplink-worker.${CLOUDFLARE.subdomain}`
    const httpDeeplinkStoreFallback = `https://http-deeplink-worker.${CLOUDFLARE.subdomain}/?store_fallback=true`
    const httpDeeplinkWebFallback = `https://http-deeplink-worker.${CLOUDFLARE.subdomain}/?web_fallback=https%3A%2F%2F2022.jsconf.kr`

    const redirectLink = (url: string) => `http://deeplink-test-page.${CLOUDFLARE.subdomain}/redirect?location=${encodeURIComponent(`${url}`)}`

    const render = () => `
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width initial-scale=1">
        <style>a{font-size:20px;font-family:sans-serif}</style>

        <h1>test http deeplink</h1>
        <li><a href="${httpDeeplink}">${httpDeeplink}</a></li>
        <li><a href="${redirectLink(httpDeeplink)}">redirect to http deeplink</a></li>

        <h1>test http deeplink - fallback</h1>
        <li><a href="${httpDeeplinkStoreFallback}">${httpDeeplinkStoreFallback}</a></li>
        <li><a href="${httpDeeplinkWebFallback}">${httpDeeplinkWebFallback}</a></li>
        <li><a href="${redirectLink(httpDeeplinkStoreFallback)}">redirect to http deeplink store fallback</a></li>
        <li><a href="${redirectLink(httpDeeplinkWebFallback)}">redirect to http deeplink web fallback</a></li>
    `

    return {
        render,
    }
}

type TestPageService = {
    render: () => string
}

export { createTestPageService }
export type { TestPageService }