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
import {
  getPrizePool2Info,
  getWinRecords,
  getCurentArena,
  getTopBuyerTimeThreshold,
} from "@/hooks/nono";

let sync: any;
let timer = setInterval(() => {
  if (sync) {
    sync();
    clearInterval(timer);
  }
}, 1000);

let sync2: any;
let timer2 = setInterval(() => {
  if (sync2) {
    sync2();
    clearInterval(timer2);
  }
}, 1000);

function Arena() {
  const [countdown, setCountdown] = useState("00:00");
  const [sumBonus, setSumBonus] = useState(ethers.BigNumber.from(0));
  const [duration, setDuration] = useState(0);
  const [currentTopBuyer, setCurrentTopBuyer] = useState<{
    address: string;
    amount: ethers.BigNumber;
    time: number;
  }>({
    address: ethers.constants.AddressZero,
    amount: ethers.BigNumber.from(0),
    time: 0,
  });
  const [prizePool, setPrizePool] = useState(ethers.BigNumber.from(0));
  const [winnerRecords, setWinnerRecords] = useState<
    { address: string; amount: ethers.BigNumber }[]
  >([]);

  sync = async () => {
    try {
      await Promise.all([
        getPrizePool2Info().then((_prizePoolInfos) => {
          setPrizePool(_prizePoolInfos.prizePool);
        }),
        getCurentArena().then((arena) => {
          setCurrentTopBuyer(arena);
        }),
        getWinRecords().then((_winnerRecords) => {
          let sum = ethers.BigNumber.from(0);
          for (const record of _winnerRecords.filter((r) => r.type == 2)) {
            sum = sum.add(record.amount);
          }
          setWinnerRecords(_winnerRecords.filter((r) => r.type == 2));
          setSumBonus(sum);
        }),
        getTopBuyerTimeThreshold().then((time) => {
          setDuration(time);
        }),
      ]);
    } catch (error) {
      console.log(error);
    }

    await new Promise((r) => setTimeout(r, 3000));
    sync();
  };

  sync2 = async () => {
    console.log("sync2", currentTopBuyer.time);
    const time = (currentTopBuyer.time + duration - Date.now() / 1000) | 0;
    if (time <= 0) {
      setCountdown("00:00");
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      setCountdown(
        `${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`
      );
    }
    await new Promise((r) => setTimeout(r, 500));
    sync2();
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
          <span style={{}}>{countdown}</span>
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
                {(
                  (ethers.utils
                    .formatEther(sumBonus)
                    .replace(/\.0$/, "") as unknown as number) * 1
                ).toFixed(2)}
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
                <p className="number">
                  {Number(bnFixed(prizePool, 18, 4, 2)).toFixed(2)}
                </p>
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
                {currentTopBuyer.address}
              </span>
              <span
                style={{
                  fontSize: "14px",
                }}
              >
                {ethers.utils
                  .formatEther(currentTopBuyer.amount)
                  .replace(/\.0$/, "")}
                &ensp;ETH
              </span>
            </Amount>
          </DashboardBox>
        </RightPanel>
      </Container>
    </>
  );
}

export default Arena;
