import SharedMeta from "../../components/Shared-meta";
import { data } from "../../../utilities/data";

export default function Head({ params }) {
  const { slug } = params;

  const product = data.products.find((product) => product.slug === slug);

  return (
    <>
      <SharedMeta />
      <title>
        {product ? `Internet Store - ${product.name}` : "Product Not Found"}
      </title>
    </>
  );
}

/*
async function getPost(slug) {
  const res = await fetch('...');
  return res.json();
}

export default async function Head({ params }) {
  const post = await getPost(params.slug);

  return (
    <>
      <title>{post.title}</title>
    </>
  )
}

*/
