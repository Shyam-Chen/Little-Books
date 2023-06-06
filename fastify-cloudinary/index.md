# [Fastify Cloudinary](https://github.com/Vanilla-IceCream/fastify-cloudinary)

Plugin to share a common Cloudinary connection across Fastify.

## Installation

Install `fastify-cloudinary` with your favorite package manager:

:::code-group

```sh [npm]
npm i fastify-cloudinary
```

```sh [Yarn]
yarn add fastify-cloudinary
```

```sh [pnpm]
pnpm i fastify-cloudinary
```

```sh [Bun]
bun add fastify-cloudinary
```

:::

## Usage

:::code-group

```ts [ESM]
import cloudinary from 'fastify-cloudinary';
```

```ts [CJS]
const cloudinary = require('fastify-cloudinary');
```

:::

## Upload Stream

```ts
import stream from 'stream';
import util from 'util';
import multipart from '@fastify/multipart';
import cloudinary from 'fastify-cloudinary';

const pipeline = util.promisify(stream.pipeline);

fastify.register(multipart);
fastify.register(cloudinary, { url: 'cloudinary://API_KEY:API_SECRET@CLOUD_NAME' });

fastify.post('/file-uploads', async (req, reply) => {
  const data = await req.file();

  await pipeline(
    data.file,
    fastify.cloudinary.uploader.upload_stream({ public_id: data.fieldname }),
  );

  return { message: 'hi' };
});
```
