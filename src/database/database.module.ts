import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'edumysql.acesso.rj.senac.br',
  port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || '20252_prjint5',
      password: process.env.DB_PASS || 'Senac@2025',
      database: process.env.DB_NAME || '20252_prjint_andersonsales',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
