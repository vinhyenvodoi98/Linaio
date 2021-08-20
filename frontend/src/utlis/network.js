export const contractAddress = {
  florencenet: {
    factory: 'KT1RvfaxUsJ6L8ynLjBwZqBQBswtXXXU1R1o',
  },
  null: {
    factory: null,
  },
};

export function getContractAddress(_networl) {
  return contractAddress[_networl];
}
