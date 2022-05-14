<template>
  <div>
    <Loader :loading="pageLoading" />
    <div class="animate__animated fadeIn animate__delay-5s">
      <div class="home">
        <div class="gap"></div>
        <div class="container mt-5 mb-5">
          <img src="/assets/img/logo.svg" width="300px" alt="" />
        </div>
        <section class="main-section">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12 col-md-10 col-lg-6">
                <div
                  class="
                    d-flex
                    flex-column flex-md-row flex-lg-row
                    align-items-center
                    justify-content-center
                  "
                >
                  <h1>vue-mint-button</h1>
                  <a
                    href="https://github.com/yomi-digital/vue-mint-button"
                    target="_blank"
                  >
                    <img
                      class="github-btn ms-4"
                      src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
                      alt=""
                  /></a>
                </div>
                <p>
                  This component has been developed to facilitate the connection
                  to Metamask, the minting of <b class="bold green">NFTs</b> and
                  consequently the transaction.
                </p>
              </div>
            </div>
          </div>
        </section>
        <MintButton
          :ABI="abi"
          :price="price"
          :contract="contract"
          :explorerUrl="explorerUrl"
          :network="network"
          :method="method"
          :parameters="parameters"
        />
      </div>
      <section>
        <div class="container mt-5 mb-5">
          <div class="row justify-content-center">
            <div class="col-12 col-md-6 col-lg-4">
              <div
                class="d-flex align-items-center justify-content-center social"
              >
                <a
                  class="me-4"
                  href="https://github.com/yomi-digital/vue-mint-button"
                  target="_blank"
                  ><i class="fab fa-github"></i
                ></a>
                <a
                  class="me-4"
                  href="https://twitter.com/YOMI_WEB3"
                  target="_blank"
                  ><i class="fab fa-twitter"></i
                ></a>
                <a
                  class="me-4"
                  href="https://www.linkedin.com/company/yomidigitalhub/"
                  target="_blank"
                  ><i class="fab fa-linkedin"></i
                ></a>
                <a class="" href="https://medium.com/@yomi.web3" target="_blank"
                  ><i class="fab fa-medium"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="bg-wrapper">
        <div class="bg-vec">
          <div class="gradient"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing mint button from main folder
import MintButton from "../../../src";
import Loader from "@/components/Loader.vue";

export default {
  name: "Home",
  components: {
    MintButton,
    Loader,
  },
  data() {
    return {
      pageLoading: true,
      abi: [
          {
            "inputs": [],
            "name": "buyNFT",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
          }
      ],
      network: "rinkeby",
      price: 0.01,
      method: "buyNFT",
      contract: "0xf81046bAfCe92BdAC543f2A91Fa91c16bA40abde",
      explorerUrl: "https://rinkeby.etherscan.io/tx/",
      parameters: [],
    };
  },
  mounted() {
    setTimeout(() => {
      document.querySelector("body").style.overflowY = "auto";
    }, 5000);
    setTimeout(() => {
      this.pageLoading = false;
    }, 5500);
  },
};
</script>
