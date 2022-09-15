import { APPLICATION } from '../constant/application'

const createDependency = () => {}

createDependency.createAndroidChromeStoreFallbackService = () => ({
    APPLICATION,
})

const createAndroidChromeStoreFallbackService = (): AndroidChromeStoreFallbackService => {
    const { APPLICATION } = createDependency.createAndroidChromeStoreFallbackService()

    const renderStoreFallback = (deeplink: string) => `
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script>
            window.onload = function () {
                var deeplink = '${
                    `intent://details`
                    + `?id=${APPLICATION.android.package}`
                    + `&url=${encodeURIComponent(deeplink)}`
                    + `#Intent;`
                    + `scheme=market;`
                    + `package=com.android.vending;`
                    + `end;`
                }';

                var a = document.createElement('a');
                a.href = deeplink;
                a.click();
                swal('Move to other page...').then(function () {
                    var a = document.createElement('a');
                    a.href = deeplink;
                    a.click();
                });
            };
        </script>
    `

    return {
        renderStoreFallback,
    }
}

type AndroidChromeStoreFallbackService = {
    renderStoreFallback: (deeplink: string) => string
}

export { createAndroidChromeStoreFallbackService }
export type { AndroidChromeStoreFallbackService }