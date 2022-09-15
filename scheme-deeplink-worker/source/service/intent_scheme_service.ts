import { APPLICATION } from '../constant/application'

const createDependency = () => {}

createDependency.createIntentSchemeService = () => ({
    APPLICATION,
})

const createIntentSchemeService = (): IntentSchemeService => {
    const { APPLICATION } = createDependency.createIntentSchemeService()

    const renderStoreFallback = (deeplink: string) => `
        <script>
            var a = document.createElement('a');
            a.href = '${
                `intent://details`
                + `?id=${APPLICATION.android.package}`
                + `&url=${encodeURIComponent(deeplink)}`
                + `#Intent;`
                + `scheme=market;`
                + `package=com.android.vending;`
                + `end;`
            }';
            a.click();
        </script>
    `

    const renderWebFallback = (deeplink: string, fallback: string) => {
        const deeplinkURL = new URL(deeplink)

        return `
            <script>
                var a = document.createElement('a');
                a.href = '${
                    deeplink.replace(/^[^:]*\:/, 'intent:')
                    + `#Intent;`
                    + `scheme=${deeplinkURL.protocol};`
                    + `package=${APPLICATION.android.package};`
                    + `S.browser_fallback_url=${encodeURIComponent(fallback)};`
                    + `end;`
                }';
                a.click();
            </script>
        `
    }

    return {
        renderStoreFallback,
        renderWebFallback,
    }
}

type IntentSchemeService = {
    renderStoreFallback: (deeplink: string) => string
    renderWebFallback: (deeplink: string, fallback: string) => string
}

export { createIntentSchemeService }
export type { IntentSchemeService }