export type Person = {
  name: string;
  age: number;
  address: string;
}

export type PersonOptional = Partial<Person>;

export type PersonAddressOmmited = Omit<Person, 'address'>;