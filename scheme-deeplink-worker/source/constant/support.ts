const SUPPORT = {
    ios: {
        safari: { scheme: false },
        other: { scheme: true },
    },
    android: {
        facebook_messenger: { scheme: false, market: true, intent: false },
        other: { scheme: false, market: true, intent: true },
    },
} as const

export { SUPPORT }