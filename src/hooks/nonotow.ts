import { ethers, Contract, BigNumber } from 'ethers';
import abi from "@/abi/lottery.json"
const nonoContract = '0xF4C532C076A7B7c3E60D17d517ed8d0d34a8a796';

// 币安智能链 rpc
const rpcs = [
  'https://bsc-dataseed1.ninicoin.io',
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://rpc.ankr.com/bsc',
  'https://koge-rpc-bsc.bnb48.club/',
];

// eth智能链 rpc
const ethRpcs = [
  'https://rpc.ankr.com/eth',
  'https://api.securerpc.com/v1',


]

let idx = 0;

const getProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(ethRpcs[idx]); // 选一个可用的 rpc
  idx = (idx + 1) % ethRpcs.length;
  return provider;
};




// 获取营销税（代币）
const getMarkTaxFeeAmount = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const markTaxFeeAmount = await contract.markTaxFeeAmount();
  return markTaxFeeAmount;
};

// 获取买税（代币）
const getBuyTaxFeeAmount = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const buyTaxFeeAmount = await contract.buyTaxFeeAmount();
  return buyTaxFeeAmount;
};

// 获取卖税（代币）
const getSellTaxFeeAmount = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const sellTaxFeeAmount = await contract.sellTaxFeeAmount();
  return sellTaxFeeAmount;
};

// 获取池子税
const getPoolTax = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const poolTax = await contract._poolTax();
  return poolTax;
};

// 获取营销税
const getMarketingTax = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const marketingTax = await contract._marketingTax();
  return marketingTax;
};

// 获取池子地址
const getPoolAddress = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const poolAddress = await contract.poolAddress();
  return poolAddress;
};

// 获取营销钱包地址
const getMarketingAddress = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const marketingAddress = await contract._marketingAddress();
  return marketingAddress;
};

// 获取最新的轮次编号
const getLatestRoundNumber = async () => {
  const contract = new Contract(nonoContract, abi, getProvider());
  const latestRoundNumber = await contract.latestRoundNumber();
  return latestRoundNumber.toNumber();
};

// 获取最后开奖的轮次
const getLotteryRoundNumber = async () => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const lotteryRoundNumber = await contract.lotteryRoundNumber();
  return lotteryRoundNumber;
};

// 查询指定轮次数据
const getRoundData = async (roundNumber) => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const data = await contract.getRoundData(roundNumber);
  return {
    startBlockNumber: data[0],
    endBlockNumber: data[1],
    roundNumber: data[2],
    buyTaxFeeAmount: data[3],
    markTaxEthAmount: data[4],
    buyTaxEthAmount: data[5],
    sellTaxEthAmount: data[6],
    winningAddress: data[7],
  };
};

// 获取指定轮次参与抽奖的钱包和钱包税（代币）
const getRoundParticipatorData = async (roundNumber) => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const data = await contract.getRoundParticipatorData(roundNumber);
  return {
    addresses: data[0],
    taxes: data[1],
  };
};

// 获取指定轮次的所有数据
const getRoundAllData = async (roundNumber) => {
  const contract = new ethers.Contract(nonoContract, abi, getProvider());
  const data = await contract.getRoundAllData(roundNumber);
  const checkIsBigNumber = (
    value: {
      _hex: string;
      _isBigNumber: boolean;
    }
  ) => {
    if (value._isBigNumber) {
      return BigNumber.from(value._hex)
    } else {
      return value._hex
    }
  }
  return {
    roundData: {
      buySumEthAmount: ethers.utils.formatEther(checkIsBigNumber(data[0].buySumEthAmount)),
      startBlockNumber: data[0].startBlockNumber.toNumber(),
      endBlockNumber: data[0].endBlockNumber.toNumber(),
      roundNumber: data[0].roundNumber.toNumber(),
      buyTaxFeeAmount: ethers.utils.formatEther(checkIsBigNumber(data[0].buyTaxFeeAmount)),
      markTaxEthAmount: ethers.utils.formatEther(checkIsBigNumber(data[0].markTaxEthAmount)),
      buyTaxEthAmount: ethers.utils.formatEther(checkIsBigNumber(data[0].buyTaxEthAmount)),
      sellTaxEthAmount: ethers.utils.formatEther(checkIsBigNumber(data[0].sellTaxEthAmount)),
      winningAddress: data[0].winningAddress === '0x0000000000000000000000000000000000000000' ? '' : data[0].winningAddress
    },
    addresses: data[1],
    taxes: data[2].map((item) => {
      return ethers.utils.formatEther(checkIsBigNumber(item))
    }),
    eths: data[3].map((item) => {
      return ethers.utils.formatEther(checkIsBigNumber(item))
    }),

  }

};

export {
  getMarkTaxFeeAmount,
  getBuyTaxFeeAmount,
  getSellTaxFeeAmount,
  getPoolTax,
  getMarketingTax,
  getPoolAddress,
  getMarketingAddress,
  getLatestRoundNumber,
  getLotteryRoundNumber,
  getRoundData,
  getRoundParticipatorData,
  getRoundAllData,
}