FROM        node:10

RUN         mkdir -p /usr/src/frontend
RUN         mkdir -p /usr/src/backend

WORKDIR     /usr/src/frontend
COPY        frontend .

WORKDIR     /usr/src/backend
COPY        backend/package*.json /usr/src/backend/
RUN         npm install
COPY        backend .
ENV         NODE_ENV=production
ENV         PORT=3000

CMD         ["npm", "start"]
EXPOSE      3000

