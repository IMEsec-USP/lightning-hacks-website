# Lightning Hacks Website


### To develop the front-end

After cloning the repository, run
```
npm i
bundle install
```

To develop, run
```
npx webpack -w
```
In one console, and
```
bundle exec jekyll serve
```
in another.

### To develop the back-end

**You must have our token.pickle for it to work completely.**

Install pipenv to be able to sync python packages.
```
python -m ensurepip
pip install pipenv
```

After cloning the repository,
Navigate to the api directory.
```
cd api
```

Sync with the python local environment.
```
pipenv sync
```

Finally, run the app.
```
pipenv run python app.py
```

### To build for production

run
```
docker-compose build .
```
