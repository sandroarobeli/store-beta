import SharedMeta from "../../components/sharedMeta";
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
export async function generateStaticParams() {
  const { users } = await getUsers();

  return users.map((user) => ({
    userId: user.id,
  }));
}

const Page = async ({ params }) => {
  const { user } = await getUserById(params.userId);

  return <User user={user} />;
};

*/

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
