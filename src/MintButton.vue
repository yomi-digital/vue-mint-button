<template>
  <div class="mint-wrapper">
    <div class="fadeIn" v-if="account">
      <div>
        <p>You are minting with:</p>
        <h3>
          {{ account }}
        </h3>
      </div>

      <input class="mint-amount" type="number" v-model="amount" />
      <p class="small">
        NFT<span v-if="amount > 1">s</span> paying {{ total }} ETH<br />
      </p>
      <div class="btn mint-btn m-top-1" v-if="!isMinting" @click="mint()">
        Mint Now
      </div>
      <p class="m-top-1" v-if="isMinting && !pending">
        Please confirm the transaction in Metamask
      </p>
      <p class="m-top-1" v-if="isMinting && pending">
        Your transaction was submitted, waiting for confirmation at:
        <a
          v-if="explorerUrl !== undefined"
          :href="explorerUrl + pending"
          target="_blank"
          >{{ pending }}</a
        >
        <span v-if="explorerUrl === undefined">{{ pending }}</span>
      </p>
    </div>
    <div v-if="!account">
      <div class="btn mint-btn" @click="connect()">Connect Wallet</div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import Web3Modal, { isMobile } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default {
  props: [
    "ABI",
    "network",
    "price",
    "method",
    "contract",
    "infuraId",
    "explorerUrl",
  ],
  name: "MintButton",
  data() {
    return {
      account: "",
      balance: 0,
      total: 0,
      amount: 1,
      isMinting: false,
      web3: "",
      pending: "",
      networks: {
        ethereum: 1,
        rinkeby: 4,
        polygon: 137,
        mumbai: 80001,
        ganache: 5777,
      },
    };
  },
  watch: {
    amount() {
      const app = this;
      if (app.amount > 5) {
        app.amount = 5;
      }
      if (app.amount <= 0) {
        app.amount = 1;
      }
      app.total = (app.price * app.amount).toFixed(3);
    },
  },
  methods: {
    async connect() {
      const app = this;
      let providerOptions = {};
      if (app.infuraId !== undefined) {
        providerOptions = {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: app.infuraId,
            },
          },
        };
      }
      // Instantiating Web3Modal
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: providerOptions,
      });
      const provider = await web3Modal.connect();
      app.web3 = await new Web3(provider);
      // Checking if networkId matches
      const netId = await app.web3.eth.net.getId();
      if (parseInt(netId) !== app.networks[app.network]) {
        alert("Switch to " + app.network + " network!");
      } else {
        const accounts = await app.web3.eth.getAccounts();
        if (accounts.length > 0) {
          app.balance = await app.web3.eth.getBalance(accounts[0]);
          app.account = accounts[0];
          app.balance = parseFloat(
            app.web3.utils.fromWei(app.balance, "ether")
          ).toFixed(10);
        }
      }
    },
    async mint() {
      const app = this;
      if (!app.isMinting) {
        app.isMinting = true;
        try {
          const wei = app.web3.utils.toWei(app.total.toString(), "ether");
          const estimated = await nftContract.methods[app.method](
            app.amount
          ).estimateGas({
            from: app.account,
            value: wei.toString(),
          });
          const gasLimit = estimated * 1.2;
          const nftContract = new app.web3.eth.Contract(app.ABI, app.contract);
          await nftContract.methods[app.method](app.amount)
            .send({
              from: app.account,
              value: wei.toString(),
              gas: gasLimit,
            })
            .on("transactionHash", (pending) => {
              app.pending = pending;
            });
        } catch (e) {
          alert(e.message);
          app.isMinting = false;
        }
      }
    },
  },
  mounted() {
    this.total = this.price;
  },
};
</script>

<style>
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #050505;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid #050505;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn:hover {
  background-color: #050505;
  color: #ffffff;
}

.fadeIn {
  -webkit-animation: fadeIn 2.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fadeIn 2.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

input {
  font-size: 1.5rem;
  border-radius: 5px;
  margin: 5px 0;
}

input:focus {
  outline: rgba(0, 0, 0, 0.5) solid 2px;
  -moz-box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.8);
}

.m-top-1 {
  margin-top: 1em;
}

.mint-wrapper {
  padding: 30px;
  text-align: center;
}

p {
  margin: 0;
}

p.small {
  font-size: 0.9rem;
  font-style: italic;
  color: #7d7d7d;
}
</style>
