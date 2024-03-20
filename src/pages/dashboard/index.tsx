import { useState } from "react";
import styled from "styled-components";
import ArrowImg from "@/assets/img/icons8.png";
import { ethers } from "ethers";
import {
  getPrizePoolInfo,
  getRank,
  getRound,
  getTopWaitingList,
  getWinRecords,
} from "@/hooks/nono";

// Styled components
export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  min-height: calc(100vh - 100px);
  .nono {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
export const LeftPanel = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const RightPanel = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const DashboardBox = styled.div`
  width: 100%;
  min-height: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Prize = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 24px;
  height: 48px;
  .ETH {
    width: 80px;
    border-radius: 5px;
    border: 2px solid #c60929;
    padding: 5px 10px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ProgressBar = styled.div<{
  progress: string;
  total: string;
}>`
  width: 150px;
  height: 30px;
  background-color: #16191b;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &::before {
    content: "";
    width: ${(props) => (Number(props.progress) / Number(props.total)) * 100}%;
    height: 100%;
    background-color: #c60929;
    position: absolute;
    top: 0;
    left: 0;
  }
  span {
    color: #fff;
    font-size: 14px;
    background: #16191b;
    mix-blend-mode: lighten;
  }
`;
export const Current = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
  }
`;
export const RedText = styled.span`
  color: #c60929;
`;
export const Column = styled.div`
  width: 100%;
  color: #fff;
`;
export const ColumnFlex = styled(Column)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #fff;
  border-radius: 5px;
`;
export const Input = styled.input`
  width: 80%;
  padding: 8px;
  height: 40px;
  border: none;
  box-sizing: border-box;
  /* 取消选中后的默认效果 */
  -webkit-tap-highlight-color: transparent;
  outline: none;
  border-radius: 5px 0px 0px 5px;
  background-color: #fff;
  color: #000;
  &::placeholder {
    color: #000;
  }
  &:focus {
    border: 1px solid #000;
  }
`;

export const Button = styled.button`
  width: 20%;
  padding: 8px 16px;
  height: 40px;
  background-color: rgb(198, 9, 41);
  color: #fff;
  border: none;
  border-radius: 0px 5px 5px 0px;
  cursor: pointer;
`;

export const ListContainer = styled.div`
  height: 300px;
  background-color: #16191b;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
