import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from '@src/casl/casl-ability.factory';
import { PolicyHandlerConstructor } from '@src/casl/interfaces/policy-handler.interface';
import { RequestData } from '@src/generic.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandlerConstructor[]>(
        'CHECK_POLICIES_KEY',
        context.getHandler(),
      ) || [];

    const { user, data } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, data),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandlerConstructor,
    ability: AppAbility,
    data: RequestData,
  ) {
    const handlerInstance = new handler(data);
    return handlerInstance.handle(ability);
  }
}
