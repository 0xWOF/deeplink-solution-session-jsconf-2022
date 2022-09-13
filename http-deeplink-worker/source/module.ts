import { createFallbackService } from './service/fallback_service'
import { createWellKnownService } from './service/well_known_service'

interface Env {}

const fallbackService = createFallbackService()
const wellKnownService = createWellKnownService()

const fetch = async (
    request: Request,
    environment: Env,
    context: ExecutionContext,
): Promise<Response> => {
    const url = new URL(request.url)
    const userAgent = request.headers.get('User-Agent') ?? ''

    if (url.pathname === '/.well-known/apple-app-site-association') {
        return new Response(wellKnownService.renderAppleAppSiteAssociation(), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    else if (url.pathname === '/.well-known/assetlinks.json') {
        return new Response(wellKnownService.renderAssetLinks(), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    else if (
        (url.searchParams.get('store_fallback') === 'true' || url.searchParams.get('web_fallback') !== null)
        && url.searchParams.get('directFallback') !== 'true'
    ) {
        return new Response('FOUND', {
            status: 302,
            headers: {
                'Location': url.href.replace('://http-deeplink-worker', '://scheme-deeplink-worker')
            },
        })
    }
    else if (url.searchParams.get('store_fallback') === 'true') {
        return new Response(fallbackService.renderStoreFallback(userAgent), {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        })
    }
    else if (url.searchParams.get('web_fallback') !== null) {
        const fallback = decodeURIComponent(url.searchParams.get('web_fallback')!)
        return new Response(fallbackService.renderWebFallback(fallback), {
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
                'Location': 'about:blank',
            },
        })
    }
}

export type { Env }
export default {
    fetch
}