# json-server

A https://github.com/typicode/json-server dockerbe csomagolva és személyre szabva.

# Futtatás

```bash
docker run -d --rm -p 8888:80 rcsnjszg/json-server
```

 - `-d` vagy `--detach`: A háttérben fut, így nem ír ki a terminálba üzeneteket és nem is fogad onnan parancsokat.
 - `--rm`: A futtatás után eltávolítja a konténert és a menetközben létrehozott névtelen volume-okat is.
 - `-p` vagy `--publish`: A  a hoszt gép `8888`-as portjára publikáljs konténer `80`-as portját.


# Build

```
docker build -t rcsnjszg/json-server .
```
