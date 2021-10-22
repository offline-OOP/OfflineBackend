import { SetMetadata, Type } from '@nestjs/common';
import { PolicyHandler } from '@src/casl/interfaces/policy-handler.interface';

export const CheckPolicies = (...handlers: Type<PolicyHandler>[]) =>
  SetMetadata('CHECK_POLICIES_KEY', handlers);
