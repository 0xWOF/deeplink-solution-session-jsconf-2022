import { createWellKnownService } from './service/well_known_service'

interface Env {}

const wellKnownService = createWellKnownService()

const fetch = async (
    request: Request,
    environment: Env,
    context: ExecutionContext,
): Promise<Response> => {
    const url = new URL(request.url)
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
    fetch
}