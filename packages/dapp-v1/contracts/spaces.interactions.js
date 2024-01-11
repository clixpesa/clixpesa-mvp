import { ethers } from 'ethers';
import { getSigner } from '../config/signer';
import { spacesContract } from '../config/appconfig';
import spacesAbi from './abis/spaces.abi.json';

export const createSpace = async (space) => {
  const signer = getSigner();
  const contract = new ethers.Contract(spacesContract, spacesAbi, signer);
  const iFace = new ethers.utils.Interface(spacesAbi);
  const tx = await contract.createRosca(Object.values(space));
  const txReceipt = await tx.wait();
  const { data, topics } = txReceipt.logs.find((el) => el.address === spacesContract);
  const results = iFace.parseLog({ data, topics });
  if (results) {
    const roscaDetails = {
      address: results.args.roscaAddress,
      roscaName: results.args[2][1],
      goalAmount: ethers.utils.formatUnits(results.args[2][4], 18),
      goalAmountPaid: 0,
      ctbDay: results.args[2][6],
      ctbOccur: results.args[2][7],
      authCode: results.args[2][3],
    };
    return roscaDetails;
  } else {
    return null;
  }
};
