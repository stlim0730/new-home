docker stop $(docker ps -aq --filter="ancestor=stlim0730:main")
docker rm $(docker ps -aq --filter="ancestor=stlim0730:main")
