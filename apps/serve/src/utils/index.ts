import * as crypto from 'crypto';

//md5 函数将输入字符串转换为其 MD5 哈希值，返回一个十六进制字符串
export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
