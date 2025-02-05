import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import {
  Api,
  ApiType,
  ListQueryBuilder,
  Product,
  TransactionalConnection,
} from "@vendure/core";

import { ProductReview } from "../entities/product-review.entity";
import { ProductreviewsArgs } from "../generated-shop-types";

@Resolver("Product")
export class ProductEntityResolver {
  constructor(
    private listQueryBuilder: ListQueryBuilder,
    private connection: TransactionalConnection
  ) {}

  @ResolveField()
  reviews(
    @Api() apiType: ApiType,
    @Parent() product: Product,
    @Args() args: ProductreviewsArgs
  ) {
    return this.listQueryBuilder
      .build(ProductReview, args.options || undefined, {
        where: {
          product,
          ...(apiType === "shop" ? { state: "approved" } : {}),
        },
        relations: ["product", "product.featuredAsset"],
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({
        items,
        totalItems,
      }));
  }

  @ResolveField()
  reviewsHistogram(@Parent() product: Product) {
    return this.connection.rawConnection
      .createQueryBuilder()
      .select("ROUND(`rating`)", "bin")
      .addSelect("COUNT(*)", "frequency")
      .from(ProductReview, "review")
      .where("review.product = :productId", { productId: product.id })
      .andWhere("review.state = :state", { state: "approved" })
      .groupBy("ROUND(`rating`)")
      .getRawMany();
  }
}
