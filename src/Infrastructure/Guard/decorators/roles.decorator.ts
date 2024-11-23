import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();

it('placeholder test', () => {
    expect(true).toBe(true);
  });