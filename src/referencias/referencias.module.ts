import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule.forfeature([UsuarioModule])], // <-- Adicione aqui
  
})
export class UsuarioModule {} // Note: O nome da sua classe é GenerosModule