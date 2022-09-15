const createUserAgent = (userAgent: string): UserAgent => {
    const os = (
        check_iOS(userAgent) ? 'ios'
        : check_Android(userAgent) ? 'android'
        : 'other'
    )

    const app = (
        check_iOS_Safari(userAgent) ? 'safari'
        : check_Chrome(userAgent) ? 'chrome'
        : check_Facebook_Messenger(userAgent) ? 'facebook_messenger'
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

const check_Facebook_Messenger = (userAgent: string) => (
    /\[(FBAN\/(?:MessengerLiteForiOS|MessengerForiOS)|FB_IAB\/(?:MESSENGER|Orca-Android))/.test(userAgent)
)

const check_Chrome = (userAgent: string) => (
    /(Chrome|CrMo|CriOS)\//.test(userAgent)
)

type UserAgent = {
    os: OS
    app: App
}

type OS = 'ios' | 'android' | 'other'
type App = 'safari' | 'chrome' | 'facebook_messenger' | 'other'

export { createUserAgent }
export type { UserAgent, OS }