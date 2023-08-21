const Error = ({ statusCode }: { statusCode: any }) => (
  <div>
    {statusCode === 404 ? 'The page you are looking for could not be found.' : 'An error occurred.'}
  </div>
);
Error.getInitialProps = ({ res, err }: any) => {
  const status = () => {
    if (res) return res.statusCode;
    if (err) return err.statusCode;
    return 404;
  };

  return { statusCode: status() };
};
export default Error;
