import { useState } from "react";
import styled from "styled-components";
import ArrowImg from "@/assets/img/icons8.png";
// Styled components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: calc(100vh - 125px);
`;

const RightPanel = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DashboardBox = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Prize = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 24px;
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
  margin-bottom: 20px;
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
// Main component
const Dashboard = () => {
  const [searchInput, setSearchInput] = useState("");

  // Sample data
  const rankList = [
    { rank: 1, address: "0x1234567890abcdef67890abcdef" },
    { rank: 2, address: "0x0987654321fedcba67890abcdef" },
    { rank: 3, address: "0xfedcba098765432167890abcdef" },
    { rank: 4, address: "0xfedcba098765432167890abcdef" },
    { rank: 5, address: "0xfedcba098765432167890abcdef" },
    { rank: 6, address: "0xfedcba098765432167890abcdef" },
    { rank: 7, address: "0xfedcba098765432167890abcdef" },
    { rank: 8, address: "0xfedcba098765432167890abcdef" },
    { rank: 9, address: "0xfedcba098765432167890abcdef" },
    { rank: 10, address: "0xfedcba098765432167890abcdef" },
    { rank: 11, address: "0xfedcba098765432167890abcdef" },
    { rank: 12, address: "0xfedcba098765432167890abcdef" },
    { rank: 13, address: "0xfedcba098765432167890abcdef" },
    { rank: 14, address: "0xfedcba098765432167890abcdef" },
    { rank: 15, address: "0xfedcba098765432167890abcdef" },

    // Add more data as needed
  ];

  return (
    <Container>
      {/* Left Panel */}
      <div></div>

      {/* Right Panel */}
      <RightPanel>
        <DashboardBox>
          <Column>
            <Prize>
              <span>
                Prize
                <RedText> Pool</RedText>
              </span>
              <span>4561 / 10000U</span>
            </Prize>
          </Column>
          <Column>
            <InputBox>
              <Input
                type="text"
                placeholder="Enter wallet address to sort"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button>Inquire</Button>
            </InputBox>
          </Column>
          <Column>
            <Current>
              <span>Current address ranking</span>
              <RedText>NO.233</RedText>
            </Current>
          </Column>
          <Column>
            <ListContainer>
              <div>
                <span>TOP 5 </span>
                <span>Shows your wallet's current ranking</span>
              </div>
              <ListBox>
                {rankList.map((item, index) => (
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
  );
};

export default Dashboard;
