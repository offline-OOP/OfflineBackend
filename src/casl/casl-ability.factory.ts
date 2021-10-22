import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from '@src/generic.interface';
import { UserInterface } from '@src/users/interfaces/users.interface';
import { Injectable } from '@nestjs/common';
import { Entity } from '@src/casl/interfaces/policy-handler.interface';

type Subjects = InferSubjects<typeof Entity> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserInterface) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.UPDATE, Entity, { ownerId: user.id });
    can(Action.DELETE, Entity, { ownerId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
