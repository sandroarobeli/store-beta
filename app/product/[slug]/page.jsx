// INCORPORATE INCREMENTAL ON DEMAND UPDATES WHEN THE TIME COMES (VIA AUTH-KEY(ON DEMAND REVALIDATION)
// AND REVALIDATION
import Link from "next/link";
import Image from "next/image";

import { data } from "../../../utilities/data"; //Temporary. will be substituted by fetch later...
import AddToCartButton from "../../components/AddToCartButton";

export default function ProductScreen({ params }) {
  const { slug } = params;

  const product = data.products.find((product) => product.slug === slug);
  if (!product) {
    return <h3 className="font-semibold text-center">Product Not Found</h3>;
  }
  return (
    <div>
      <div className="py-2">
        <Link href="/" className="font-semibold">
          Back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul className="mb-2">
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.reviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.inStock > 0 ? "In stock" : "Sold out"}</div>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // const posts = await getPosts();

  return data.products.map((product) => ({
    slug: product.slug,
  }));
  // return posts.map((post) => ({
  //   slug: post.slug,
  // }));
}
