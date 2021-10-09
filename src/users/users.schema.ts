import { SchemaObject } from 'neode';

const UserSchema: SchemaObject = {
  id: {
    type: 'uuid',
    primary: true,
    required: true,
  },
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    unique: true,
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  emailConfirmed: {
    type: 'boolean',
    default: false,
    required: true,
  },
  friendRequests: {
    type: 'relationships',
    target: 'User',
    relationship: 'FRIEND_REQUEST',
    direction: 'out',
    properties: {
      id: 'string',
    },
  },
  friends: {
    type: 'relationships',
    target: 'User',
    relationship: 'FRIENDS',
    properties: {
      id: 'string',
    },
  },
};

export default UserSchema;
