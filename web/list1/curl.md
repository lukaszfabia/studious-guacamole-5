# Lista 1

## Zadanie 1

```bash
curl -i https://lukaszfabia.vercel.app
```

Polecenie _cURL_ może służyć to testowania API np. [jsonplaceholder](https://jsonplaceholder.typicode.com/)

```bash
curl https://jsonplaceholder.typicode.com/posts/1

curl --request DELETE https://jsonplaceholder.typicode.com/posts/1
```

## Zadanie 2

wejść na usosa i podac błędne passy

## Zadanie 3

```bash
https://github.com/search?q=lukaszfabia&type=user
```

## Zadanie 4

```bash
curl --request POST https://jsonplaceholder.typicode.com/posts \
--header "Content-Type: application/json" \
-data '{"userId": 1,"id": 101,"title": "testowy post","body": "lorem ipsum"}'
```
