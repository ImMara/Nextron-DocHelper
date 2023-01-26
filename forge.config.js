module.exports = {
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'ImMara',
                    name: 'Nextron-DocHelper',
                },
                prerelease: false,
                draft: true,
                token: process.env.GH_TOKEN,
            },
        },
    ],
}