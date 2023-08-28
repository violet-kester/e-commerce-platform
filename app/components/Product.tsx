import Image from 'next/image';

export default function Product({ name, image, price }) {
    return (
        <div>
            <Image src={image} alt={name} width={300} height={600} />
            <h1>{name}</h1>
            <p>{price}</p> {/* needs to be formatted */}
        </div>
    );
}