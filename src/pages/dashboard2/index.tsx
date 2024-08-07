import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DashboardTowBox,
  DashboardTowLeft,
  Card,
  DashboardTowTitle,
  DashboardTowContent,
  DashboardTowRight,
  DashboardTowLeftTop,
  DashboardTowLabelBox,
  DashboardTowLabelItem,
  DashboardTowLabelItemContent,
  DashboardTowLabelItemData,
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
  WinningAddressBox,
  CoinScroll,
  DashboardTowLabelItemChampionr,
  Down,
} from "./style";
import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import { getRoundAllData, getLatestRoundNumber } from "@/hooks/nonotow";
import { Spin, Tooltip } from "@douyinfe/semi-ui";
import { UserContext } from "@/components/userContext";
import championImg from "@/assets/img/gold-medal.png";
import downImg from "@/assets/img/down.png";
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
  const { address } = useContext(UserContext) as { address: string };
  const chartRef = useRef(null); // 用于保存图表实例
  const chartDomRef = useRef(null);
  const previousPlayersRef = useRef([]);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  // 倒计时时间
  const downTimeRef = useRef(3);
  const [players, setPlayers] = useState([]);
  // 当前轮次编号
  const roundNumberRef = useRef(0);
  const [roundNumber, setRoundNumber] = useState(
    roundNumberRef.current as number
  );
  const roundListRef = useRef<number[]>([]);
  // 总轮次列表
  const [roundList, setRoundList] = useState<number[]>(roundListRef.current);
  const [narkTaxEthAnout, setNarkTaxEthAnout] = useState(0);
  // 当前地址的排名
  const [rank, setRank] = useState(0);
  const [yourEntries, setYourEntries] = useState<number | string>(0);
  const [yourWinChance, setYourWinChance] = useState<number | string>(0);

  const [spinning, setSpinning] = useState(false);
  const [roundData, setRoundData] = useState({} as any);
  const [startAngle, setStartAngle] = useState(90); // 默认90，起始角度，支持范围[0, 360
  const [isWinning, setIsWinning] = useState(false);
  const getRound = async () => {
    const newroundNumber = await getLatestRoundNumber();
    return newroundNumber;
  };
  const getData = async (roundNumber: number) => {
    const res = await getRoundAllData(roundNumber);
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
    const index = addresses.indexOf(address);
    return {
      roundData,
      taxes,
      eths,
      newplayers,
      narkTaxEthAnout: Number(roundData.buyTaxFeeAmount),
      yourEntries: index === -1 ? 0 : Number(taxes[index]).toFixed(2),
      yourWinChance:
        index === -1
          ? "0 %"
          : `${(
              (taxes[index] / Number(roundData.buyTaxFeeAmount)) *
              100
            ).toFixed(2)} %`,
      rank: index + 1,
    };
  };
  const handleChartReady = (chart) => {
    chartRef.current = chart; // 保存图表实例
  };

  // 数据初始化
  const initData = async () => {
    try {
      setSpinning(true);
      const newRoundNumber = await getRound();
      roundNumberRef.current = newRoundNumber;
      setRoundNumber(roundNumberRef.current);
      roundListRef.current = Array.from({ length: newRoundNumber }).map(
        (_, i) => i + 1
      );
      setRoundList(roundListRef.current);
      const res = await getData(newRoundNumber);
      setRoundData(res.roundData);
      setPlayers(res.newplayers);
      previousPlayersRef.current = res.newplayers; // 保存当前玩家列表
      setNarkTaxEthAnout(res.narkTaxEthAnout);
      setYourEntries(res.yourEntries);
      setYourWinChance(res.yourWinChance);
      setRank(res.rank);
      setSpinning(false);
    } catch (e) {
      console.log(e);
      initData();
      setSpinning(false);
    }
  };
  // 中奖动画 series的第一个扇形图旋转三秒 也就是修改 startAngle
  const handleWinningAnimation = () => {
    // 修改 chartDomRef.current的类名
    if (chartDomRef.current) {
      setIsWinning(true);
      const dom = chartDomRef.current.getEchartsInstance()._dom;
      dom.style.transition = "transform 6s";
      dom.style.transform = "rotate(3600deg)";
      setTimeout(() => {
        setIsWinning(false);
        dom.style.transition = "transform 0s";
        dom.style.transform = "rotate(0deg)";
      }, 6000);
    }
  };
  // 监听数据变化
  const handleDataChange = async () => {
    downTimeRef.current = 3;
    console.log("数据变化");
    const newRoundNumber = await getRound();
    if (spinning) {
      return;
    }
    // 如果当前处于最新一轮
    if (roundListRef.current.length === roundNumberRef.current) {
      console.log("当前处于最新一轮");

      try {
        const res = await getData(roundNumberRef.current);
        if (spinning) {
          return;
        }
        // 如果有胜利者
        if (res.roundData.winningAddress) {
          clearTimer();
          handleWinningAnimation();
          setTimeout(() => {
            setPlayers([...res.newplayers]);
            previousPlayersRef.current = res.newplayers;
            setRoundData(res.roundData);
            setNarkTaxEthAnout(res.narkTaxEthAnout);
            setYourEntries(res.yourEntries);
            setYourWinChance(res.yourWinChance);
            setRank(res.rank);
          }, 6000);
          setTimeout(() => {
            initData();
            resetTimer();
          }, 9000);
        } else {
          // 检查是否有新的玩家加入
          // 检查name 和 taxe 是否相同
          const newPlayers = res.newplayers.filter((newPlayer) => {
            return !previousPlayersRef.current.some(
              (player) =>
                player.name === newPlayer.name && player.taxe === newPlayer.taxe
            );
          });

          if (newPlayers.length > 0) {
            setPlayers([...res.newplayers]);
          }
          previousPlayersRef.current = res.newplayers; // 更新前一次的玩家列表

          setRoundData(res.roundData);
          setNarkTaxEthAnout(res.narkTaxEthAnout);
          setYourEntries(res.yourEntries);
          setYourWinChance(res.yourWinChance);
          setRank(res.rank);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      roundListRef.current = Array.from({ length: newRoundNumber }).map(
        (_, i) => i + 1
      );
      setRoundList(roundListRef.current);
    }
  };

  const handleLabelClick = (index) => {
    if (chartRef.current) {
      const seriesIndex = 0; // 第一个系列，假设是饼图的系列索引
      // 取消所有数据项的高亮
      chartRef.current.dispatchAction({
        type: "downplay",
        seriesIndex,
      });

      // 高亮点击的数据项
      chartRef.current.dispatchAction({
        type: "highlight",
        seriesIndex,
        dataIndex: index,
      });
    }
  };
  // 关闭定时器
  const clearTimer = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current as NodeJS.Timeout);
      timeRef.current = null;
      downTimeRef.current = 3;
    }
  };
  // 重置定时器
  const resetTimer = () => {
    clearTimer();
    timeRef.current = setInterval(async () => {
      console.log("downTimeRef.current", downTimeRef.current);
      if (downTimeRef.current === 0) {
        await handleDataChange();
      } else {
        downTimeRef.current--;
      }
    }, 1000);
  };

  useEffect(() => {
    initData();
    resetTimer();
    return () => {
      clearTimer();
    };
  }, [address]);

  useEffect(() => {
    if (roundData.winningAddress) {
      // 找到中奖者
      const index = players.findIndex(
        (player) => player.name === roundData.winningAddress
      );
      //  计算中奖者前面的玩家的角度
      const angle = players
        .slice(0, index)
        .reduce(
          (sum, player) => sum + (Number(player.taxe) / narkTaxEthAnout) * 360,
          0
        );
      const maxPlayer = players[index];
      const maxPlayerAngle =
        (Number(maxPlayer.taxe) /
          players.reduce((sum, player) => sum + Number(player.taxe), 0)) *
        360;

      const startAngle = 90 + angle + maxPlayerAngle / 2;
      setStartAngle(startAngle);
    }
  }, [players]);

  return (
    <Spin size="large" spinning={spinning}>
      <DashboardTowBox>
        <DashboardTowLeft>
          <Card
            style={{
              height: "100%",
              overflow: "auto",
            }}
          >
            <DashboardTowLeftTop>
              <DashboardTowTitle>{players.length} Players</DashboardTowTitle>
              {/* <Watching>132 Watching</Watching> */}
            </DashboardTowLeftTop>
            <DashboardTowLabelBox>
              {players.map((player, index) => {
                return (
                  <DashboardTowLabelItem
                    onClick={() => handleLabelClick(index)}
                    key={index}
                    color={player.color}
                  >
                    {roundData.winningAddress === player.name && (
                      <DashboardTowLabelItemChampionr src={championImg} />
                    )}
                    <DashboardTowLabelItemContent>
                      <DashboardTowLabelItemData>
                        <Tooltip content={player.name} position="right">
                          <DashboardTowLabelItemName>
                            {formatAddress(player.name)}
                          </DashboardTowLabelItemName>
                        </Tooltip>
                        <DashboardTowLabelItemDataPercent>
                          {((player.taxe / narkTaxEthAnout) * 100).toFixed(2)}%
                        </DashboardTowLabelItemDataPercent>
                      </DashboardTowLabelItemData>
                      <DashboardTowLabelItemData>
                        <Tooltip content={` ${player.taxe}`} position="right">
                          <DashboardTowLabelItemPts>
                            {(player.taxe * 1).toFixed(2)} NONO
                          </DashboardTowLabelItemPts>
                        </Tooltip>

                        <Tooltip content={player.ethNum} position="right">
                          <DashboardTowLabelItemDataCoin>
                            {player.ethNum} ETH
                          </DashboardTowLabelItemDataCoin>
                        </Tooltip>
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
            {isWinning || roundData.winningAddress !== "" ? (
              <Down src={downImg} />
            ) : null}
            <DashboardEchart>
              <ReactECharts
                ref={chartDomRef}
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
                      startAngle: startAngle, //默认90，起始角度，支持范围[0, 360]
                      label: {
                        show: false,
                        formatter: "{d}%",
                        // 高亮的时候才显示标签
                        emphasis: {
                          show: true,
                        },
                      },
                      tooltip: {
                        trigger: "item", // 设置提示框的触发方式为数据项触发
                        formatter: "{b}<br/> {c}<br/> ({d}%)", // 提示框内容，显示名称、数值和百分比
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
                    {
                      name: "Circle", // 新增的圆环系列名称
                      type: "pie", // 类型仍为饼图
                      radius: ["98%", "100%"], // 设置内外半径，形成圆环
                      hoverAnimation: false, // 禁用鼠标悬停时的放大效果
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                      data: [
                        {
                          value: 1,
                          itemStyle: {
                            color: "#fff", // 圆环的颜色为白色
                          },
                          emphasis: {
                            itemStyle: {
                              color: "#fff", // 圆环在高亮时仍然为白色
                            },
                          },
                        },
                      ],
                    },
                  ],
                }}
                onChartReady={handleChartReady} // 设置图表准备完成的回调
              />
              <DashboardEchartText>
                {roundData.winningAddress === "" ? (
                  <>
                    <img
                      className="eth-img"
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg"
                      alt=""
                    />
                    <Tooltip
                      content={
                        Number(roundData.buyTaxEthAmount) +
                        Number(roundData.sellTaxEthAmount)
                      }
                    >
                      <span>
                        {parseFloat(
                          (
                            Number(roundData.buyTaxEthAmount) +
                            Number(roundData.sellTaxEthAmount)
                          ).toFixed(4)
                        )}{" "}
                        ETH
                      </span>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <WinningAddressBox>{}</WinningAddressBox>
                    <Tooltip content={roundData.winningAddress}>
                      <span>
                        {roundData.winningAddress
                          ? formatAddress(roundData.winningAddress)
                          : "-"}
                      </span>
                    </Tooltip>
                    <Tooltip
                      content={parseFloat(
                        (
                          Number(roundData.buyTaxEthAmount) +
                          Number(roundData.sellTaxEthAmount)
                        ).toFixed(4)
                      )}
                    >
                      <span
                        style={{
                          color: "red",
                          fontSize: "16px",
                        }}
                      >
                        {parseFloat(
                          (
                            Number(roundData.buyTaxEthAmount) +
                            Number(roundData.sellTaxEthAmount)
                          ).toFixed(4)
                        )}{" "}
                        ETH
                      </span>
                    </Tooltip>
                  </>
                )}
              </DashboardEchartText>
            </DashboardEchart>
          </Card>
          <Card
            style={{
              height: "200px",
            }}
          >
            <DashboardTowTitle>Round Content</DashboardTowTitle>
            <CoinScroll>
              <CoinBox>
                {roundList.map((item) => {
                  return (
                    <CoinCard
                      key={item}
                      active={item === roundNumber}
                      onClick={async () => {
                        clearTimer();
                        try {
                          setSpinning(true);
                          roundNumberRef.current = item;
                          setRoundNumber(roundNumberRef.current as number);
                          const res = await getData(item);

                          setPlayers(res.newplayers);
                          setRoundData(res.roundData);
                          setNarkTaxEthAnout(res.narkTaxEthAnout);
                          setYourEntries(res.yourEntries);
                          setYourWinChance(res.yourWinChance);
                          setRank(res.rank);
                          setSpinning(false);
                          resetTimer();
                        } catch (e) {
                          console.log(e);
                          setSpinning(false);
                          resetTimer();
                        }
                      }}
                    >
                      Round {item}
                    </CoinCard>
                  );
                })}
              </CoinBox>
            </CoinScroll>
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
                  <DashboardInfoItemTop>
                    {roundData.winningAddress
                      ? formatAddress(roundData.winningAddress)
                      : "-"}
                  </DashboardInfoItemTop>
                  <DashboardInfoItemText>Winning Address</DashboardInfoItemText>
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
