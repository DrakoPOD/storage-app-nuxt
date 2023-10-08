import { JSONSchemaType } from 'ajv';
import type { Item, Manufacturer, StorageCondition } from '../types/item.d';
import type { INewUser, IQueryUser } from '@/types/user';

export const storageConditionsSchema: JSONSchemaType<StorageCondition> = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Storage conditions',
  description: 'Storage conditions of an item',
  type: 'object',
  properties: {
    temperature: {
      description: 'Temperature of the item',
      type: 'object',
      properties: {
        min: {
          description: 'Minimum temperature of the item',
          type: 'number',
        },
        max: {
          description: 'Maximum temperature of the item',
          type: 'number',
        },
      },
      required: ['min', 'max'],
    },
    humidity: {
      description: 'Humidity of the item',
      type: 'object',
      properties: {
        min: {
          description: 'Minimum humidity of the item',
          type: 'number',
        },
        max: {
          description: 'Maximum humidity of the item',
          type: 'number',
        },
      },
      required: ['min', 'max'],
    },
    pressure: {
      description: 'Pressure of the item',
      type: 'object',
      nullable: true,
      properties: {
        min: {
          description: 'Minimum pressure of the item',
          type: 'number',
        },
        max: {
          description: 'Maximum pressure of the item',
          type: 'number',
        },
      },
      required: ['min', 'max'],
    },
    light: {
      description: 'Light of the item',
      nullable: true,
      type: 'number',
    },
    description: {
      description: 'Description of the storage conditions',
      type: 'string',
    },
    caution: {
      description: 'Caution of the storage conditions',
      type: 'string',
    },
    protection: {
      description: 'Protection of the storage conditions',
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['temperature', 'humidity', 'description'],
};

export const itemSchema: JSONSchemaType<Item> = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Item',
  description: 'An item in the storage',
  type: 'object',
  properties: {
    _id: {
      description: 'The unique identifier for an item, use in MongoDB',
      type: 'string',
      nullable: true,
    },
    serialNumber: {
      description: 'Serial number of the item',
      type: 'string',
    },
    image: {
      description: 'Image of the item',
      type: 'string',
      nullable: true,
    },
    name: {
      description: 'Name of the item',
      type: 'string',
      minLength: 4,
    },
    description: {
      description: 'Description of the item',
      type: 'string',
      minLength: 10,
    },
    cost: {
      description: 'Cost of the item',
      type: 'number',
      minimum: 0,
    },
    quantity: {
      description: 'Quantity of the item',
      type: 'number',
      minimum: 0,
    },
    addedDate: {
      description: 'Date when the item was added',
      type: 'string',
      format: 'date-time',
    },
    lastUpdated: {
      description: 'Date when the item was last updated',
      type: 'string',
      format: 'date-time',
    },
    brand: {
      description: 'Brand of the item',
      type: 'string',
      nullable: true,
    },
    manufacturer: {
      description: 'Manufacturer of the item',
      type: 'string',
      nullable: true,
    },
    category: {
      description: 'Category of the item',
      type: 'string',
    },
    tags: {
      description: 'Tags of the item',
      type: 'array',
      items: {
        type: 'string',
      },
      uniqueItems: true,
    },
    images: {
      description: 'Images of the item',
      type: 'array',
      nullable: true,
      items: {
        type: 'string',
      },
    },
    storageConditions: {
      description: 'Storage conditions of the item',
      type: 'object',
      nullable: true,
      properties: storageConditionsSchema.properties,
      required: storageConditionsSchema.required,
    },
    laboratory: {
      description: 'Laboratory of the item',
      type: 'string',
      enum: [
        'biology',
        'chemistry',
        'physics',
        'computer-science',
        'mathematics',
        'other',
      ],
    },
    topics: {
      description: 'Units, classes or topics of the item should be used for',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    experiments: {
      description: 'Experiments the item was used for',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            description: 'Title of the experiment',
            type: 'string',
          },
          description: {
            description: 'Description of the experiment',
            type: 'string',
          },
        },
        required: ['title', 'description'],
      },
    },
    notes: {
      description: 'Notes of the item',
      type: 'string',
      nullable: true,
    },
    code: {
      description: 'Code of the item for internal use',
      type: 'string',
    },
  },
  required: [
    'name',
    'serialNumber',
    'description',
    'cost',
    'quantity',
    'addedDate',
    'lastUpdated',
    'category',
    'tags',
    'laboratory',
    'topics',
    'experiments',
    'code',
  ],
};

export const manufacturerSchema: JSONSchemaType<Manufacturer> = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      default: null,
      nullable: true,
    },
    logo: {
      type: 'string',
      default: null,
      nullable: true,
    },
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    website: {
      type: 'string',
    },
  },
  required: ['name', 'phone', 'email', 'address', 'website'],
};

export const bodySchema: JSONSchemaType<Record<string, string>> = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['email', 'password'],
};

export const queryUserSchema: JSONSchemaType<IQueryUser> = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  type: 'object',
  description: 'Query parameters for the user',
  oneOf: [
    {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      additionalProperties: false,
      required: ['id'],
    },
    {
      type: 'object',
      properties: {
        all: { type: 'string' },
      },
      additionalProperties: true,
      required: ['all'],
    },
    {
      type: 'object',
      properties: {
        checkUserName: { type: 'string' },
        email: { type: 'string' },
      },
      additionalProperties: false,
      required: ['checkUserName', 'email'],
    },
  ],
  required: [],
};

export const bodyNewUserSchema: JSONSchemaType<INewUser> = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  type: 'object',
  properties: {
    name: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    profilePicture: { type: 'string', nullable: true, default: null },
    role: {
      type: 'integer',
      enum: [0, 1],
      default: 1,
    },
    permissions: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'integer',
        enum: [0, 1, 2],
      },
      minItems: 1,
    },
  },
  required: ['name', 'email', 'role', 'permissions'],
  additionalProperties: false,
};
