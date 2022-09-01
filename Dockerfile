FROM        node:13.10-alpine
LABEL       maintainer Do Young

RUN         mkdir -p /usr/src/frontend
RUN         mkdir -p /usr/src/backend

WORKDIR     /usr/src/frontend
COPY        ./frontend/package.json /usr/src/frontend/package.json
RUN         npm install
COPY        ./frontend /usr/src/frontend
RUN         npm run prod

WORKDIR     /usr/src/backend
COPY        ./backend/package.json /usr/src/backend/package.json
RUN         npm install
COPY        ./backend /usr/src/backend
RUN         npm run build
ENV         NODE_ENV=production


EXPOSE      3000
CMD         npm run start

