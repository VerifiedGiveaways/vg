# Verified Giveaways

A decentralized application on the Internet Computer for hosting and participating in fair and transparent giveaways.

- __UI__: React
- __Backend__: Motoko actors/canisters
- __Hosting__: Internet Computer


# Developer Setup (MacOs or Ubuntu - does not work on Windows)

The setup instructions may seem long, but the goal is to make them complete. They should evolve with feedback.

### Prerequisites
- Git
- Node 16 (Node 17 causes compile errors)
- A code editor such as Visual Studio Code

## Step 1: Install dfx

Ensure the version matches the version in the dfx.json file in the Verified Giveaways project.
```bash
DFX_VERSION=0.8.4 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

## Step 2: Setup Internet Identity on Your Local Machine

The Verified Giveaways project uses Internet Identity authentication. Therefore, before you can run and test the dApp locally, you will first need to setup and run Internet Identity locally. (Note: Mainnet Internet Identities only work with the mainnet canister. They will not work when running locally in an emulated environment.)

- Install Rust (Even though this project does not use Rust, the Internet Identity project does.)
  - https://www.rust-lang.org/tools/install

- Install CMake (Also used by the Internet Identity app.)
  - MacOS
    - Download and install:
      https://github.com/Kitware/CMake/releases/download/v3.22.1/cmake-3.22.1-macos-universal.dmg (More info: https://cmake.org/install/)
    - Create symlinks to CMake:
      ```bash
      sudo "/Applications/CMake.app/Contents/bin/cmake-gui" --install
      ```
  - Ubuntu Linux
    ```bash
    sudo apt-get update
    sudo apt-get install build-essential
    sudo apt-get -y install cmake
    sudo apt-get -y install cmake-qt-gui
    ```

- Clone the Internet Identity Project and navigate to the root foldder
  ```bash
  git clone https://github.com/dfinity/internet-identity.git
  cd internet-identity
  ```

- Install npm packages and ensure the project builds
  ```bash
  npm ci
  npm run build
  ```

- Start a local instance of the Internet Computer blockchain
  (Use a separate dedicated terminal window.)
  ```bash
  dfx start --background
  ```

- Important: To stop your local Internet Computer blockchain, run:
  ```bash
  dfx stop
  ```

- Install the Internet Identity canister (on your local IC blockchain)
  ```bash
  II_ENV=development
  dfx deploy --no-wallet --argument '(null)'
  ```
  IMPORTANT: The terminal output will show the canister Id of the Internet Identity canister. Copy this and save it. You will need it in step 3.

## Step 3: Setup Verified Giveaways on Your Local Machine

- Clone the Verified Giveaways Project
  ```bash
  git clone https://github.com/VerifiedGiveaways/vg
  ```
- Install npm packages
  ```bash
  npm i
  ```
- Configuration
  - At the root of the VG project, make a copy of the ".env" file and rename the copy to ".env.local".
  - Update the II_PROVIDER_URL setting as follows:
    ```console
    II_PROVIDER_URL="http://<id of your local internet identity canister>.localhost:8000/#authorize"
    ```
- Create, Build and Install Canisters
  ```bash
  dfx deploy
  ```
- Run the UI
  ```bash
  npm start
  ```
  - Open your browser and navigate to:
    - http://localhost:8000

## Local Development

- Always start by running a local instance of the Internet Computer blockchain from the root of your internet_identity folder and in a dedicated terminal:
  ```bash
  dfx start --background
  ```
- After making changes to VG canister code, run:
  ```bash
  dfx deploy
  ```
- When developing UI code, your changes will update in the browser when you save your files. Before making changes, run:
  ```bash
  npm start
  ```
- When you are finished developing, stop your local instance of the Internet Computer blockchain with:
  ```bash
  dfx stop
  ```

# Canister Testing

## Candid UI

The Candid UI is pre-packaged with dfx, so there is no additional install.

You can test your actor methods locally with Candid UI. After deploying your canisters, you will be able to open the Candid UI with the following URL:
- http://127.0.0.1:8000/?canisterId={Candid UI Canister Id}&id={Your Canister Id}

To get the Candid UI canister Id, run this command:
```
dfx canister id __Candid_UI
```

To get your canister Id, run this command:
```
dfx canister id <your canister name from dfx.json>
```

You can also look in the ./.dfx/canister_ids.json file to get any canister Id.
