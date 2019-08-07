from jekyll/jekyll as build

# Install packages
workdir /app
copy Gemfile Gemfile.lock /app/
copy package.json package-lock.json /app/
run bundle install
run npm i

# Build
copy . /app
run npx webpack
entrypoint ["/bin/bash"]
run mkdir /app/_site
run mkdir /app/.jekyll-cache
run JEKYLL_ENV=production jekyll build

# Strip build image & serve
from ubuntu:latest as server

run apt update
run apt install -y npm
run npm i -g serve
copy --from=build /app/_site /app/
workdir /app
expose 5000
cmd ["serve", "-p", "5000"]
