import { Resolver, ResolveField } from '@nestjs/graphql';

@Resolver('Channel')
export class DispensaryChannelResolver {

  @ResolveField()
  async slug() {
    return 'hi';
  }
}