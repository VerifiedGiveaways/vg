# Verified Giveaways

A decentralized application on the Internet Computer for hosting and participating in fair and transparent giveaways.

- __UI__: React
- __Backend__: Motoko actors/canisters
- __Hosting__: Internet Computer


# Developer Setup (macOS or Ubuntu - does not work on Windows)

The setup instructions may seem long, but the goal is to make them complete. They should evolve with feedback.

### Prerequisites
- Git
- Node 16 (Node 17 causes compile errors)
- A code editor such as Visual Studio Code

-----

## Step 1: Install dfx

Ensure the version matches the version in the dfx.json file in the Verified Giveaways project.
```bash
DFX_VERSION=0.8.4 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

👉 IMPORTANT: If you get the error "__zsh: bad CPU type in executable: dfx__" on macOS M1/M2 processors, run the following command, then try installing dfx again:
```bash
Softwareupdate --install-rosetta
```

-----

## Step 2: Setup Internet Identity (II) on Your Local Machine

The Verified Giveaways project uses II authentication. Therefore, before you can run and test the dApp locally, you will first need to setup and run II locally. (Note: Mainnet Internet Identities only work with the mainnet canister. They will not work when running locally in an emulated environment.)

Install Rust (Even though this project does not use Rust, the II project does.)

https://www.rust-lang.org/tools/install

Install the Dfinity Rust CDK optimizer (If you skip this step, you may be prompted to install the library when deploying the II canister below.)
```bash
cargo install --force --locked ic-cdk-optimizer
```

Install CMake (Also used by the II app.)
- macOS
  - Download and install:
    https://github.com/Kitware/CMake/releases/download/v3.22.1/cmake-3.22.1-macOS-universal.dmg (More info: https://cmake.org/install/)
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

Clone the II project and navigate to the root folder.
```bash
git clone https://github.com/dfinity/internet-identity.git
cd internet-identity
```

Install npm packages and ensure the project builds.
```bash
npm ci
npm run build
```

Start a local instance of the Internet Computer blockchain.
(Use a separate dedicated terminal tab or window in the same directory. On macOS, you can use ⌘+t to open a new tab.)
```bash
dfx start --background
```

👉 IMPORTANT: Always run the start command from the root internet_identity directory. Leave it running while developing/testing since the II and VG projects deploy canisters to the local blockchain and run from the code in those canisters. To stop your local Internet Computer blockchain, run:
```bash
dfx stop
```
You may need to enter control+c to return to the command prompt.

Install the II canister (on your local IC blockchain)
```bash
II_ENV=development
dfx deploy --no-wallet --argument '(null)'
```
👉 IMPORTANT: The terminal output will show the canister Id of the II canister. Copy this and save it. You will need it in step 3. You can also get the "internet_identity" canister Id from ./.dfx/local/canister_ids.json. (Created during deploy.)

-----
## Step 3: Setup Verified Giveaways on Your Local Machine

Clone the Verified Giveaways Project
  ```bash
  git clone https://github.com/VerifiedGiveaways/vg
  ```
Install npm packages
  ```bash
  npm i
  ```
Configuration
At the root of the VG project, make a copy of the ".env" file and rename the copy to ".env.local".

Update the II_PROVIDER_URL setting as follows:
```console
II_PROVIDER_URL="http://<id of your local internet identity canister>.localhost:8000/#authorize"
```
Tip: If you paste the above URL in your browser, it should serve up the welcome page from the "internet_identity" canister.

Create, Build and Install Canisters
```bash
dfx deploy
```
This will install the VG canisters in your locally running instance of the Internet Computer blockchain, alongside the internet_identity canister.

Run the UI
```bash
npm start
```
Open your browser and navigate to: http://localhost:8080.

-----
# Local Development Workflow
Always start by running a local instance of the Internet Computer blockchain from the root of your internet_identity folder and in a dedicated terminal:
  ```bash
  dfx start --background
  ```
After making changes to VG canister code, run:
  ```bash
  dfx deploy
  ```
When developing UI code, your changes will update in the browser when you save your files. Before making changes, run:
```bash
npm start
```
When you are finished developing, stop your local instance of the Internet Computer blockchain with:
```bash
dfx stop
```

-----

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
