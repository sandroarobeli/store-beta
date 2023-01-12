import { data } from "../auxillary/data"; // For temporary testing use
//import { Suspense } from "react";

import ProductItem from "./components/ProductItem";

// DATA (data in this example) GETS FETCHED HERE AND INJECTED DIRECTLY INTO PAGE!
// NOT PASSED AS PROPS
// REMEMBER SUSPENSE!!!
// UNSUCCESSFUL SO FAR. WAIT TILL ACTUAL API CALL HAPPENS...
/*
  async function getProducts() {
    const res = await fetch('https://api.example.com/todos');
    const products = await res.json();
    return products;
  }
  }
*/

export default function HomeScreen() {
  // const products = await getProducts();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data.products.map((product) => (
        <ProductItem product={product} key={product.slug} />
      ))}
    </div>
  );
}
