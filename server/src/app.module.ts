import {Module} from "@nestjs/common";
import { IdeaModule } from './idea/idea.module';
import LoggerModule from "./logger/logger.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import TypeormConfig from "./utils/typeorm.config";

@Module({
    imports: [
        LoggerModule,
        IdeaModule,
        TypeOrmModule.forRootAsync({
            useClass: TypeormConfig,
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
    ]
})
export default class AppModule {}
