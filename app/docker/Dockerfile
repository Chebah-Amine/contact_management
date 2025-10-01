FROM node:lts-slim

RUN apt-get update \
    &&  apt-get install -y --no-install-recommends \
        locales apt-utils git libicu-dev g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev unzip libpq-dev wget \
        apt-transport-https lsb-release ca-certificates

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen  \
    &&  echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen \
    &&  locale-gen

RUN echo 'export LC_ALL=en_GB.UTF-8' >> /etc/profile.d/locale.sh && \
  sed -i 's|LANG=C.UTF-8|LANG=en_GB.UTF-8|' /etc/profile.d/locale.sh

RUN deluser --remove-home node

RUN npm install -g npm@latest

WORKDIR /var/www/html

RUN useradd -ms /bin/bash app-user

RUN chown -R app-user:app-user /var/www/html

RUN chmod 755 /var/www/html

USER app-user

CMD tail -f /dev/null