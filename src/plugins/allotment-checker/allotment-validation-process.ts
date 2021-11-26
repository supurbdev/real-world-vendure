import { CustomOrderProcess } from '@vendure/core';

export const allotmentValidationProcess: CustomOrderProcess<'ValidatingAllotment'> = {
  transitions: {
    Created: {
      to: ['ValidatingAllotment'],
      mergeStrategy: 'replace',
    },
    ValidatingAllotment: {
      to: ['PaymentAuthorized'],
    },
  },
};
