import { createParamDecorator } from '@nestjs/common';

export const Ids = createParamDecorator((_, req) => (req.query.ids || '').split(',').map(id => parseInt(id)))
