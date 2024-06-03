# How to Run

The Dockerfile is attached and you can run the application with Docker.

### Build the docker image

```bash
docker build -t <image_name> .
```

### Run the image with environment variable

```bash
docker run -d -p 3000:3000 -e REACT_APP_API_KEY=<your_API_key> <image_name>
```

You can get free API key from [here](https://www.alphavantage.co/support/#api-key).
