FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["/bin/sh", "-c", "echo \"window._env_ = { FIREBASE_API_KEY: '$FIREBASE_API_KEY', FIREBASE_AUTH_DOMAIN: '$FIREBASE_AUTH_DOMAIN', FIREBASE_PROJECT_ID: '$FIREBASE_PROJECT_ID' };\" > /usr/share/nginx/html/env-config.js && exec nginx -g 'daemon off;'"]
