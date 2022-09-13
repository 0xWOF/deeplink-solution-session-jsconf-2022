import { STORE } from '../constant/store'
import { createUserAgent } from '../utility/user_agent'

const createDependency = () => {}

createDependency.createFallbackService = () => ({
    STORE,
})

const createFallbackService = (): FallbackService => {
    const { STORE } = createDependency.createFallbackService()

    const renderStoreFallback = (userAgent: string) => `
        <script>
            var a = document.createElement('a');
            a.href = '${
                createUserAgent(userAgent).os == 'ios' ? STORE.ios
                : STORE.android
            }';
            a.click();
        </script>
    `

    const renderWebFallback = (fallback: string) => `
        <script>
            var a = document.createElement('a');
            a.href = '${fallback}';
            a.click();
        </script>
    `

    return {
        renderStoreFallback,
        renderWebFallback,
    }
}

type FallbackService = {
    renderStoreFallback: (userAgent: string) => string
    renderWebFallback: (fallback: string) => string
}

export { createFallbackService, createDependency }
export type { FallbackService }