`;
export const ListBox = styled.div`
  height: calc(100% - 40px);
  margin-top: 15px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #555;
  }

  &::-webkit-scrollbar-thumb {
    background: #c60929;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #333;
  &:last-child {
    border-bottom: none;
  }
`;
export const FlexList = styled(ListItem)`
  justify-content: space-evenly;
`;
export const Rank = styled.span`
  width: 20px;
  text-align: center;
  margin-right: 5px;
  color: #fff;
  font-weight: bold;
`;
export const Address = styled.span`
  color: #fff;
  font-size: 14px;
`;
export const Arrow = styled.img`
  font-size: 20px;
  margin-right: 10px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ArrowRight = styled(Arrow)`
  margin-right: 0px;
`;
export const Flex = styled(Column)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
export const BonusAmount = styled.span`
  color: #fff;
`;
export const Amount = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 24px;

  span {
    font-size: 24px;
  }
`;
export const Box = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 1px solid #c60929;
  padding: 10px;
  border-radius: 5px;
  background: #c60929;
  text-align: center;
  span {
    text-align: center;
    width: 100%;
    font-size: 18px;
  }
`;
export const WEBINFO = styled.div`
  display: flex;
  color: #fff;
  align-items: flex-start;
  padding: 0 20px;
  .web-info-right {
    margin: 0;
  }
  .web-info-right {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .web-info-right .line {
    width: 1px;
    height: 13px;
    background: #fff;
    margin: 0 10px;
  }

  .web-info-right .web-info-right-item span {
    color: #fff;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    cursor: pointer;
  }
  .web-info-right .web-info-right-item span a {
    color: #fff;
    text-decoration: none;
  }
`;
export const Circle = styled.div`
  width: 320px;
  height: 320px;
  border-radius: 50%;
  border: 20px solid #c60929;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #c60929;
  p {
    margin: 0;
    font-size: 32px;
  }
  .number {
    font-size: 92px;
    font-weight: 800;
  }
`;

let sync: any;
let timer = setInterval(() => {
  if (sync) {
    sync();
    clearInterval(timer);
  }
}, 1000);

// Main component
const Dashboard = () => {
  // 搜索框的值
  const [searchInput, setSearchInput] = useState("");
  // 累计奖金分配金额
  const [sumBonus, setSumBonus] = useState(ethers.BigNumber.from(0));
  const [prizePoolCondition, setPrizePoolCondition] = useState(
    ethers.BigNumber.from(0)
  );
  const [prizePool, setPrizePool] = useState(ethers.BigNumber.from(0));
  // 排名
  const [rank, setRank] = useState(0);
  const [round, setRound] = useState(0);

  // 轮次奖池
  const [winnerRecords, setWinnerRecords] = useState<
    { address: string; amount: ethers.BigNumber }[]
  >([
    // {
    //   address: "0x000000000000000000000000000000000000dEaD",
    //   Eth: "1",
    // },
  ]);
  // 当前奖池
  const [topWaitingList, setTopWaitingList] = useState<
    { address: string; amount: ethers.BigNumber }[]
  >([]);

  sync = async () => {
    console.log("sync");
    try {
      await Promise.all([
        getPrizePoolInfo().then((_prizePoolInfos) => {
          setPrizePoolCondition(_prizePoolInfos.prizePoolCondition);
          setPrizePool(_prizePoolInfos.prizePool);
        }),
        getRound().then((_round) => {
          setRound(_round);
        }),
        getTopWaitingList(100).then((_topWaitingList) => {
          setTopWaitingList(_topWaitingList);
        }),
        getWinRecords().then((_winnerRecords) => {
          let sum = ethers.BigNumber.from(0);
          for (const record of _winnerRecords.filter((r) => r.type == 1)) {
            sum = sum.add(record.amount);
          }
          setWinnerRecords(_winnerRecords.filter((r) => r.type == 1));
          setSumBonus(sum);
        }),
      ]);
    } catch (error) {
      // console.log(error);
    }

    await new Promise((r) => setTimeout(r, 3000));
    sync();
  };

  const searchRank = async () => {
    setRank(0);
    try {
      if (ethers.utils.isAddress(searchInput) === false) {
        alert("Please enter a valid address");
        return;
      }
      const rank = await getRank(searchInput);
      setRank(rank);
    } catch (error) {
      console.log(error);
    }
  };

  const bnFixed = (
    n: ethers.BigNumber,
    decimals: number,
    fixed: number,
    notZeroFixed?: number
  ): string => {
    return numFixed(ethers.utils.formatUnits(n, decimals), fixed, notZeroFixed);
  };
  const numFixed = (
    n: string | number,
    fixed: number,
    notZeroFixed?: number
  ): string => {
    if (isNaN(Number(n))) return String(n);
    n = parseFloat("" + n);
    let eformat = n.toExponential();
    let tmpArray: any = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/);
    n = n.toFixed(Math.max(0, (tmpArray[1] || "").length - tmpArray[2]));
    const dotIdx = n.indexOf(".");
    if (dotIdx == -1) return n;
    const notZeroIdx = n.split(".")[1].search(/[^0]/);
    let result = n;
    if (notZeroIdx) {
      notZeroFixed = notZeroFixed == undefined ? fixed : notZeroFixed;
      result = n.slice(0, dotIdx + notZeroIdx + notZeroFixed + 1);
    } else result = n.slice(0, dotIdx + fixed + 1);
    return result.replace(/\.?0+$/, "");
  };

  return (
    <>
      <Container>
        {/* Left Panel */}
        <LeftPanel>
          <DashboardBox>
            <Amount>
              <span>Sequential prize pool </span>
            </Amount>
            <Amount>
              <span>Accumulated bonus distribution amount </span>
            </Amount>
            <ColumnFlex>
              <Box>
                {ethers.utils.formatEther(sumBonus).replace(/\.0$/, "")}
                &ensp;ETH
              </Box>
              <span>Total deflation：XX $NONO</span>
            </ColumnFlex>
            <Flex>
              <span>Bonus distribution records</span>
            </Flex>
            <Column>
              <ListContainer>
                <div>
                  <span> </span>
                  <span></span>
                </div>
                <ListBox>
                  {winnerRecords.map((item, index) => (
                    <FlexList key={index}>
                      <Address>{item.address}</Address>
                      <Arrow src={ArrowImg} alt="arrow" />
                      <BonusAmount>
                        {ethers.utils
                          .formatEther(item.amount)
                          .replace(/\.0$/, "")}{" "}
                        ETH
                      </BonusAmount>
                    </FlexList>
                  ))}
                </ListBox>
              </ListContainer>
            </Column>
          </DashboardBox>
        </LeftPanel>

        {/* Right Panel */}
        <RightPanel>
          <DashboardBox>
            <Column>
              <Prize>
                <span>
                  Round.{round}
                  <RedText> Pool</RedText>
                </span>
                <ProgressBar
                  progress={bnFixed(prizePool, 18, 4)}
                  total={ethers.utils
                    .formatEther(prizePoolCondition)
                    .replace(/\.0$/, "")}
                >
                  <span>{bnFixed(prizePool, 18, 4)}</span>
                  <span> / </span>
                  <span>
                    {ethers.utils
                      .formatEther(prizePoolCondition)
                      .replace(/\.0$/, "")}
                  </span>
                  ETH
                </ProgressBar>
              </Prize>
            </Column>
            <Column>
              <InputBox>
                <Input
                  type="text"
                  placeholder="Enter wallet address"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button onClick={searchRank}>Check</Button>
              </InputBox>
            </Column>
            <Column>
              <Current>
                <span>Current address ranking</span>
                <span>Sorting condition: Purchase ≥ 0.05 ETH $NONO</span>
                <RedText>NO.{rank ? rank : "--"}</RedText>
              </Current>
            </Column>
            <Column>
              <ListContainer>
                <div>
                  <span> </span>
                  <span></span>
                </div>
                <ListBox>
                  {topWaitingList.map((item, index) => (
                    <ListItem key={index}>
                      {
                        <Rank>
                          <RedText>{index + 1}</RedText>
                        </Rank>
                      }

                      <Arrow src={ArrowImg} alt="arrow" />
                      <Address>{item.address}</Address>
                      <ArrowRight src={ArrowImg} alt="arrow" />
                      <BonusAmount>
                        {bnFixed(item.amount, 18, 4)} $NONO
                      </BonusAmount>
                    </ListItem>
                  ))}
                </ListBox>
              </ListContainer>
            </Column>
          </DashboardBox>
        </RightPanel>
      </Container>

      <WEBINFO>
        <div className="time">@2024 NONO Finance </div>
        <div className="web-info-right">
          <div className="web-info-right-item">
            <span>
              <a href="https://twitter.com/NONOCoins" target="_blank">
                Twitter
              </a>
            </span>
          </div>
          <div className="line"></div>
          <div className="web-info-right-item">
            <span>
              <a href="https://t.me/NONOcoins" target="_blank">
                Telegram
              </a>
            </span>
          </div>
        </div>
      </WEBINFO>
    </>
  );
};

export default Dashboard;
