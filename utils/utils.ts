type logsTypes = 'ERROR' | 'LOG';

export function log(LOG: logsTypes, pathFile: string, data: any) {
  console.log(`${LOG} -- from ${pathFile}:\n`);
  console.log(data);
}

// Function to test delay
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
