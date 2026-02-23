/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: 'no-persistence-in-routes',
            comment:
                'Routes must not access persistence directly. Use services instead.',
            severity: 'error',
            from: {
                path: '^src/routes',
            },
            to: {
                path: '^src/persistence',
            },
        },
    ],
};