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
};

export default UserSchema;
