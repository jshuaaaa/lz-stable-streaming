require("dotenv").config();

require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-waffle");
require(`@nomiclabs/hardhat-etherscan`);
require("solidity-coverage");
require('hardhat-gas-reporter');
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('@openzeppelin/hardhat-upgrades');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const GOERLI = process.env.GOERLI || "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
// optional

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN = process.env.ETHERSCAN || "Your etherscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false
const POLYGONSCAN = process.env.POLYGONSCAN || ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            chainId: 5,
        },
        mumbai: {
            url: "https://polygon-testnet.public.blastapi.io",
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            chainId: 80001
        }
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            goerli: ETHERSCAN,
            polygonMumbai: POLYGONSCAN
        },
        customChains: [
            {
              network: "polygonMumbai",
              chainId: 80001,
              urls: {
                apiURL: "https://api-testnet.polygonscan.com",
                browserURL: "https://mumbai.polygonscan.com"
              }
            }
          ]
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        user: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.17",
            },
            {
                version: "0.4.24",
            },
        ],
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
}