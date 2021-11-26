import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  Ctx,
  ID,
  InternalServerError,
  Logger,
  OrderService, RequestContext,
  TransactionalConnection
} from '@vendure/core';
import { loggerCtx } from './constants';

// import { PaymentMethodArgsHash } from './types';

@Resolver()
export class AllotmentCheckResolver {
  constructor(private connection: TransactionalConnection, private orderService: OrderService) { }

  @Mutation()
  async approveOrder(@Ctx() ctx: RequestContext, @Args() { orderId }: { orderId: ID }) {
    const order = await this.orderService.findOne(ctx, orderId);
    if (order) {
      // const args = await this.getPaymentMethodArgs(ctx);
      // const gateway = getGateway(args);
      try {
        // const result = await gateway.clientToken.generate({
        //   merchantAccountId: args.merchantAccountId,
        // });
        // return result.clientToken;

        return null;
      } catch (e) {
        Logger.error(e);
      }
    } else {
      throw new InternalServerError(`[${loggerCtx}] Could not find a Customer for the given Order`);
    }
  }
}
