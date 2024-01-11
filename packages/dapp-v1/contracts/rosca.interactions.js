import { utils, ethers } from 'ethers';
import { getSigner } from '../config/signer';
import roscasAbi from './abis/rosca.abi.json';
import { approveFunds } from './token.interactions';

const getRoscaContract = (address) => {
  const signer = getSigner();
  return new ethers.Contract(address, roscasAbi, signer);
};

export const getRoscaDetails = async (address) => {
  const roscasContract = getRoscaContract(address);
  const result = await roscasContract.getDetails();
  console.log(result);
  const space = {
    roscaName: result.roscaName,
    imgLink: result.imgLink,
    goalAmount: utils.formatUnits(result.goalAmount.toString(), 18),
    ctbDay: result.ctbDay,
    ctbOccur: result.ctbOccur,
    disbDay: result.disbDay,
    disbOccur: result.ctbOccur,
    dueDate: new Date(result.nxtDeadline.toString() * 1000).toDateString(),
    activeMembers: utils.formatUnits(result.activeMembers.toString(), 0),
    currentRound: utils.formatUnits(result.currentRound.toString(), 0),
    creator: result.creator,
    roscaBal: utils.formatUnits(result.roscaBal.toString(), 18),
    address: result.roscaAddress,
  };
  return space;
};

export const fundSpace = async (addr, amount) => {
  console.log(addr, amount);
  const res = await approveFunds(addr, amount);
  if (res.error) {
    return res;
  }
  const amountInWei = utils.parseUnits(amount, 18);
  const roscasContract = getRoscaContract(addr);
  const result = await roscasContract.fundRound(amountInWei);
  return result;
};
