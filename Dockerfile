FROM ubuntu:noble

# Environement variables
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive
ENV PROJECT_NAME=new-home
ENV PROJECT_ROOT=/opt/${PROJECT_NAME}
ENV ASTRO_ROOT=${PROJECT_ROOT}/astro
ENV PORT=8000

# Networks
EXPOSE ${PORT}

# Libraries
RUN apt update
RUN apt install -y sudo zsh vim curl python3-venv

# Path
RUN mkdir -p ${PROJECT_ROOT}
ADD . ${PROJECT_ROOT}
WORKDIR ${PROJECT_ROOT}

# Python (3.12.3)
RUN ln -s /usr/bin/python3 /usr/bin/python
RUN python -m venv pythonenv

# Node.js (v22): https://github.com/nodesource/distributions
RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
RUN sudo -E bash nodesource_setup.sh
RUN sudo apt install -y nodejs
RUN rm nodesource_setup.sh
RUN npm i --prefix ${ASTRO_ROOT}

# Shell
SHELL ["/bin/zsh", "-c"]
ENV PROMPT="[%n@ %m %#] "
ENTRYPOINT ["/bin/zsh"]
