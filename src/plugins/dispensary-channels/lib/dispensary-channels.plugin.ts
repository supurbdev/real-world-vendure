import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { DispensaryChannelResolver } from './dispensary-channel.resolver';

const SLUG_REGEX = /^[a-z0-9-]+$/i;

const isSlug = (str: unknown): str is string => (typeof str === 'string' ? SLUG_REGEX.test(str) : false);

/**
 * This plugin handles the user onboarding process, capturing details from the user as needed.
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  configuration: config => {
    config.customFields = {
      ...config.customFields,
      Channel: [
        {
          name: 'slug',
          type: 'string',
          public: true,
          validate: (value: unknown) => {
            if (!isSlug(value)) {
              return `Must only contain alphanumeric and hyphen characters ([a-z ]+)`;
            }
          },
        },
      ],
    };

    return config;
  },
  shopApiExtensions: {
    // schema: gql`
    //   extend type Mutation {
    //     approveOrder(orderId: ID!): String!
    //   }
    // `,
    resolvers: [DispensaryChannelResolver],
  },
})
export class DispensaryChannelsPlugin { }
