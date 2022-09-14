FROM        node:10
RUN         mkdir -p /usr/src/frontend
RUN         mkdir -p /usr/src/backend

WORKDIR     /usr/src/frontend
COPY        ./frontend/package.json /usr/src/frontend/package.json
RUN         npm cache clean -f
RUN         rm -rf node_modules
RUN         npm install node-sass@4.14.1 --unsafe-perm=true --allow-root
RUN         npm install
COPY        ./frontend /usr/src/frontend

WORKDIR     /usr/src/backend
COPY        ./backend/package.json /usr/src/backend/package.json
RUN         npm install
COPY        ./backend /usr/src/backend
ENV         NODE_ENV=production
ENV         PORT=3000

EXPOSE      3000
CMD         ["npm", "start"]

