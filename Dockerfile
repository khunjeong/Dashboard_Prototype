FROM        node:14-alpine

RUN         mkdir -p /usr/src/frontend
RUN         mkdir -p /usr/src/backend

WORKDIR     /usr/src/frontend
COPY        ./frontend/package.json /usr/src/frontend/package.json
RUN         npm install
COPY        ./frontend /usr/src/frontend

WORKDIR     /usr/src/backend
COPY        ./backend/package.json /usr/src/backend/package.json
RUN         npm install
COPY        ./backend /usr/src/backend
ENV         NODE_ENV=production


EXPOSE      3000
CMD         npm run start

