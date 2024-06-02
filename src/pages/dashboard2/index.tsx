import React, { useEffect } from "react";
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
} from "./style";
import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');

function DashboardTow() {
  const [players, setPlayers] = React.useState([
    {
      header:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
      name: "SneakerCLD",
      pts: 20,
      color: "red",
    },
    {
      header:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
      name: "f97102",
      pts: 10,
      color: "blue",
    },
    {
      header:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
      name: "SneakerCLD",
      pts: 25,
      color: "green",
    },
    {
      header:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
      name: "SneakerCLD",
      pts: 88,
      color: "yellow",
    },
    {
      header:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
      name: "SneakerCLD",
      pts: 20,
      color: "purple",
    },
    {
      header:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
      name: "SneakerCLD",
      pts: 15.4,
      color: "orange",
    },
    {
      header:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
      name: "SneakerCLD",
      pts: 21.5,
      color: "pink",
    },
  ]);
  const [coins, setCoins] = React.useState([
    {
      name: "ETH",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
    },
  ]);
  const [totalPts, setTotalPts] = React.useState(0);
  const [coinPrice, setCoinPrice] = React.useState(100);
  useEffect(() => {
    let total = 0;
    players.forEach((player) => {
      total += player.pts;
    });
    setTotalPts(total);
  }, [players]);
  return (
    <DashboardTowBox>
      <DashboardTowLeft>
        <Card
          style={{
            height: "100%",
          }}
        >
          <DashboardTowLeftTop>
            <DashboardTowTitle>7 Players</DashboardTowTitle>
            <Watching>132 Watching</Watching>
          </DashboardTowLeftTop>
          <DashboardTowLabelBox>
            {players.map((player, index) => {
              return (
                <DashboardTowLabelItem key={index} color={player.color}>
                  <DashboardTowLabelItemHeader src={player.header} />
                  <DashboardTowLabelItemContent>
                    <DashboardTowLabelItemData>
                      <DashboardTowLabelItemName>
                        {player.name}
                      </DashboardTowLabelItemName>
                      <DashboardTowLabelItemDataPercent>
                        {((player.pts / totalPts) * 100).toFixed(2)}%
                      </DashboardTowLabelItemDataPercent>
                    </DashboardTowLabelItemData>
                    <DashboardTowLabelItemData>
                      <DashboardTowLabelItemPts>
                        {player.pts} Pts
                      </DashboardTowLabelItemPts>
                      <DashboardTowLabelItemDataCoin>
                        {(player.pts * coinPrice).toFixed(2)} Nono
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
                      show: false,
                      position: "center",
                    },

                    labelLine: {
                      show: false,
                    },
                    data:
                      players.map((player) => {
                        return {
                          value: player.pts,
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
          </DashboardEchart>
        </Card>
        <Card
          style={{
            height: "200px",
          }}
        >
          <DashboardTowTitle>Round Content</DashboardTowTitle>
          <CoinBox>
            {coins.map((coin, index) => {
              return (
                <CoinCard key={index}>
                  <img src={coin.icon} alt="" />
                </CoinCard>
              );
            }) || []}
          </CoinBox>
        </Card>
      </DashboardTowContent>
      <DashboardTowRight>
        <Card
          style={{
            height: "200px",
          }}
        >
          <DashboardTowTitle>Round 61567</DashboardTowTitle>
          <DashboardInfo>
            <DashboardInfoItem>
              <DashboardInfoItemData>
                <DashboardInfoItemTop>1.06</DashboardInfoItemTop>
                <DashboardInfoItemText>Prize Pool</DashboardInfoItemText>
              </DashboardInfoItemData>
              <DashboardInfoItemData>
                <DashboardInfoItemTop>7/500</DashboardInfoItemTop>
                <DashboardInfoItemText>Players</DashboardInfoItemText>
              </DashboardInfoItemData>
            </DashboardInfoItem>
            <DashboardInfoItem>
              <DashboardInfoItemData>
                <DashboardInfoItemTop>1.06</DashboardInfoItemTop>
                <DashboardInfoItemText>Your Entries</DashboardInfoItemText>
              </DashboardInfoItemData>
              <DashboardInfoItemData>
                <DashboardInfoItemTop>1.06</DashboardInfoItemTop>
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
  );
}

export default DashboardTow;
