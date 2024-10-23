const { Client } = require('discord.js-selfbot-v13');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new Client();

let token, serverId, channelId, message, antiSpam, randomLetters, withPing;

console.log(`

 /$$$$$$$                                              /$$            /$$$$$$   /$$$$$$     
| $$__  $$                                            |__/           /$$__  $$ /$$__  $$    
| $$  \ $$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$$  /$$  /$$$$$$$| $$  \__/| $$  \ $$ /$$
| $$  | $$ /$$__  $$| $$_  $$_  $$ /$$__  $$| $$__  $$| $$ /$$_____/|  $$$$$$ | $$  | $$|__/
| $$  | $$| $$$$$$$$| $$ \ $$ \ $$| $$  \ $$| $$  \ $$| $$| $$       \____  $$| $$  | $$    
| $$  | $$| $$_____/| $$ | $$ | $$| $$  | $$| $$  | $$| $$| $$       /$$  \ $$| $$/$$ $$ /$$
| $$$$$$$/|  $$$$$$$| $$ | $$ | $$|  $$$$$$/| $$  | $$| $$|  $$$$$$$|  $$$$$$/|  $$$$$$/|__/
|_______/  \_______/|__/ |__/ |__/ \______/ |__/  |__/|__/ \_______/ \______/  \____ $$$    
                                                                                    \__/    
                                                                                            
                                                                                            
  /$$$$$$                                                                                   
 /$$__  $$                                                                                  
| $$  \__/  /$$$$$$   /$$$$$$  /$$$$$$/$$$$   /$$$$$$   /$$$$$$                             
|  $$$$$$  /$$__  $$ |____  $$| $$_  $$_  $$ /$$__  $$ /$$__  $$                            
 \____  $$| $$  \ $$  /$$$$$$$| $$ \ $$ \ $$| $$$$$$$$| $$  \__/                            
 /$$  \ $$| $$  | $$ /$$__  $$| $$ | $$ | $$| $$_____/| $$                                  
|  $$$$$$/| $$$$$$$/|  $$$$$$$| $$ | $$ | $$|  $$$$$$$| $$                                  
 \______/ | $$____/  \_______/|__/ |__/ |__/ \_______/|__/                                  
          | $$                                                                              
          | $$                                                                              
          |__/                                                                              


                                                                                             
Put Your Token: `);

rl.on('line', (input) => {
    if (!token) {
        token = input;
        console.log('Put server Id:');
    } else if (!serverId) {
        serverId = input;
        console.log('Put channel Id:');
    } else if (!channelId) {
        channelId = input;
        console.log('Put message [Optional]:');
    } else if (!message) {
        message = input || "By DemonicSQ discord.gg/demonicc"; // Default message if none provided
        console.log('With anti-spam? [Y or N]:');
    } else if (!antiSpam) {
        antiSpam = input.toLowerCase() === 'y' || input.toLowerCase() === 'yes';
        console.log('With letter Random? [Y or N]:');
    } else if (!randomLetters) {
        randomLetters = input.toLowerCase() === 'y' || input.toLowerCase() === 'yes';
        console.log('With ping? [Y or N]:');
    } else if (!withPing) {
        withPing = input.toLowerCase() === 'y' || input.toLowerCase() === 'yes';
        startSpamming();
    }
});

client.login(token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

async function startSpamming() {
    const channel = client.channels.cache.get(channelId);
    if (!channel) {
        console.log('Invalid channel ID.');
        return;
    }

    console.log('Spamming started...');
    while (true) {
        let spamMessage = message;
        
        if (antiSpam) {
            const emojis = getRandomEmojis();
            spamMessage += ` | ${emojis}`;
        }

        if (randomLetters) {
            const letters = getRandomLetters();
            spamMessage += ` | ${letters}`;
        }

        if (withPing) {
            const randomUser = getRandomUser();
            spamMessage += ` | <@${randomUser}>`;
        }

        await channel.send(spamMessage);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
    }
}

function getRandomEmojis() {
    const emojis = ["😀", "😂", "🤣", "😅", "😎", "😍", "😢", "😡", "🥳", "🤖"];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function getRandomLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < 5; i++) { // Adjust length as needed
        randomString += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return randomString;
}

function getRandomUser() {
    const users = client.users.cache.filter(user => !user.bot).map(user => user.id);
    return users[Math.floor(Math.random() * users.length)];
}
