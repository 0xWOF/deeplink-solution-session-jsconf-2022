import { APPLICATION } from './constant/application'
import { SUPPORT } from './constant/support'
import { createCustomURLSchemeService } from './service/custom_url_scheme_service'
import { createUniversalLinksAlertService } from './service/universal_links_alert_service'
import { createUserAgent } from './utility/user_agent'

interface Env {}

const customURLSchemeService = createCustomURLSchemeService()
const universalLinksAlertService = createUniversalLinksAlertService()

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

    const { os, app } = createUserAgent(userAgent)
    if (url.searchParams.get('store_fallback') === 'true') {
        if (os === 'ios') {
            const support = Object(SUPPORT.ios)[app] ?? SUPPORT.ios['other']
            if (support.scheme) {
                return new Response(customURLSchemeService.renderStoreFallback(deeplink, userAgent), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
            else {
                return new Response(universalLinksAlertService.render(url.href), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
        }
        else {
            return new Response(customURLSchemeService.renderStoreFallback(deeplink, userAgent), {
                status: 200,
                headers: {
                    'Content-Type': 'text/html',
                },
            })
        }
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