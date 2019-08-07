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

After cloning the repository,
Navigate to the api directory.
```
cd api
```

setup python virtual environment.
```bash
source api/venv/activate # If you're on bash/zsh
source api/venv/activate.fish # If you're on fish
```

Download the dependencies through
```
pip install -r api/requirements.txt
```

Finally, run the app.
```
python app.py
```

### To build for production

run
```
docker-compose build .
```
