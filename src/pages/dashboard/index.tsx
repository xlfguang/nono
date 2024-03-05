import { useState } from "react";
import styled from "styled-components";
import ArrowImg from "@/assets/img/icons8.png";

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  height: calc(100vh - 125px);
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
const LeftPanel = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const RightPanel = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const DashboardBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Prize = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 24px;
  height: 48px;
  .ETH {
    border-radius: 5px;
    border: 2px solid #c60929;
    padding: 5px 10px;
  }
`;
const Current = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
`;
const RedText = styled.span`
  color: #c60929;
`;
const Column = styled.div`
  width: 100%;
  color: #fff;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #fff;
  border-radius: 5px;
`;
const Input = styled.input`
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

const Button = styled.button`
  width: 20%;
  padding: 8px 16px;
  height: 40px;
  background-color: rgb(198, 9, 41);
  color: #fff;
  border: none;
  border-radius: 0px 5px 5px 0px;
  cursor: pointer;
`;

const ListContainer = styled.div`
  height: 300px;
  background-color: #16191b;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
`;
const ListBox = styled.div`
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
const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #333;
  &:last-child {
    border-bottom: none;
  }
`;
const FlexList = styled(ListItem)`
  justify-content: space-evenly;
`;
const Rank = styled.span`
  width: 20px;
  text-align: center;
  margin-right: 5px;
  color: #fff;
  font-weight: bold;
`;
const Address = styled.span`
  color: #fff;
  font-size: 14px;
`;
const Arrow = styled.img`
  font-size: 20px;
  margin-right: 10px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Flex = styled(Column)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const BonusAmount = styled.span`
  color: #fff;
`;
const Amount = styled.div`
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
const Box = styled.div`
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
const WEBINFO = styled.div`
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
// Main component
const Dashboard = () => {
  // 搜索框的值
  const [searchInput, setSearchInput] = useState("");
  // 累计奖金分配金额
  const [accumulatedBonus, setAccumulatedBonus] = useState(12415);
  const [totalSupply, setTotalSupply] = useState(10000);
  const [burned, setBurned] = useState(157);
  // 排名
  const [ranking, setRanking] = useState(1);

  // 轮次奖池
  const [roundPrize, setRoundPrize] = useState([
    {
      rank: 1,
      address: "0x000000000000000000000000000000000000dEaD",
      Eth: "1",
    },
  ]);
  // 当前奖池
  const [currentPrize, setCurrentPrize] = useState([
    {
      rank: 1,
      address: "0x000000000000000000000000000000000000dEaD",
      Eth: "1",
    },
  ]);

  return (
    <>
      <Container>
        {/* Left Panel */}
        <LeftPanel>
          <DashboardBox>
            <Amount>
              <span>Accumulated bonus distribution amount </span>
            </Amount>
            <Column>
              <Box>{accumulatedBonus}</Box>
            </Column>
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
                  {roundPrize.map((item, index) => (
                    <FlexList key={index}>
                      <Address>{item.address}</Address>
                      <Arrow src={ArrowImg} alt="arrow" />
                      <BonusAmount>{item.Eth} ETH</BonusAmount>
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
                  Round.1
                  <RedText> Pool</RedText>
                </span>
                <span
                  className="
                ETH
              "
                >
                  {burned} / {totalSupply} ETH
                </span>
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
                <Button>Check</Button>
              </InputBox>
            </Column>
            <Column>
              <Current>
                <span>Current address ranking</span>
                <RedText>NO.{ranking}</RedText>
              </Current>
            </Column>
            <Column>
              <ListContainer>
                <div>
                  <span> </span>
                  <span></span>
                </div>
                <ListBox>
                  {currentPrize.map((item, index) => (
                    <ListItem key={index}>
                      {index <= 4 ? (
                        <Rank>
                          <RedText>{item.rank}</RedText>
                        </Rank>
                      ) : (
                        <Rank>{item.rank}</Rank>
                      )}

                      <Arrow src={ArrowImg} alt="arrow" />
                      <Address>{item.address}</Address>
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
              <a href="" target="_blank">
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
