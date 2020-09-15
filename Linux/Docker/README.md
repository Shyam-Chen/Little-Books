# Docker

### Caddy Server

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body>
    <div>Hello, World!</div>
  </body>
</html>

```

```dockerfile
FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY /dist /usr/share/caddy/dist
```

```caddyfile
:8000 {
  encode gzip
  root * /usr/share/caddy/dist
  try_files {path} /index.html
  file_server browse

  header {
    Strict-Transport-Security max-age=31536000
    X-Content-Type-Options nosniff
    X-Frame-Options DENY
    Referrer-Policy no-referrer-when-downgrade
  }
}
```

```yml
# docker-compose.yml
version: '3.8'

services:
  serve:
    image: serve-static-files
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '80:80'
      - '443:443'
      - '8000:8000'
    volumes:
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - statics

volumes:
  caddy_data:
  caddy_config:

networks:
  statics:
    driver: bridge
```

```sh
$ docker-compose up
```

Visit [http://localhost:8000](http://localhost:8000).
