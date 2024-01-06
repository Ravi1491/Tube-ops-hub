import { Module, Global } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  providers: [],
  exports: [],
})
export class AuthModule {}
