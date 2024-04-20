const { ethers } = require("ethers");
const axios = require("axios");
const addresses = require("../../constants/networkMapping.json");
const nftAbi = require("../../constants/Nft.json");

const NFTMinting = async (nftData, setNftData, account) => {
  try {
    let tokenId, nftAddress;
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      console.log("chainid " + chainId.toString());
      nftAddress = addresses[chainId].Nft[0];
      console.log(nftAddress);
      const signer = provider.getSigner(account);
      const contract = new ethers.Contract(nftAddress, nftAbi, signer);
      console.log(contract);
      console.log(nftData);
      let result = await contract.safeMint(account, JSON.stringify(nftData));
      console.log(result);
      const reciept = await result.wait(1);
      console.log(reciept);
      tokenId = reciept.events[0].args.tokenId.toString();

      const nftMarketplaceAddress = addresses[chainId].NftMarketplace[0];
      result = await contract.approve(nftMarketplaceAddress, tokenId);
      console.log(result);
    }

    console.log("nftData:");
    console.log(nftData);
    console.log(tokenId);
    return {tokenId,nftAddress}

    
    setNftData({
      ...nftData,
      Name: "",
      Price: {
        amount: 0,
        coinName: "weth",
        coinAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      ContractAddress: nftAddress,
      TokenStandard: "ERC-721",
      Chain: "sepolia",
      Metadata: "",
      LastUpdated: Date.now(),
      Stats: [],
      Traits: [],
      Count: 0,
      Description: "",
      CreatedAt: Date.now(),
    });
  } catch (error) {
    console.log("NFT upload failed " + error?.response);
    console.log(error.response);
    console.log(error);
  }
};

export default NFTMinting;
