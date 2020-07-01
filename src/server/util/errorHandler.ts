import { Logger } from "log4js";
import { Context } from "koa";
import { join } from 'path';
import { createReadStream } from 'fs';
const errorHandler = {
  error(app) {
    interface KOAContext extends Context {
      // typeof logger;
      logger: Logger;
    }
    app.use(async (ctx, next: () => Promise<any>) => {
      const _method = ctx.request.method.upperCase();
      try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
          ctx.status = 404;
          if (_method === 'GET') {
            ctx.type = 'html';
            ctx.body = createReadStream(join(__dirname, '../public/404/index.html'));
          } else if (_method === 'POST') {
            ctx.body = { error: "the reqeust is gone!" };
          }
        }
      } catch (error) {
        // error logs pm2 logs
        ctx.logger.error(error);
        ctx.status = error.status || 500;
        if (ctx.status === 500) {
          if (_method === 'GET') {
            ctx.type = 'html';
            ctx.body = createReadStream(join(__dirname, '../public/500/index.html'));
          } else if (_method === 'POST') {
            ctx.body = { error: "sorry,the server is found error!" };
          }
        }

      }


    });
  }
};
export default errorHandler;
