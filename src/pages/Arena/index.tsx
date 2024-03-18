import { ethers } from "ethers";
import React, { useState } from "react";
import ArrowImg from "@/assets/img/icons8.png";

import {
  Container,
  LeftPanel,
  DashboardBox,
  Amount,
  Circle,
  ColumnFlex,
  Box,
  Flex,
  Column,
  ListContainer,
  ListBox,
  FlexList,
  Address,
  Arrow,
  BonusAmount,
  RightPanel,
} from "../dashboard";

function Arena() {
  const [winnerRecords, setWinnerRecords] = useState<
    { address: string; amount: ethers.BigNumber }[]
  >([
    // {
    //   address: "0x000000000000000000000000000000000000dEaD",
    //   Eth: "1",
    // },
  ]);
  return (
    <>
      <Amount
        style={{
          marginTop: "100px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "4px solid #c60929",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              marginRight: "25px",
            }}
          >
            Countdown
          </span>
          <span style={{}}>29:10</span>
        </div>
      </Amount>
      <Container
        style={{
          marginTop: "50px",
          alignItems: "flex-start",
        }}
      >
        <LeftPanel>
          <DashboardBox>
            <Amount>Accumulated bonus distribution amount</Amount>
            <ColumnFlex
              style={{
                margin: "10px 0",
              }}
            >
              <Box>
                {132}
                &ensp;ETH
              </Box>
              <span></span>
            </ColumnFlex>
            <Flex
              style={{
                margin: "10px 0",
              }}
            >
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
        <RightPanel>
          <DashboardBox>
            <div>
              <Circle>
                <p className="number">132</p>
                <p>ETH</p>
                <p>prize pool</p>
              </Circle>
            </div>
            <Amount>
              <span>Champion</span>
              <span>Purchase</span>
            </Amount>
            <Amount>
              <span
                style={{
                  fontSize: "14px",
                }}
              >
                0xaeF51A9C7C328F1597cD7E3Fe94ED283ddFA51b2
              </span>
              <span
                style={{
                  fontSize: "14px",
                }}
              >
                1545845 ETH
              </span>
            </Amount>
          </DashboardBox>
        </RightPanel>
      </Container>
    </>
  );
}

export default Arena;
