import { ethers } from 'ethers';
const nonoContract = '0xF4C532C076A7B7c3E60D17d517ed8d0d34a8a796';

const rpcs = [
    'https://developer-access-mainnet.base.org',
    'https://base.blockpi.network/v1/rpc/public',
    'https://mainnet.base.org',
]

// const rpcs = [
//     'https://rpc.ankr.com/eth',
//     'https://ethereum.blockpi.network/v1/rpc/public',
//     'https://eth-mainnet.public.blastapi.io'
// ];

// const rpcs = [
//     'https://bsc-dataseed1.ninicoin.io',
//     'https://bsc-dataseed1.binance.org',
//     'https://bsc-dataseed1.defibit.io',
//     'https://rpc.ankr.com/bsc',
//     'https://koge-rpc-bsc.bnb48.club/',

//     // 'https://rpc.ankr.com/eth_goerli',
//     // 'https://goerli.gateway.tenderly.co',
// ];
let idx = 0;

const getProvider = () => {
    const provider = new ethers.providers.JsonRpcProvider(rpcs[idx]); // 选一个可用的 rpc
    idx = (idx + 1) % rpcs.length;
    return provider;
};

const abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor', },
    { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address', }, { indexed: true, internalType: 'address', name: 'spender', type: 'address', }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256', },], name: 'Approval', type: 'event', },
    { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address', }, { indexed: true, internalType: 'address', name: 'newOwner', type: 'address', },], name: 'OwnershipTransferred', type: 'event', },
    { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address', }, { indexed: true, internalType: 'address', name: 'to', type: 'address', }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256', },], name: 'Transfer', type: 'event', },
    { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'to', type: 'address', }, { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256', },], name: 'Winning', type: 'event', },
    { inputs: [], name: 'LP', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'WETH', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: '', type: 'address', },], name: '_hasOut', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: '', type: 'address', },], name: '_isBlacklisted', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: '', type: 'address', },], name: '_isExcludedFromFees', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: '', type: 'address', },], name: '_isWinner', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], name: '_winRecords', outputs: [{ internalType: 'uint256', name: 'TYPE', type: 'uint256', }, { internalType: 'address', name: 'ADDR', type: 'address', }, { internalType: 'uint256', name: 'AMOUNT', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'owner', type: 'address', }, { internalType: 'address', name: 'spender', type: 'address', },], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'spender', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', },], name: 'approve', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'account', type: 'address', },], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'currentTopBuyer', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'currentTopBuyerETH', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'currentTopBuyerTime', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'spender', type: 'address', }, { internalType: 'uint256', name: 'subtractedValue', type: 'uint256', },], name: 'decreaseAllowance', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [{ internalType: 'address[]', name: 'accounts', type: 'address[]', }, { internalType: 'bool', name: 'excluded', type: 'bool', },], name: 'excludeFromFees', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'addr', type: 'address', },], name: 'getRank', outputs: [{ internalType: 'uint256', name: 'rank', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'uint256', name: 'maxLen', type: 'uint256', },], name: 'getTopWaitingList', outputs: [{ internalType: 'address[]', name: '', type: 'address[]', }, { internalType: 'uint256[]', name: '', type: 'uint256[]', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'getWinRecords', outputs: [{ components: [{ internalType: 'uint256', name: 'TYPE', type: 'uint256', }, { internalType: 'address', name: 'ADDR', type: 'address', }, { internalType: 'uint256', name: 'AMOUNT', type: 'uint256', },], internalType: 'struct TOKEN.WinRecord[]', name: '', type: 'tuple[]', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'spender', type: 'address', }, { internalType: 'uint256', name: 'addedValue', type: 'uint256', },], name: 'increaseAllowance', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [], name: 'launch', outputs: [], stateMutability: 'payable', type: 'function', },
    { inputs: [], name: 'launched', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'marketingAddr', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'prizePool1', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'prizePool2', outputs: [{ internalType: 'contract ETHBANK', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'prizePoolCondition', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'prizePoolConditionIncrease', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [], name: 'round', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'roundWinnerCount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'routerAddr', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: '_marketingAddr', type: 'address', },], name: 'set_marketingAddr', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [{ internalType: 'uint256', name: '_roundWinnerCount', type: 'uint256', },], name: 'set_roundWinnerCount', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [{ internalType: 'uint256', name: '_swapThreshold', type: 'uint256', },], name: 'set_swapThreshold', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [], name: 'swapThreshold', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'token_', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', },], name: 'sweep', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'topBuyerTimeThreshold', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'to', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', },], name: 'transfer', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'from', type: 'address', }, { internalType: 'address', name: 'to', type: 'address', }, { internalType: 'uint256', name: 'amount', type: 'uint256', },], name: 'transferFrom', outputs: [{ internalType: 'bool', name: '', type: 'bool', },], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [{ internalType: 'address', name: 'newOwner', type: 'address', },], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function', },
    { inputs: [], name: 'waitingCondition', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'address', name: '', type: 'address', },], name: 'waitingIdx', outputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], stateMutability: 'view', type: 'function', },
    { inputs: [{ internalType: 'uint256', name: '', type: 'uint256', },], name: 'waitingList', outputs: [{ internalType: 'address', name: '', type: 'address', },], stateMutability: 'view', type: 'function', },
    { stateMutability: 'payable', type: 'receive', },
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
};

