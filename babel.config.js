module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            root: ['.'],
            alias: {
                '@core': './src/core',
                '@resources': './src/resources',
                '@shared': './src/shared'
            }
        }]
    ],
    ignore: [
        './**/*.spec.ts'
    ]
}
