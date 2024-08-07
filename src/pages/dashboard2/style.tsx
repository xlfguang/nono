import styled from "styled-components";
import winningAddress from "@/assets/img/no-no.webp";

export const Card = styled.div`
  padding: 20px 10px;
  background-color: #16191b;
  border-radius: 10px;
  color: #fff;
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid red;
  }
  /* scrollbar 样式 */

  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
  &::-webkit-scrollbar {
    width: 10px;
  }
`;
export const DashboardTowBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  height: 1024px;
`;
export const DashboardTowTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;
export const DashboardTowSubTitle = styled.h2``;
export const DashboardTowLeft = styled.div`
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const DashboardTowLeftTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const DashboardTowLabelBox = styled.div``;
export const DashboardTowLabelItem = styled.div<{
  color: string;
}>`
  display: flex;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  background-color: rgb(0, 0, 0);
  cursor: pointer;
  transition: all 0.3s ease;
  justify-content: space-between;
  position: relative;
  padding-right: 20px;
  /* 伪类 */
  &::before {
    content: "";
    position: absolute;
    right: 0%;
    top: 0%;
    width: 10px;
    height: 100%;
    background-color: ${(props) => props.color};
    border-radius: 0 10px 10px 0;
    z-index: 1;
  }
`;
export const DashboardTowLabelItemChampionr = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  right: -12px;
  top: -12px;
  z-index: 2;
`;
export const DashboardTowLabelItemContent = styled.div`
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: space-between;
`;
export const DashboardTowLabelItemData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const DashboardTowLabelItemName = styled.span`
  color: #a7a7a7;
`;
export const DashboardTowLabelItemPts = styled.span``;
export const DashboardTowLabelItemDataPercent = styled.div`
  font-weight: 600;
`;
export const DashboardTowLabelItemDataCoin = styled.div`
  color: red;
`;

export const DashboardTowRight = styled.div`
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const DashboardTowContent = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Watching = styled.div``;

export const DashboardEchart = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* 旋转 */
`;
export const CoinScroll = styled.div`
  overflow: auto;
  width: 100%;
  /* 样式 */
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;
export const CoinBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-top: 20px;
  min-width: 800px;
`;

export const CoinCard = styled.div<{
  active: boolean;
}>`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  border: ${(props) => (props.active ? "2px solid red" : "none")};
`;
export const Countdown = styled.div`
  border: 2px solid red;
`;
export const DashboardInfo = styled.div``;
export const DashboardInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
export const DashboardInfoItemData = styled.div`
  width: 50%;
`;
export const DashboardInfoItemTop = styled.div`
  color: #aaaaaa;
  font-size: 18px;
`;
export const DashboardInfoItemText = styled.div`
  color: #d3d3d3;
  font-size: 12px;
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #333;
  margin: 10px 0;
`;
export const DashboardEchartText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .eth-img {
    width: 100px;
    height: 100px;
  }
  span {
    color: #fff;
    font-size: 36px;
    font-weight: 600;
  }
`;
export const WinningAddressBox = styled.div`
  width: 100px;
  height: 100px;
  background: url(${winningAddress}) no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  .winningAddress-img {
    width: 60px;
    height: 60px;
  }
`;
export const Down = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 100px;
  z-index: 99;
`;
