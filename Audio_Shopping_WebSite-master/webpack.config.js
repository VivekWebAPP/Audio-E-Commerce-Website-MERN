import { override, addWebpackAlias } from 'customize-cra';
import path from 'path';

export default override(
  addWebpackAlias({
    crypto: require.resolve('crypto-browserify')
  })
);
