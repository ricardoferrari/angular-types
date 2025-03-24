import { Person } from "./person";
import { RolesEnum } from "./roles";

type Role = RolesEnum.admin | RolesEnum.user;

type BaseUser = Pick<Person, 'name' | 'age'>;

export type UserWithRole<T extends Role> = T extends RolesEnum.admin
  ? BaseUser & { permissions: string[] }
  : BaseUser;