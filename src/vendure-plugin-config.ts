import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DefaultJobQueuePlugin, DefaultSearchPlugin } from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import path from 'path';
import { customAdminUi } from './compile-admin-ui';
import { BraintreePlugin } from './plugins/braintree/braintree-plugin';
import { ReviewsPlugin } from './plugins/reviews/reviews-plugin';

const IS_PROD = path.basename(__dirname) === 'dist';

export const plugins = [
  AssetServerPlugin.init({
    route: 'assets',
    assetUploadDir: path.join(__dirname, '../static/assets'),
  }),
  DefaultSearchPlugin,
  DefaultJobQueuePlugin,
  EmailPlugin.init({
    route: 'mailbox',
    devMode: true,
    outputPath: path.join(__dirname, '../static/email/test-emails'),
    handlers: defaultEmailHandlers,
    templatePath: path.join(__dirname, '../static/email/templates'),
    globalTemplateVars: {
      // The following variables will change depending on your storefront implementation
      fromAddress: '"example" <noreply@example.com>',
      verifyEmailAddressUrl: 'http://localhost:8080/verify',
      passwordResetUrl: 'http://localhost:8080/password-reset',
      changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
    },
  }),
  AdminUiPlugin.init({
    route: 'admin',
    port: 3002,
    app: customAdminUi({ recompile: !IS_PROD, devMode: !IS_PROD }),
    adminUiConfig: {
      brand: 'Supurb',
      hideVendureBranding: true,
      hideVersion: false,
    },
  }),
  BraintreePlugin,
  ReviewsPlugin,
];
