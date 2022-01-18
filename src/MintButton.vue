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
import "@/mint-btn-style.css";

export default {
  props: ["ABI", "price", "contract", "infuraId", "explorerUrl"],
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
      if (netId !== 1) {
        alert("Switch to Ethereum Network!");
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
          const gasLimit = 100000 + app.amount * 125000;
          const nftContract = new app.web3.eth.Contract(app.ABI, app.contract, {
            gasLimit: gasLimit.toString(),
          });
          await nftContract.methods
            .safeMint(app.amount, false)
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
