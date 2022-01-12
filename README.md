# vue-mint-button
Vue component for web3 connection and minting NFTs, developed by YOMI

![YOMI](https://yomi.digital/assets/img/logo.svg)

https://yomi.digital

This component has been developed to facilitate the connection to **Metamask**, the minting of **NFTs** and consequently the transaction. 

***ATTENTION***: *This component is only compatible with VueJS projects.*

To use vue-mint-button, just follow this guide

# Installation

	#npm
    npm install --save vue-mint-button

    #yarn
    yarn add vue-mint-button



## Usage

 **1. Import  component locally:**

```javascript
import MintButton from "vue-mint-button"
/* ... */
components: {
	MintButton,
},
```

 **2. Component :**

```html
<template>
	<div  id="app">
		<MintButton :ABI="abi" :price="price" :contract="contract" />
	</div>
</template>
```
**Pay attention:**
For the correct functioning of vue-mint-button you will need to enter the following data: 

 - ABI (smart contract details) 
 - Price (price per NFT) 
 - contract (address of the smart contract)

You can use them as you like, via `props` or within `data()`.

## Example
```html
<template>
  <div id="app">
    <MintButton :ABI="abi" :price="price" :contract="contract" />
  </div>
</template>

<script>
import MintButton from "vue-mint-button";
export default {
  name: "App",
  components: {
    MintButton,
  },
  data() {
    return {
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "number",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isTest",
              type: "bool",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
          payable: true,
        },
      ],
      price: 0.1,
      contract: "0x2A8555f5cd838356295637b336C90368EA1ED995",
    };
  },
};
</script>
```

