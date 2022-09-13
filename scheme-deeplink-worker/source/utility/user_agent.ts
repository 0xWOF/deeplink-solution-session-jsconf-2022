const createUserAgent = (userAgent: string): UserAgent => {
    const os = (
        check_iOS(userAgent) ? 'ios'
        : check_Android(userAgent) ? 'android'
        : 'other'
    )

    const app = (
        check_iOS_Safari(userAgent) ? 'safari'
        : 'other'
    )

    return {
        os,
        app,
    }
}

const check_iOS = (userAgent: string) => (
    /(iOS) (\d+)(?:[-_. ](\d+))?(?:[-_. ](\d+))?/.test(userAgent)
    || /(CPU OS|iPhone OS|CPU iPhone|CPU iPhone OS) (\d+)(?:[-_. ](\d+))?(?:[-_. ](\d+))?/.test(userAgent)
    || /(iPhone|iPad|iPod|iOS;)/.test(userAgent)
)

const check_iOS_Safari = (userAgent: string) => (
    /(Mac OS X).+Version\/.+Safari\//.test(userAgent)
)

const check_Android = (userAgent: string) => (
    /(Android|Adr) (\d+)(?:[-_. ](\d+))?(?:[-_. ](\d+))?/.test(userAgent)
    || /(Android)/.test(userAgent)
)

type UserAgent = {
    os: OS
    app: App
}

type OS = 'ios' | 'android' | 'other'
type App = 'safari' | 'other'

export { createUserAgent }
export type { UserAgent, OS }