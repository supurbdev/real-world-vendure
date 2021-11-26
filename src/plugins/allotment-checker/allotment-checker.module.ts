import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { gql } from 'apollo-server-core';
import { AllotmentCheckResolver } from './allotment-check.resolver';
import { allotmentValidationProcess } from './allotment-validation-process';

/**
 * This plugin implements the Braintree (https://www.braintreepayments.com/) payment provider.
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  configuration: config => {
    config.orderOptions.process.push(allotmentValidationProcess);
    return config;
  },
  shopApiExtensions: {
    schema: gql`
      extend type Mutation {
        approveOrder(orderId: ID!): String
      }
    `,
    resolvers: [AllotmentCheckResolver],
  },
})
export class AllotmentCheckerPlugin { }
