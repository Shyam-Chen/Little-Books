# Nginx

## Serving Static Content

```html
<!-- dist/index.html -->

<!-- Your SPA project -->
```

```conf
# nginx.conf

server {
  server_name ${NGINX_HOST};
  listen ${NGINX_PORT};

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /service-worker.js {
    add_header Cache-Control "max-age=0,no-cache,no-store,must-revalidate";
  }

  client_max_body_size 4G;
  keepalive_timeout 10;
}
```

```Dockerfile
FROM nginx

COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/demo.template
```

```yml
# docker-compose.yml

version: "3"

services:

  demo:
    image: demo
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    tty: true
    environment:
      - NGINX_HOST=localhost
      - NGINX_PORT=80
    command: /bin/bash -c "envsubst '$$NGINX_HOST $$NGINX_PORT' < /etc/nginx/conf.d/demo.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
```
