import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express, { Request, Response, NextFunction } from 'express'; // ✅ default import
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';

// -----------------------------------------------------------------------------
// Paths
// -----------------------------------------------------------------------------
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

// -----------------------------------------------------------------------------
// Express + Angular SSR setup
// -----------------------------------------------------------------------------
const app = express();
app.use(cors()); // ✅ enable all origins for testing
app.use(express.json());
const angularApp = new AngularNodeAppEngine();

// -----------------------------------------------------------------------------
// Serve static assets
// -----------------------------------------------------------------------------
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// -----------------------------------------------------------------------------
// Handle all other routes through Angular SSR
// -----------------------------------------------------------------------------
app.use('**', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await angularApp.handle(req);
    if (response) {
      writeResponseToNodeResponse(response, res);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

// -----------------------------------------------------------------------------
// Start standalone server
// -----------------------------------------------------------------------------
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () =>
    console.log(`✅ Angular SSR server running at http://localhost:${port}`),
  );
}

// -----------------------------------------------------------------------------
// Export request handler for Angular CLI SSR
// -----------------------------------------------------------------------------
export const reqHandler = createNodeRequestHandler(app);