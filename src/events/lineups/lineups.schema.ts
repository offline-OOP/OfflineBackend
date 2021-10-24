import { SchemaObject } from 'neode';

const LineupsSchema: SchemaObject = {
  id: {
    type: 'uuid',
    primary: true,
    required: true,
  },
  datetime: {
    type: 'datetime',
    required: true,
  },
  coordinates: {
    type: 'Point',
    required: true,
  },
  address: {
    type: 'string',
    required: true,
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

export default LineupsSchema;
