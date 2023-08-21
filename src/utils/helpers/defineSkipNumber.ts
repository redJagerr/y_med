export const defineSkipNumber = (page: string, take: number) =>
  page === '1' ? 0 : (Number(page) - 1) * take;
