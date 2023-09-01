import Image from 'next/image';
import formatPrice from '@/util/PriceFormat';
import { ProductType } from '@/types/ProductType';
import Link from 'next/link';

export default function Product({
    id,
    name,
    image,
    description,
    unit_amount,
    metadata
}: ProductType) {
    const { features } = metadata;

    return (
        // avoid re-fetching product data from stripe by querying for product data within link
        <Link href={{
            pathname: `/products/${id}`,
            query: { id, name, image, description, unit_amount, features }
        }}>
            <div className='text-gray-700'>
                <Image src={image} alt={name} width={600} height={900} className='rounded-lg' />
                <div className='font-medium py-2'>
                    <h1>{name}</h1>
                    <h2 className='text-sm text-teal-700'>
                        {unit_amount ? formatPrice(unit_amount) : 'Price unavailable'}
                    </h2>
                </div>
            </div>
        </Link>
    );
}