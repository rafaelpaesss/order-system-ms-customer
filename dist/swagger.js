"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function default_1(app) {
    const configService = app.get(config_1.ConfigService);
    const env = configService.get('ENVIRONMENT');
    if (env !== 'prd') {
        const documentBuild = new swagger_1.DocumentBuilder()
            .setTitle('API Backend')
            .setDescription('API desenvolvida para o projeto pos-tech.')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, documentBuild);
        swagger_1.SwaggerModule.setup('api/swagger', app, document, {
            customSiteTitle: 'API Backend',
            swaggerOptions: {
                syntaxHighlight: {
                    activate: true,
                    theme: 'tomorrow-night',
                },
            },
        });
    }
}
//# sourceMappingURL=swagger.js.map