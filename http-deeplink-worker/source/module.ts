interface Env {}

const fetch = async (
    request: Request,
    environment: Env,
    context: ExecutionContext,
): Promise<Response> => {
    return new Response('Hello World')
}

export type { Env }
export default {
    fetch
}