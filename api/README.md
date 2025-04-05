# Heart-AI API

This is the backend API for the Heart-AI application, built with FastAPI and Python.

## Environment Configuration

The application uses environment variables to configure different environments:

### Environment Files

- `.env`: Common environment variables for all environments
- `.env.development`: Environment variables for local development
- `.env.production`: Environment variables for production

### Available Environment Variables

- `PORT`: The port on which the API server will run
- `HOST`: The host on which the API server will listen
- `CORS_ORIGINS`: Comma-separated list of allowed origins for CORS
- `DEBUG`: Whether to enable debug mode (True/False)

### Development

For local development, the application uses the variables in `.env.development`:

```
PORT=8000
HOST=localhost
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
DEBUG=True
```

### Production

For production, the application uses the variables in `.env.production`:

```
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=https://heart-ai.example.com
DEBUG=False
```

Replace the CORS_ORIGINS with your actual production frontend URL when deploying.

## Running the API

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running in Development Mode

```
ENV_MODE=development uvicorn main:app --reload
```

### Running in Production Mode

```
ENV_MODE=production uvicorn main:app
```

## API Documentation

When the API is running, you can access the auto-generated documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc