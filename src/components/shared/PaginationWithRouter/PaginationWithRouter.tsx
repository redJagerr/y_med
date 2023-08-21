import { Pagination } from 'antd';
import { useRouter } from 'next/router';

interface PaginationWithRouterProps {
  pages: string;
}

const PaginationWithRouter = ({ pages }: PaginationWithRouterProps) => {
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.query.page = String(page);
    router.push(router);
  };

  return (
    <Pagination
      current={Number(router.query.page)}
      total={Number(pages) * 10}
      onChange={onPageChange}
    />
  );
};

export default PaginationWithRouter;
