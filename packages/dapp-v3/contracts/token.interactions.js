import { ethers } from 'ethers';
import { stableToken } from 'dapp/config';

export const getBalance = async (address, provider) => {
  const contractABI = ['function balanceOf(address account) external view returns (uint256)'];
  const contract = new ethers.Contract(stableToken, contractABI, provider);
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
};

export const approveFunds = async (spender, amount, signer) => {
  const amountInWei = ethers.utils.parseUnits(amount, 18);
  const contractABI = ['function approve(address spender, uint256 amount) public returns (bool)'];
  const contract = new ethers.Contract(stableToken, contractABI, signer);
  const result = await contract.approve(spender, amountInWei);
  return result;
};
