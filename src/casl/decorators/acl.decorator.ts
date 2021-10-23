import { CanActivate, UseGuards, Type } from '@nestjs/common';

import { PoliciesGuard } from '@src/casl/policies.guard';

export function Acl(authGuard: Type<CanActivate>) {
  return UseGuards(authGuard, PoliciesGuard);
}
