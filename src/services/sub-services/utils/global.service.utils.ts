const constructAxiosCancelToken = ({ requestSource }: { requestSource: { token: string } }) => ({
  cancelToken: requestSource.token,
});

export default {
  constructAxiosCancelToken,
};
