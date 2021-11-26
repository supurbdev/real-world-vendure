import { PluginCommonModule, VendurePlugin } from '@vendure/core';

/**
 * This plugin handles the user onboarding process, capturing details from the user as needed.
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  configuration: config => {

    return config;
  },
  shopApiExtensions: {
    // schema: gql`
    //   extend type Mutation {
    //     approveOrder(orderId: ID!): String!
    //   }
    // `,
    resolvers: [],
  },
})
export class OnboardingPlugin { }
