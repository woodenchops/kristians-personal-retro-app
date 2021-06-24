import Link from 'next/link';
import { PER_PAGE } from '../config/index';

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/retros?page=${+page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/retros?page=${+page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
    </>
  );
}
