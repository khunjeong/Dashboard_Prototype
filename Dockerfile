FROM        node:18-alpine

RUN         mkdir -p /usr/src/backend

WORKDIR     /usr/src/backend
COPY        ./backend/package.json /usr/src/backend/package.json
RUN         npm install
COPY        ./backend /usr/src/backend
RUN         npm run build
ENV         NODE_ENV=production
ENV         PORT=3000

EXPOSE      3000
CMD         npm run start

