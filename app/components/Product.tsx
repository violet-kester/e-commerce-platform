import Image from 'next/image';
import formatPrice from '@/util/PriceFormat';
import { ProductType } from '@/types/ProductType';

export default function Product({
    name,
    image,
    price
}: ProductType) {
    return (
        <div>
            <Image src={image} alt={name} width={300} height={600} />
            <h1>{name}</h1>
            <p>{price ? formatPrice(price) : 'N/A'}</p>
        </div>
    );
}