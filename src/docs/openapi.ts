import { OpenAPIV3 } from 'openapi-types';


const components: OpenAPIV3.ComponentsObject = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        role: { type: 'string', enum: ['user', 'admin'] },
        location: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
    AuthLoginResponse: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: { $ref: '#/components/schemas/User' },
      },
    },
    SuccessResponse: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  },
};

const paths: OpenAPIV3.PathsObject = {
  '/api/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'username', 'password', 'location'],
              properties: {
                email: { type: 'string' },
                username: { type: 'string' },
                password: { type: 'string' },
                location: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
        '409': { description: 'Email already used' },
      },
    },
  },
  '/api/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Authenticate user and return JWT',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthLoginResponse' } } } },
        '401': { description: 'Invalid credentials' },
      },
    },
  },
  '/api/auth/promote/{id}': {
    patch: {
      tags: ['Auth'],
      summary: 'Promote a user to admin',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
      ],
      responses: {
        '200': { description: 'OK' },
        '401': { description: 'Unauthorized' },
        '403': { description: 'Forbidden' },
        '404': { description: 'Not found' },
      },
    },
  },

  '/api/users/me': {
    get: {
      tags: ['Users'],
      summary: 'Get current user profile',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
        '401': { description: 'Unauthorized' },
      },
    },
    patch: {
      tags: ['Users'],
      summary: 'Update current user',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object', properties: { username: { type: 'string' }, location: { type: 'string' }, password: { type: 'string' } } } } },
      },
      responses: {
        '200': { description: 'OK' },
        '400': { description: 'No fields to update' },
        '401': { description: 'Unauthorized' },
      },
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete current user',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': { description: 'Deleted' },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Not found' },
      },
    },
  },
  '/api/users/logout': {
    post: {
      tags: ['Users'],
      summary: 'Logout (stateless)',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } } },
    },
  },

  '/api/inventory/me': {
    get: { tags: ['Inventory'], summary: 'Get my inventory', security: [{ bearerAuth: [] }], responses: { '200': { description: 'OK' } } },
  },
  '/api/inventory/me/plants': {
    get: { tags: ['Inventory'], summary: 'List my plants', security: [{ bearerAuth: [] }], responses: { '200': { description: 'OK' } } },
    post: { tags: ['Inventory'], summary: 'Add plant to my inventory', security: [{ bearerAuth: [] }], responses: { '201': { description: 'Created' } } },
  },
  '/api/inventory/search': {
    get: { tags: ['Inventory'], summary: 'Search inventory', security: [{ bearerAuth: [] }], responses: { '200': { description: 'OK' } } },
  },
  '/api/inventory/filter': {
    get: { tags: ['Inventory'], summary: 'Filter inventory', security: [{ bearerAuth: [] }], responses: { '200': { description: 'OK' } } },
  },
  '/api/inventory/plants/{id}': {
    delete: { tags: ['Inventory'], summary: 'Remove a plant', security: [{ bearerAuth: [] }], parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Deleted' } } },
  },
  '/api/inventory/deleteInventory/{userId}': {
    delete: { tags: ['Inventory'], summary: 'Delete inventory (admin)', security: [{ bearerAuth: [] }], parameters: [{ in: 'path', name: 'userId', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Deleted' }, '403': { description: 'Forbidden' } } },
  },

  '/api/plants/{id}': {
    patch: { tags: ['Plants'], summary: 'Update plant', security: [{ bearerAuth: [] }], parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
  },

  '/api/recommendations': {
    post: { tags: ['Recommendations'], summary: 'Save a recommendation', responses: { '201': { description: 'Created' } } },
  },
  '/api/recommendations/{userId}': {
    get: { tags: ['Recommendations'], summary: "List user's recommendations", parameters: [{ in: 'path', name: 'userId', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } },
  },
  '/api/health': {
    get: {
      tags: ['Health'],
      summary: 'Health check',
      responses: {
        '200': {
          description: 'Service is up',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  },
};

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'GreenHand API',
    version: '1.0.0',
    description: 'Plant inventory management and recommendation API for GreenHand mobile application',
    contact: {
      name: 'GreenHand Support',
      email: 'support@greenhand.app',
    },
  },
  servers: [
    { url: 'https://greenhandwebservice.onrender.com/', description: 'Production' },
    { url: 'http://localhost:3000', description: 'Local Development' },
  ],
  components,
  paths,
};
