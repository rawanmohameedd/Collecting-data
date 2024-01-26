### The provided code is a React Native application that fetches the Wi-Fi strength for a given BSSID (Basic Service Set Identifier) and sends this data to an Express.js server as an object. The server appends this object to the necessary details and stores them in CSV files. The collected data will be utilized for training an AI model for indoor localization techniques.

### To start collecting data for a specific room, you can press a button in the application. Once the data collection is initiated, the application will take a reading of the Wi-Fi strength every 2 seconds. When you finish collecting data for the room, you can press the "Stop" button, and the data collection will immediately cease.

### This system provides a convenient way to gather Wi-Fi strength data for various rooms or areas and store it in a structured format for further analysis and training of an AI model. The collected data can be used to develop indoor localization techniques, enabling applications to determine the location of a device within an indoor environment based on Wi-Fi signal strength.
