import { APPLICATION } from '../constant/application'

const createDependency = () => {}

createDependency.createMarketSchemeService = () => ({
    APPLICATION,
})

const createMarketSchemeService = (): MarketSchemeService => {
    const { APPLICATION } = createDependency.createMarketSchemeService()

    const renderStoreFallback = (deeplink: string) => `
        <script>
            var a = document.createElement('a');
            a.href = '${
                `market://details`
                + `?id=${APPLICATION.android.package}`
                + `&url=${encodeURIComponent(deeplink)}`
            }';
            a.click();
        </script>
    `

    return {
        renderStoreFallback,
    }
}

type MarketSchemeService = {
    renderStoreFallback: (deeplink: string) => string
}

export { createMarketSchemeService }
export type { MarketSchemeService }