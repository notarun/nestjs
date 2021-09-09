import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app.module';

(async () => {
  const bootstrap = await new BootstrapConsole({
    module: AppModule,
    useDecorators: true,
  });

  const app = await bootstrap.init();

  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
})();
