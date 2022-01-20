# vue-mint-button
Vue component for web3 connection and minting NFTs, developed by YOMI

![YOMI](https://yomi.digital/logo_dark_2.png)

https://yomi.digital
\
\
You can see a demo of vue-mint-button here:\
https://vue-mint-button.yomi.digital
\
\
This component has been developed to facilitate the connection to **Metamask**, the minting of **NFTs** and consequently the transaction. 
\
\
Through this component you can choose different networks for minting including:

- Ethereum
- Rinkeby:
- Polygon:
- Mumbai:
- Ganache

In addition, a link to the transaction txid is provided.
\
\
***ATTENTION***: *This component is only compatible with VueJS projects.*

To use vue-mint-button, just follow this guide.
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
		<MintButton :ABI="abi" :price="price" :network="network" :method="method" :explorerUrl="explorerUrl" :contract="contract" />
	</div>
</template>
```
**Pay attention:**
For the correct functioning of vue-mint-button you will need to enter the following data: 

 - ABI (smart contract details) 
 - Network (Ethereum, Rinkeby, Polygon, Mumbai, Ganache)
 - Method (the minting function)
 - Price (price per NFT) 
 - Contract (address of the smart contract)
 - Url (txid link)

You can use them as you like, via `props` or within `data()`.

## Example
```html
<template>
  <div id="app">
    <MintButton :ABI="abi" :price="price" :network="network" :method="method" :explorerUrl="explorerUrl" :contract="contract" />
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
      network: "ethereum",
      method: "safeMint"
    };
  },
};
</script>
```

