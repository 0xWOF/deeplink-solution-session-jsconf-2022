import { APPLICATION } from './constant/application'
import { createCustomURLSchemeService } from './service/custom_url_scheme_service'
import { createUserAgent } from './utility/user_agent'

interface Env {}

const customURLSchemeService = createCustomURLSchemeService()

const fetch = async (
    request: Request,
    env: Env,
    ctx: ExecutionContext,
): Promise<Response> => {
    const url = new URL(request.url)
    const userAgent = request.headers.get('User-Agent') ?? ''

    const scheme = (
        createUserAgent(userAgent).os == 'ios' ? APPLICATION.ios.scheme
        : APPLICATION.android.scheme
    )
    const deeplink = url.href.replace(/^https?\:/, `${scheme}:`)
    
    if (url.searchParams.get('store_fallback') === 'true') {
        return new Response(customURLSchemeService.renderStoreFallback(deeplink, userAgent), {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        })
    }
    else if (url.searchParams.get('web_fallback') !== null) {
        const fallback = decodeURIComponent(url.searchParams.get('web_fallback')!)
        return new Response(customURLSchemeService.renderWebFallback(deeplink, fallback), {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        })
    }
    else {
        return new Response('FOUND', {
            status: 302,
            headers: {
                'Location': 'about:blank'
            }
        })
    }
}

export type { Env }
export default {
    fetch,
}