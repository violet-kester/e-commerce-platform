import Stripe from 'stripe';
import Product from './components/Product';

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });

  // fetch product data
  const products = await stripe.products.list();
  // {
  //   object: 'list',
  //   data: [
  //     {
  //       id: 'prod_OXFrVE1QwzF85H',
  //       object: 'product',
  //       active: true,
  //       attributes: [],
  //       created: 1693251826,
  //       default_price: 'price_1NkBLiC0n1aB2UhvB0m6TDHz',
  //       description: 'Add some color to your wardrobe...',
  //       images: [Array],
  //       livemode: true,
  //       metadata: {},
  //       name: 'Bold Kaftan',
  //       package_dimensions: null,
  //       shippable: null,
  //       statement_descriptor: null,
  //       tax_code: 'txcd_99999999',
  //       type: 'service',
  //       unit_label: null,
  //       updated: 1693252599,
  //       url: null
  //     },
  //     ...,
  //   ],
  //   has_more: false,
  //   url: '/v1/products'
  // }

  // fetch products with prices by product id
  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        price: prices.data[0].unit_amount,
        description: product.description,
        image: product.images[0],
        currency: prices.data[0].currency
      };
    })
  );

  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();
  // [
  //   {
  //     id: 'prod_OXFrVE1QwzF85H',
  //     name: 'Bold Kaftan',
  //     price: 15000,
  //     description: 'Add some color to your wardrobe...',
  //     image: 'https://files.stripe.com/links...',
  //     currency: 'usd'
  //   },
  //   {
  //     id: 'prod_OXFqIxgYSaNxJl',
  //     name: 'Concentric Kaftan',
  //     price: 14000,
  //     description: 'This classic kaftan is a...',
  //     image: 'https://files.stripe.com/links...',
  //     currency: 'usd'
  //   },
  //   {
  //     id: 'prod_OXFpT49jHkxmgz',
  //     name: 'Striped Kaftan',
  //     price: 12000,
  //     description: 'This chic kaftan is perfect...',
  //     image: 'https://files.stripe.com/links...',
  //     currency: 'usd'
  //   }
  // ]
  return (
    <main className='grid grid-cols-fluid gap-12'>

      {/* passes fetched product data to product component via props */}
      {products.map(product => <Product {...product} key={product.id} />)}

    </main>
  );
}