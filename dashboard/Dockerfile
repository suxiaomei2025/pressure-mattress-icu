# PressureMattress ICU - dashboard service image (static UI + API proxy)
# Build: docker build -t pressure-mattress-dashboard ./dashboard
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=5s --retries=5 --start-period=10s \
  CMD wget -q -O /dev/null http://localhost/ || exit 1
