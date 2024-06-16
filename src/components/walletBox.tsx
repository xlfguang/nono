import { UserContext } from "@/components/userContext";
import { Dropdown, Modal, Tooltip } from "@douyinfe/semi-ui";
import { useContext, useState } from "react";
import matemaskIcon from "@/assets/img/MetaMask_Fox.svg.png";
import styled from "styled-components";

const WalletBtn = styled.div`
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  border: 2px solid #fff;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
`;
const Wallets = styled.div`
  display: flex;
  flex-direction: column;
  .wallet {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    .walletInfo {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .walletInstall {
      color: #007bff;
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
    }
  }
`;
const AddressBox = styled.div`
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  border: 2px solid #fff;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin: 0 auto;
  &:hover {
    background: #fff;
    color: #000;
  }
`;
const WalletBox = () => {
  const { address, setAddress } = useContext(UserContext);
  const walletConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        localStorage.setItem("address", accounts[0]);
      } catch (error) {
        console.error("User rejected the request.");
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  };

  return (
    <>
      <>
        {address ? (
          <Dropdown
            render={
              <Dropdown.Menu>
                <Dropdown.Item>
                  <div
                    onClick={() => {
                      setAddress("");
                      localStorage.removeItem("address");
                    }}
                  >
                    Disconnect
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <AddressBox>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
            </AddressBox>
          </Dropdown>
        ) : (
          <WalletBtn
            onClick={() => {
              walletConnect();
            }}
          >
            Connect Wallet
          </WalletBtn>
        )}
      </>
    </>
  );
};
export default WalletBox;
