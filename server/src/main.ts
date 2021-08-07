import {NestFactory} from "@nestjs/core";
import PinoLoggerService from "./logger/pino-logger.service";
import AppModule from "./app.module";
import {ASYNC_STORAGE} from "./logger/logger.constants";
import {v4 as uuidV4} from "uuid";

(async function startServer() {
    const app = await NestFactory.create(AppModule, {
        logger: true
    })

    app.use((req: Request, res, next) => {
        const traceId = req.headers['x-request-id'] || uuidV4()
        const store = new Map().set('traceId', traceId)
        app.get(ASYNC_STORAGE).run(store, () => {
            next()
        })
    })

    const pinoLogger = app.get(PinoLoggerService)
    app.useLogger(pinoLogger)

    const port = process.env.PORT || 8000
    await app.listen(port, () => {
        pinoLogger.log(`Server has success started on https://localhost:${port}/`, 'Main')
    })
})()
