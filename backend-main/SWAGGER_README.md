# Swagger/OpenAPI Configuration

This backend is configured to automatically generate an OpenAPI 3.0 specification file (`swagger.json`) that can be used with various API generation tools.

## 📋 Overview

The Swagger configuration is set up in two places:
- **`src/main.ts`**: Generates swagger.json when the server starts
- **`src/generate-swagger.ts`**: Standalone script to generate swagger.json without starting the server

## 🚀 Generating the Swagger File

### Option 1: Using the dedicated script (Recommended)
```bash
npm run swagger:generate
```

This will generate `swagger.json` in the root directory without starting the server.

### Option 2: Start the development server
```bash
npm run start:dev
```

The `swagger.json` file will be automatically generated when the server starts.

## 📖 Accessing Swagger UI

Once the server is running, you can access the interactive Swagger UI at:
```
http://localhost:3000/api/swagger
```

## 🔧 Using with API Generation Tools

The generated `swagger.json` file is compatible with popular API generation tools:

### 1. **OpenAPI Generator CLI**
Generate TypeScript/JavaScript client:
```bash
npx @openapitools/openapi-generator-cli generate \
  -i swagger.json \
  -g typescript-axios \
  -o ./generated-client
```

### 2. **Orval** (Recommended for React/Vue/Angular)
Create an `orval.config.ts`:
```typescript
module.exports = {
  api: {
    input: './swagger.json',
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      client: 'react-query',
      mock: true,
    },
  },
};
```

Then run:
```bash
npx orval
```

### 3. **Swagger Codegen**
```bash
npx swagger-codegen-cli generate \
  -i swagger.json \
  -l typescript-fetch \
  -o ./api-client
```

### 4. **openapi-typescript**
Generate TypeScript types:
```bash
npx openapi-typescript swagger.json --output ./src/types/api.ts
```

## 📝 API Documentation

The generated OpenAPI specification includes:

- **Title**: Client API
- **Version**: 1.0
- **Base Path**: `/api`
- **Authentication**: JWT Bearer token

### Available Endpoints

#### Authentication (`/auth`)
- `POST /auth/get-code` - Request verification code
- `POST /auth/verify-code` - Verify code
- `POST /auth/resend-code` - Resend verification code
- `POST /auth/login` - Login with chosen user
- `POST /auth/new-token` - Refresh access token
- `POST /auth/logout` - Logout

#### Users (`/users`)
- `GET /users` - Get all users
- `POST /users` - Create user
- `GET /users/phone` - Find user by phone
- `GET /users/me` - Get current user (requires auth)
- `PATCH /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

#### Registration (`/register`)
- `POST /register` - Register new user

#### Formation (`/formation`)
- `GET /formation/{id}` - Get formation by ID

#### Sessions (`/sessions`)
- `GET /sessions` - Get all sessions

#### Certificates (`/certificats`)
- `GET /certificats` - Get all certificates
- `GET /certificats/{id}` - Get certificate by ID

## 🔐 Authentication

Most endpoints require JWT authentication. To use authenticated endpoints:

1. Get a token via the authentication flow
2. Include it in the `Authorization` header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## 🛠️ Customizing the Swagger Configuration

To modify the Swagger configuration, edit the `DocumentBuilder` setup in:
- `src/main.ts` (for runtime generation)
- `src/generate-swagger.ts` (for standalone generation)

Example customizations:
```typescript
const config = new DocumentBuilder()
  .setTitle('Your API Title')
  .setDescription('Your API Description')
  .setVersion('2.0')
  .addServer('https://api.production.com', 'Production')
  .addTag('custom-tag', 'Custom tag description')
  .build();
```

## 📦 Output Location

The `swagger.json` file is generated at:
```
./swagger.json
```

This file is ready to be used with any OpenAPI-compatible tool or service.

## 🔄 Keeping Swagger Up-to-Date

Remember to regenerate the swagger.json file whenever you:
- Add new endpoints
- Modify DTOs
- Change API documentation
- Update authentication methods

Simply run:
```bash
npm run swagger:generate
```

## 💡 Tips

1. **Version Control**: Consider adding `swagger.json` to your repository so frontend teams can always access the latest API spec
2. **CI/CD**: Add the swagger generation to your build pipeline
3. **Documentation**: The Swagger UI is great for manual testing and documentation
4. **Type Safety**: Use generated TypeScript types in your frontend for type-safe API calls
