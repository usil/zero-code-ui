FROM node:14

RUN mkdir /src
WORKDIR /src

COPY . /src
RUN npm install
RUN npm run build

COPY DockerfileEntryPoint.sh /usr/local/bin/DockerfileEntryPoint.sh
RUN chmod 744 /usr/local/bin/DockerfileEntryPoint.sh

ENTRYPOINT ["DockerfileEntryPoint.sh"]
