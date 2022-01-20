# Verified Giveaways

This is an open-source community project for creating fair and transparent NFT giveaways, to be owned and governed by the community via SNS on the Internet Computer when available. All of the following text represents the initial concept and is subject to change based on community feedback and participation.

If you are a member of the Internet Computer community in any capacity, your ideas and skills can help this project become a reality. All are welcome who want to contribute, and then own and govern this project. Community roles may include: developers, artists, designers, project managers, legal experts, marketers, NFT enthusiasts, and more.

## Initial Project Goals

- Users can login.
- Once logged in, a user can create a new giveaway, or join an existing giveaway as a participant.
- A user's profile will list all the giveaways they have created, all the giveaways they have joined, and all the giveaways they have won.
- When creating a giveaway, the user will provide a title, description, start date, end date and a list of rules.
- When users join a giveaway, they will enter their wallet addresses to a list of publically visible addresses participating in the giveaway.
- When the giveaway ends, the owner of the giveaway will click a button that triggers the smart contract to randomly select one or more wallets as winners.
  - It would be best for this to be live streamed; however, there should be no question of the legitimacy of the winner selection, as the randomizer will be open source.
  - The code should make it impossible to cheat.
- It will be left to the honor of the giveaway owner to transfer the NFT into the winners' wallets at the risk of a diminished reputation.
- Moderation of content in giveaway titles and descriptions will be moderated by the community, not a central authority. This will prevent spam and illegal content.

## Technologies

The intention is to develop the project based on community ideas within the limitations of the applied technologies and the skillsets of the participating community. The following assumptions also apply:

- The entire application (frontend and backend) will be hosted on the Internet Computer.
- Users will login with the Internet Identity service.
- The frontend will be implemented with ReactJS.
- The backend will be implemented with Motoko. Rust may also be used in specific canisters for requirements that can not be handled with Motoko.
- The project will not attempt to integrate with services or applications external to the Internet Computer blockchain to verify participant tasks.
- Content moderation will be done via ModClub or another means decided by the community.

## Task Verification

In a typical NFT giveaway, users are required to perform tasks in order to qualify for the giveaway. Smart contracts (canisters) on the Internet Computer are not capable of communicating with external services or applications like Twitter and Discord. This is the nature of a blockchain. However smart contracts can integrate with other smart contracts, and on the Internet Computer that includes any app that provides a public canister function for integration.

If the tasks required for participation in a giveaway involved other applications on the Internet Computer, such as making a post on Distrikt, then it would be possible to verify such tasks if those apps exposed a public function for integration.

This project can start with basic functionality and expand later to include task verification with other Internet Computer apps with their cooperation.

## Potential Features in Future Versions

- NFTs (and other tokens) in a giveaway can be transferred to a smart contract to hold in escrow, only to be released to the randomly selected winners.
- NFT minting for one-of-ones or collections with randomly generated traits.
- VR NFT gallery to view NFTs in upcoming giveaways.

## Community Discussion Points

These are discussion points from the initial Twitter thread. Note that all current discussions take place in the Discord server (https://discord.gg/xpeFvAbn3k) created and managed by Finn ∞#0001 and administered by Psycho-Gamen#0282 and Motokoder#7081.

- Project name suggestion: "Verified Giveaways". (Twitter: @RG1PsychoGamen)
- Wallets should be verified to prevent NFTs from being sent to a bad address. (Twitter: @Motokoder)
- Support for wallet handles/domains. (Twitter: [@RG1PsychoGamen](https://twitter.com/RG1PsychoGamen/status/1481464287600197634))
- For randomness, participants generate a random number, then the giveaway host generates a random number. The matching number wins. (Twitter: [@47atop](https://twitter.com/47atop/status/1481496566380834821?t=Z9QyFkvn1dFVIhqEgN96sg&s=19))
