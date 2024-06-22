import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DashboardTowBox,
  DashboardTowLeft,
  Card,
  DashboardTowTitle,
  Watching,
  DashboardTowContent,
  DashboardTowRight,
  DashboardTowLeftTop,
  DashboardTowLabelBox,
  DashboardTowLabelItem,
  DashboardTowLabelItemContent,
  DashboardTowLabelItemData,
  DashboardTowLabelItemHeader,
  DashboardTowLabelItemName,
  DashboardTowLabelItemPts,
  DashboardTowLabelItemDataCoin,
  DashboardTowLabelItemDataPercent,
  DashboardEchart,
  CoinBox,
  CoinCard,
  DashboardInfo,
  Line,
  DashboardInfoItem,
  DashboardInfoItemData,
  DashboardInfoItemText,
  DashboardInfoItemTop,
  DashboardEchartText,
} from "./style";
import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import { getRoundAllData, getLatestRoundNumber } from "@/hooks/nonotow";
import { Spin, Tooltip } from "@douyinfe/semi-ui";
import { UserContext } from "@/components/userContext";
// 截取地址的前6位和后4位
const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const color = "rgba(" + r + "," + g + "," + b + ")";
  return color;
};
function DashboardTow() {
  const [players, setPlayers] = useState([]);

  const { address } = useContext(UserContext) as { address: string };
  // const address = "0x2C41a4a26C4D58a0A9e033bD96D879B25884Ce13";
  // 当前轮次编号
  const [roundNumber, setRoundNumber] = useState(0);
  const roundListRef = useRef<number[]>([]);
  // 总轮次列表
  const [roundList, setRoundList] = useState<number[]>(roundListRef.current);
  const [narkTaxEthAnout, setNarkTaxEthAnout] = useState(0);
  // 当前地址的排名
  const [rank, setRank] = useState(0);
  const [yourEntries, setYourEntries] = useState<number | string>(0);
  const [yourWinChance, setYourWinChance] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const getRound = async () => {
    const newroundNumber = await getLatestRoundNumber();
    console.log(newroundNumber);
    console.log("roundList.length", roundList.length);
    console.log("roundListRef.current", roundListRef.current.length);

    if (newroundNumber == roundListRef.current.length) {
      console.log("没有更多轮次更新");
      return;
    } else {
      console.log("有更多轮次更新");

      setRoundNumber(newroundNumber);
      roundListRef.current = Array.from({ length: newroundNumber }).map(
        (_, i) => i + 1
      );
      setRoundList(roundListRef.current);
    }
  };
  const getData = async (roundNumber: number) => {
    setSpinning(true);
    getRoundAllData(roundNumber)
      .then((res) => {
        const { addresses, roundData, taxes, eths } = res;
        const newplayers = addresses.map((address: string, index) => {
          return {
            header:
              "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
            name: address,
            taxe: taxes[index],
            ethNum: eths[index],
            color: getRandomColor(),
          };
        });
        // 如果是最后一轮 并且 newplayers
        if (
          (roundNumber === roundList.length &&
            newplayers.length !== players.length) ||
          roundNumber !== roundList.length
        ) {
          setPlayers(newplayers);
          setNarkTaxEthAnout(Number(roundData.buyTaxFeeAmount));
          const index = addresses.indexOf(address);
          setYourEntries(Number(taxes[index]).toFixed(2) || 0);
          setRank(index + 1);
          console.log("数据更新");
        } else {
          console.log("数据没有更新");
        }
        setSpinning(false);
      })
      .catch((e) => {
        console.log(e);

        console.log("数据获取失败");
        setSpinning(false);
      });
  };

  useEffect(() => {
    getRound();
    const time = setInterval(() => {
      getRound();
    }, 10000);
    return () => {
      clearInterval(time);
    };
  }, []);

  useEffect(() => {
    if (!roundNumber) return;
    getData(roundNumber);
  }, [roundNumber, address, roundList.length]);

  return (
    <Spin size="large" spinning={spinning}>
      <DashboardTowBox>
        <DashboardTowLeft>
          <Card
            style={{
              height: "100%",
            }}
          >
            <DashboardTowLeftTop>
              <DashboardTowTitle>{players.length} Players</DashboardTowTitle>
              {/* <Watching>132 Watching</Watching> */}
            </DashboardTowLeftTop>
            <DashboardTowLabelBox>
              {players.map((player, index) => {
                return (
                  <DashboardTowLabelItem key={index} color={player.color}>
                    {/* <DashboardTowLabelItemHeader src={player.header} /> */}
                    <DashboardTowLabelItemContent>
                      <DashboardTowLabelItemData>
                        <Tooltip content={player.name}>
                          <DashboardTowLabelItemName>
                            {formatAddress(player.name)}
                          </DashboardTowLabelItemName>
                        </Tooltip>
                        <DashboardTowLabelItemDataPercent>
                          {((player.taxe / narkTaxEthAnout) * 100).toFixed(2)}%
                        </DashboardTowLabelItemDataPercent>
                      </DashboardTowLabelItemData>
                      <DashboardTowLabelItemData>
                        <DashboardTowLabelItemPts>
                          {(player.taxe * 1).toFixed(2)} NONO
                        </DashboardTowLabelItemPts>
                        <DashboardTowLabelItemDataCoin>
                          {player.ethNum} ETH
                        </DashboardTowLabelItemDataCoin>
                      </DashboardTowLabelItemData>
                    </DashboardTowLabelItemContent>
                  </DashboardTowLabelItem>
                );
              })}
            </DashboardTowLabelBox>
          </Card>
        </DashboardTowLeft>
        <DashboardTowContent>
          <Card
            style={{
              height: "730px",
            }}
          >
            <DashboardTowTitle>Current Round</DashboardTowTitle>
            <DashboardEchart>
              <ReactECharts
                style={{
                  height: "600px",
                  width: "100%",
                }}
                option={{
                  series: [
                    {
                      name: "Access From",
                      type: "pie",
                      radius: ["50%", "90%"],
                      avoidLabelOverlap: false,
                      label: {
                        show: true,
                        formatter: "{d}%",
                      },
                      labelLine: {
                        show: true,
                        normal: {},
                      },
                      data:
                        players.map((player) => {
                          return {
                            value: player.taxe,
                            name: player.name,
                            itemStyle: {
                              color: player.color,
                            },
                          };
                        }) || [],
                    },
                  ],
                }}
              />
              <DashboardEchartText>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg"
                  alt=""
                />
                <span>
                  {players.reduce((prev, curr) => {
                    return prev + Number(curr.ethNum);
                  }, 0)}{" "}
                  ETH
                </span>
              </DashboardEchartText>
            </DashboardEchart>
          </Card>
          <Card
            style={{
              height: "200px",
            }}
          >
            <DashboardTowTitle>Round Content</DashboardTowTitle>
            <CoinBox>
              {roundList.map((item) => {
                return (
                  <CoinCard
                    key={item}
                    active={item === roundNumber}
                    onClick={() => {
                      setRoundNumber(item);
                    }}
                  >
                    Round {item}
                  </CoinCard>
                );
              })}
            </CoinBox>
          </Card>
        </DashboardTowContent>
        <DashboardTowRight>
          <Card
            style={{
              height: "200px",
            }}
          >
            <DashboardTowTitle>Round {roundNumber}</DashboardTowTitle>
            <DashboardInfo>
              <DashboardInfoItem>
                <DashboardInfoItemData>
                  <DashboardInfoItemTop>
                    {narkTaxEthAnout?.toFixed(2)}
                  </DashboardInfoItemTop>
                  <DashboardInfoItemText>Prize Pool</DashboardInfoItemText>
                </DashboardInfoItemData>
                <DashboardInfoItemData>
                  <DashboardInfoItemTop>
                    {rank}/{players.length}
                  </DashboardInfoItemTop>
                  <DashboardInfoItemText>Players</DashboardInfoItemText>
                </DashboardInfoItemData>
              </DashboardInfoItem>
              <DashboardInfoItem>
                <DashboardInfoItemData>
                  <DashboardInfoItemTop>{yourEntries}</DashboardInfoItemTop>
                  <DashboardInfoItemText>Your Entries</DashboardInfoItemText>
                </DashboardInfoItemData>
                <DashboardInfoItemData>
                  <DashboardInfoItemTop>{yourWinChance}</DashboardInfoItemTop>
                  <DashboardInfoItemText>Your Win Chance</DashboardInfoItemText>
                </DashboardInfoItemData>
              </DashboardInfoItem>
            </DashboardInfo>
            <Line />
            <DashboardInfo>
              <DashboardInfoItem>
                <DashboardInfoItemData>
                  <DashboardInfoItemTop>-</DashboardInfoItemTop>
                  <DashboardInfoItemText>
                    Your Future Entries
                  </DashboardInfoItemText>
                </DashboardInfoItemData>
                <DashboardInfoItemData>
                  <DashboardInfoItemTop>-</DashboardInfoItemTop>
                  <DashboardInfoItemText>Total (0 Avg)</DashboardInfoItemText>
                </DashboardInfoItemData>
              </DashboardInfoItem>
            </DashboardInfo>
          </Card>
          <Card
            style={{
              height: "calc(100% - 290px)",
            }}
          ></Card>
        </DashboardTowRight>
      </DashboardTowBox>
    </Spin>
  );
}

export default DashboardTow;
