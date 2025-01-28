podman stop $(podman ps -aq --filter="ancestor=stlim0730:main")
podman rm $(podman ps -aq --filter="ancestor=stlim0730:main")
