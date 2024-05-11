import fs from 'fs';
import { join } from 'path';
import { $env } from '@/config';

export function swaggerMerge(swaggerDocument) {
  const swaggerDir = join(__dirname, $env.SWAGGER_DIR);
  const files = fs.readdirSync(swaggerDir);

  files.map(file => {
    const fileData = fs.readFileSync(join(swaggerDir, file), 'utf8');
    const jsonData = JSON.parse(fileData);

    swaggerDocument.tags = { ...swaggerDocument.tags, ...jsonData.tags };
    swaggerDocument.paths = { ...swaggerDocument.paths, ...jsonData.paths };
    swaggerDocument.components.schemas = { ...swaggerDocument.components.schemas, ...jsonData.components.schemas };
  });

  return swaggerDocument;
}
