import { SchemaObject } from 'neode';
import { CategoriesEnum } from '@src/events/interfaces/categories.interface';

const EventsSchema: SchemaObject = {
  id: {
    type: 'uuid',
    primary: true,
    required: true,
  },
  name: {
    type: 'string',
    required: true,
    unique: true,
  },
  category: {
    type: 'string',
    required: true,
    default: CategoriesEnum.OFFLINE_EVENT,
  },
  price: {
    type: 'number',
    default: 0,
  },
  purchaseLink: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
  link: {
    type: 'string',
  },
  age: {
    type: 'number',
  },
  maxPerson: {
    type: 'number',
  },
  owner: {
    type: 'relationship',
    target: 'User',
    relationship: 'OWNER',
    direction: 'in',
    properties: {
      id: 'string',
    },
    eager: true,
    cascade: 'delete',
  },
  participants: {
    type: 'relationships',
    target: 'User',
    relationship: 'PARTICIPANT',
    direction: 'in',
    properties: {
      id: 'string',
    },
    cascade: 'delete',
    eager: true,
  },
};

export default EventsSchema;
