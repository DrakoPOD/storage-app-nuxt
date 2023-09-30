type logsTypes = 'ERROR' | 'LOG';

export function log(LOG: logsTypes, pathFile: string, data: any) {
  console.log(`${LOG} -- from ${pathFile}:\n`);
  console.log(data);
}
