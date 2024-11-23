"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = __importDefault(require("./swagger"));
const common_1 = require("@nestjs/common");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const options = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true,
        };
        app.enableCors(options);
        await (0, swagger_1.default)(app);
        const PORT = process.env.NODE_DOCKER_PORT ?? 3000;
        await app.listen(PORT, () => {
            common_1.Logger.log(`Server is running on port ${PORT}.`);
        });
    }
    catch (error) {
        common_1.Logger.error('Error starting application', error);
        process.exit(1);
    }
}
//# sourceMappingURL=main.js.map