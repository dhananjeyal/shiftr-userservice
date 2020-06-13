const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
    const options = {
        explorer: true,
        swaggerOptions: {
            urls: [
                {
                    url: '/public/swagger/open.json',
                    name: "All open APIs"
                },
                {
                    url: '/public/swagger/admin.json',
                    name: "All Admin & Super admin APIs"
                },
                {
                    url: '/public/swagger/superAdmin.json',
                    name: "All Super admin APIs"
                }
            ]
        }
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));

    return app;
};
