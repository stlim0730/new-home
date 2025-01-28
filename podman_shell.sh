#!/bin/bash

CONTAINER_ID=$(podman ps -qf "ancestor=stlim0730:main")
# GID=$(id --group)
if [ -z ${CONTAINER_ID} ]
then
    echo "Running a new container"
    podman run -ti -v $(pwd):/opt/new-home -p 8000:8000 stlim0730:main
else
    echo "Executing a new shell"
    podman exec -ti ${CONTAINER_ID} /bin/zsh #${USER}
fi