const getPrizePoolInfo = async (): Promise<{ prizePool: ethers.BigNumber; prizePoolCondition: ethers.BigNumber }> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const prizePoolCondition = await contract.prizePoolCondition();
    const prizePool = await getProvider().getBalance(nonoContract);
    return {
        prizePool, // 奖池金额
        prizePoolCondition, // 开奖奖池
    };
};

const getBlackAmount = async (): Promise<{ amount: ethers.BigNumber }> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const winRecords = await contract.getWinRecords();
    var obj: { amount: ethers.BigNumber } = { amount: ethers.BigNumber.from(0) }
    var amountAll = ethers.BigNumber.from(0);
    for (const r of winRecords) {
        if (r.TYPE.toString() == "1") {
            var num = await contract.balanceOf(r.ADDR);
            amountAll = amountAll.add(num);
        }

    }
    obj.amount = amountAll;
    return obj;
};


const getWinRecords = async (): Promise<{ address: string; amount: ethers.BigNumber, type: number }[]> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const winRecords = await contract.getWinRecords();
    return winRecords.map((r: any) => {
        return {
            address: r.ADDR,
            amount: r.AMOUNT,
            type: r.TYPE.toNumber(),
        }
    });
};

const getTopWaitingList = async (len: number): Promise<{ address: string; amount: ethers.BigNumber }[]> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const [topWaitingList, balances] = await contract.getTopWaitingList(len);
    const result: { address: string; amount: ethers.BigNumber }[] = [];
    for (let i = 0; i < topWaitingList.length; i++) {
        if (topWaitingList[i] !== ethers.constants.AddressZero && Number(topWaitingList[i]) != 0)
            result.push({ address: topWaitingList[i]?._hex || topWaitingList[i], amount: balances[i] });
    }
    return result;
};

// Arena

const getPrizePool2Info = async (): Promise<{ prizePool: ethers.BigNumber; }> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const prizePool2 = await contract.prizePool2();
    const prizePool = await getProvider().getBalance(prizePool2);
    return {
        prizePool, // 奖池金额
    };
};

const getTopBuyerTimeThreshold = async (): Promise<number> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const topBuyerTimeThreshold = await contract.topBuyerTimeThreshold();
    return topBuyerTimeThreshold.toNumber();
}

const getCurentArena = async (): Promise<{ address: string; amount: ethers.BigNumber, time: number }> => {
    const contract = new ethers.Contract(nonoContract, abi, getProvider());
    const account = await contract.currentTopBuyer();
    const amount = await contract.currentTopBuyerETH();
    const time = await contract.currentTopBuyerTime();
    return { address: account, amount, time: time.toNumber() };
}

export { getRound, getRank, getPrizePoolInfo, getPrizePool2Info, getWinRecords, getTopWaitingList, getTopBuyerTimeThreshold, getCurentArena, getBlackAmount };
