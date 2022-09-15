import { APPLICATION } from './constant/application'
import { SUPPORT } from './constant/support'
import { createAndroidChromeStoreFallbackService } from './service/android_chrome_store_fallback_service'
import { createCustomURLSchemeService } from './service/custom_url_scheme_service'
import { createIntentSchemeService } from './service/intent_scheme_service'
import { createMarketSchemeService } from './service/market_scheme_service'
import { createUniversalLinksAlertService } from './service/universal_links_alert_service'
import { createUserAgent } from './utility/user_agent'

interface Env {}

const androidChromeStoreFallbackService = createAndroidChromeStoreFallbackService()
const customURLSchemeService = createCustomURLSchemeService()
const intentSchemeService = createIntentSchemeService()
const marketSchemeService = createMarketSchemeService()
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
        else if (os === 'android') {
            const support = Object(SUPPORT.android)[app] ?? SUPPORT.android['other']
            if (app === 'chrome') {
                return new Response(androidChromeStoreFallbackService.renderStoreFallback(deeplink), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
            else if (support.intent) {
                return new Response(intentSchemeService.renderStoreFallback(deeplink), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
            else if (support.market) {
                return new Response(marketSchemeService.renderStoreFallback(deeplink), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
            else if (support.scheme) {
                return new Response(customURLSchemeService.renderStoreFallback(deeplink, userAgent), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
        }
    }
    else if (url.searchParams.get('web_fallback') !== null) {
        const fallback = decodeURIComponent(url.searchParams.get('web_fallback')!)
        if (os === 'ios') {
            const support = Object(SUPPORT.ios)[app] ?? SUPPORT.ios['other']
            if (support.scheme) {
                return new Response(customURLSchemeService.renderWebFallback(deeplink, fallback), {
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
        else if (os === 'android') {
            const support = Object(SUPPORT.android)[app] ?? SUPPORT.android['other']
            if (support.intent) {
                return new Response(intentSchemeService.renderWebFallback(deeplink, fallback), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
            else if (support.scheme) {
                return new Response(customURLSchemeService.renderWebFallback(deeplink, fallback), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                })
            }
        }
    }
    
    return new Response('FOUND', {
        status: 302,
        headers: {
            'Location': 'about:blank'
        }
    })
}

export type { Env }
export default {
    fetch,
}