import { createTestPageService } from './service/test_page_service'

export interface Env {}

const testPageService = createTestPageService()

const fetch = async (
    request: Request,
    env: Env,
    ctx: ExecutionContext,
): Promise<Response> => {
    const url = new URL(request.url)

    if (url.pathname === '/') {
        return new Response(testPageService.render(), {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        })
    }
    else if (url.pathname === '/redirect' && url.searchParams.get('location') != null) {
        const location = decodeURIComponent(url.searchParams.get('location')!)

        return new Response('FOUND', {
            status: 301,
            headers: {
                'Location': location,
            },
        })
    }
    else {
        return new Response('NOT FOUND', {
            status: 404,
        })
    }
}

export default {
    fetch,
}