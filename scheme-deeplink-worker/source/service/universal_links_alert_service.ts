const createUniversalLinksAlertService = (): UniversalLinksAlertService => {
    const render = (currentURL: string) => `
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script>
            window.onload = function () {
                swal('Move to other page...').then(function () {
                    var a = document.createElement('a');
                    a.href = '${currentURL.replace('://scheme-deeplink-worker', '://http-deeplink-worker') + '&directFallback=true'}';
                    a.click();
                });
            };
        </script>
    `

    return {
        render,
    }
}

type UniversalLinksAlertService = {
    render: (currentURL: string) => string
}

export { createUniversalLinksAlertService }
export type { UniversalLinksAlertService }