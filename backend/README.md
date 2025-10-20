#

RUN - dokcer image build -t round-2-backend <WORKDIR>

AFTER BUILD

RUN - docker run -it -e PORT=3001 -e DATABASE_URL=mongodb://host.docker.internal:27017/twitter -p 3001:3001 round-2-backend
