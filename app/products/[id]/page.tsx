import Image from 'next/image';
import { SearchParamsType } from '@/types/SearchParamsType';

export default async function Product({ searchParams }: SearchParamsType) {

    return (
        <div className='flex justify-between gap-24 p-12 text-gray-700'>
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={600}
                height={900}
                className='rounded-lg'
            />
            <div>
                <h1>{searchParams.name}</h1>
                <p>{searchParams.description}</p>
            </div>
        </div>
    );
}