import { STORE } from '../constant/store'
import { createUserAgent } from '../utility/user_agent'

const createDependency = () => {}

createDependency.createCustomURLSchemeService = () => ({
    STORE,
})

const createCustomURLSchemeService = (): CustomURLSchemeService => {
    const { STORE } = createDependency.createCustomURLSchemeService()

    const renderStoreFallback = (deeplink: string, userAgent: string) => `
        <script>
            var a = document.createElement('a');
            a.href = '${deeplink}';
            a.click();
            setTimeout(function () {
                var a = document.createElement('a');
                a.href = '${
                    createUserAgent(userAgent).os == 'ios' ? STORE.ios
                    : STORE.android
                }';
                a.click();
            }, 100);
        </script>
    `

    const renderWebFallback = (deeplink: string, fallback: string) => `
        <script>
            var a = document.createElement('a');
            a.href = '${deeplink}';
            a.click();
            setTimeout(function () {
                var a = document.createElement('a');
                a.href = '${fallback}';
                a.click();
            }, 100);
        </script>
    `

    return {
        renderStoreFallback,
        renderWebFallback,
    }
}

type CustomURLSchemeService = {
    renderStoreFallback: (deeplink: string, userAgent: string) => string
    renderWebFallback: (deeplink: string, fallback: string) => string
}

export { createCustomURLSchemeService }
export type { CustomURLSchemeService }