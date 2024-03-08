import { ethers } from 'ethers';

const nonoContract = '0x4137362e098dBefFa48749975af9C55Dab99E72E';

// const rpcs = [
//     'https://rpc.ankr.com/eth',
//     'https://ethereum.blockpi.network/v1/rpc/public',
//     'https://eth-mainnet.public.blastapi.io',
//     'https://singapore.rpc.blxrbdn.com',
// ];

const rpcs = [
   // 'https://bsc-dataseed1.ninicoin.io',
   // 'https://bsc-dataseed1.binance.org',
   // 'https://bsc-dataseed1.defibit.io',
   // 'https://rpc.ankr.com/bsc',
   // 'https://koge-rpc-bsc.bnb48.club/',

   'https://rpc.ankr.com/eth_goerli',
];
let idx = 0;

const getProvider = () => {
    const provider = new ethers.providers.JsonRpcProvider(rpcs[idx]); // 选一个可用的 rpc
    idx = (idx + 1) % rpcs.length;
    return provider;
}


const abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor', },
    { anonymous: false, inputs: [ { indexed: true, internalType: 'address', name: 'owner', type: 'address', }, { indexed: true, internalType: 'address', name: 'spender', type: 'address', }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256', }, ], name: 'Approval', type: 'event', },
    { inputs: [ { internalType: 'address', name: 'spender', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', }, ], name: 'approve', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'spender', type: 'address', }, { internalType: 'uint256', name: 'subtractedValue', type: 'uint256', }, ], name: 'decreaseAllowance', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'address[]', name: 'accounts', type: 'address[]', }, { internalType: 'bool', name: 'excluded', type: 'bool', }, ], name: 'excludeFromFees', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'spender', type: 'address', }, { internalType: 'uint256', name: 'addedValue', type: 'uint256', }, ], name: 'increaseAllowance', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [], name: 'launch', outputs: [], stateMutability: 'payable', type: 'function', },
    { anonymous: false, inputs: [ { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address', }, { indexed: true, internalType: 'address', name: 'newOwner', type: 'address', }, ], name: 'OwnershipTransferred', type: 'event', },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'address', name: '_marketingAddr', type: 'address', }, ], name: 'set_marketingAddr', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'uint256', name: '_swapThreshold', type: 'uint256', }, ], name: 'set_swapThreshold', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'token_', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', }, ], name: 'sweep', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'to', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', }, ], name: 'transfer', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'nonpayable', type: 'function', },
    { anonymous: false, inputs: [ { indexed: true, internalType: 'address', name: 'from', type: 'address', }, { indexed: true, internalType: 'address', name: 'to', type: 'address', }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256', }, ], name: 'Transfer', type: 'event', },
    { inputs: [ { internalType: 'address', name: 'from', type: 'address', }, { internalType: 'address', name: 'to', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', }, ], name: 'transferFrom', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'newOwner', type: 'address', }, ], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { anonymous: false, inputs: [ { indexed: true, internalType: 'address', name: 'to', type: 'address', }, { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256', }, ], name: 'Winning', type: 'event', },
    { stateMutability: 'payable', type: 'receive', },
    { inputs: [ { internalType: 'address', name: '', type: 'address', }, ], name: '_hasSold', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'address', name: '', type: 'address', }, ], name: '_isBlacklisted', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'address', name: '', type: 'address', }, ], name: '_isExcludedFromFees', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], name: '_winners', outputs: [ { internalType: 'address', name: '', type: 'address', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'owner', type: 'address', }, { internalType: 'address', name: 'spender', type: 'address', }, ], name: 'allowance', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'account', type: 'address', }, ], name: 'balanceOf', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'decimals', outputs: [ { internalType: 'uint8', name: '', type: 'uint8', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'address', name: 'addr', type: 'address', }, ], name: 'getRank', outputs: [ { internalType: 'uint256', name: 'rank', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'uint256', name: 'maxLen', type: 'uint256', }, ], name: 'getTopWaitingList', outputs: [ { internalType: 'address[]', name: '', type: 'address[]', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'getWinners', outputs: [ { internalType: 'address[]', name: '', type: 'address[]', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'holdCondition', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'launched', outputs: [ { internalType: 'bool', name: '', type: 'bool', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'LP', outputs: [ { internalType: 'address', name: '', type: 'address', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'marketingAddr', outputs: [ { internalType: 'address', name: '', type: 'address', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'name', outputs: [ { internalType: 'string', name: '', type: 'string', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'owner', outputs: [ { internalType: 'address', name: '', type: 'address', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'prizePoolCondition', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'prizePoolConditionIncrease', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'round', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'routerAddr', outputs: [ { internalType: 'address', name: '', type: 'address', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'swapThreshold', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'symbol', outputs: [ { internalType: 'string', name: '', type: 'string', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'totalSupply', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'address', name: '', type: 'address', }, ], name: 'waitingIdx', outputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [ { internalType: 'uint256', name: '', type: 'uint256', }, ], name: 'waitingList', outputs: [ { internalType: 'address', name: '', type: 'address', }, ], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'WETH', outputs: [ { internalType: 'address', name: '', type: 'address', }, ], stateMutability: 'view', type: 'function', },
];

const getRound = async (): Promise<number> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const round: ethers.BigNumber = await contract.round();
    return round.toNumber();
};

const getRank = async (addr: string): Promise<number> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const rank: ethers.BigNumber = await contract.getRank(addr);
    return rank.toNumber();
}

const getPrizePoolInfo = async (): Promise<{prizePool: ethers.BigNumber, prizePoolCondition: ethers.BigNumber}> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const prizePoolCondition = await contract.prizePoolCondition();
    const prizePool = await getProvider().getBalance(nonoContract);
    return {
        prizePool, // 奖池金额
        prizePoolCondition, // 开奖奖池
    };
};

const getWinners = async (): Promise<{address: string, amount: ethers.BigNumber}[]> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const winners = await contract.getWinners();
    const prizePoolCondition = await contract.prizePoolCondition();
    const prizePoolConditionIncrease = await contract.prizePoolConditionIncrease();
    const pricePoolConditionFirst = prizePoolCondition.sub(prizePoolConditionIncrease.mul(winners.length));
    const result: {address: string, amount: ethers.BigNumber}[] = [];
    let round = 0;
    for (const winner of winners) {
        result.push({
            address: winner,
            amount: pricePoolConditionFirst.add(prizePoolConditionIncrease.mul(round)),
        });
        round++;
    }
    return result;
};

const getTopWaitingList = async (len: number): Promise<string[]> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const topWaitingList = await contract.getTopWaitingList(len);
    return topWaitingList.filter((addr: string) => addr !== ethers.constants.AddressZero);
}

export {
    getRound,
    getRank,
    getPrizePoolInfo,
    getWinners,
    getTopWaitingList,
}
