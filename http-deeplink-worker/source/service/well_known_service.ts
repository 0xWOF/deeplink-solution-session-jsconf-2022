import { APPLICATION } from '../constant/application'

const createDependency = () => {}

createDependency.createWellKnownService = () => ({
    APPLICATION,
})

const createWellKnownService = (): WellKnownService => {
    const { APPLICATION } = createDependency.createWellKnownService()

    const renderAppleAppSiteAssociation = () => JSON.stringify({
        applinks: {
            apps: [],
            details: [{
                appID: `${APPLICATION.ios.teamID}.${APPLICATION.ios.bundleID}`,
                paths: ['*'],
            }],
        },
    })

    const renderAssetLinks = () => JSON.stringify([{
        relation: [
            'delegate_permission/common.handle_all_urls',
        ],
        target: {
            namespace: 'android_app',
            package_name: APPLICATION.android.package,
            sha256_cert_fingerprints: [
                APPLICATION.android.fingerprint,
            ],
        },
    }])

    return {
        renderAppleAppSiteAssociation,
        renderAssetLinks,
    }
}

type WellKnownService = {
    renderAppleAppSiteAssociation: () => string
    renderAssetLinks: () => string
}

export { createWellKnownService, createDependency }
export type { WellKnownService }