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
            alias: {
                '@core': './core',
                '@resources': './resources',
                '@shared': './shared'
            }
        }]
    ],
    ignore: [
        './**/*.spec.ts'
    ]
}
