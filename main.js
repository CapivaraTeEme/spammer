const { Client, GatewayIntentBits } = require('discord.js-selfbot-v13');
const readline = require('readline');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const asciiBanner = `
 /$$$$$$$                                              /$$            /$$$$$$   /$$$$$$     
| $$__  $$                                            |__/           /$$__  $$ /$$__  $$    
| $$  \\ $$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$$  /$$  /$$$$$$$| $$  \\__/| $$  \\ $$ /$$
| $$  | $$ /$$__  $$| $$_  $$_  $$ /$$__  $$| $$__  $$| $$ /$$_____/|  $$$$$$ | $$  | $$|__/
| $$  | $$| $$$$$$$$| $$ \\ $$ \\ $$| $$  \\ $$| $$  \\ $$| $$| $$       \\____  $$| $$  | $$    
| $$  | $$| $$_____/| $$ | $$ | $$| $$  | $$| $$  | $$| $$| $$       /$$  \\ $$| $$/$$ $$ /$$
| $$$$$$$/|  $$$$$$$| $$ | $$ | $$|  $$$$$$/| $$  | $$| $$|  $$$$$$$|  $$$$$$/|  $$$$$$/|__/
|_______/  \\_______/|__/ |__/ |__/ \\______/ |__/  |__/|__/ \\_______/ \\______/  \\____ $$$    
                                                                                    \\__/    
                                                                                            

  /$$$$$$                                                                                   
 /$$__  $$                                                                                   
| $$  \\__/  /$$$$$$   /$$$$$$  /$$$$$$/$$$$   /$$$$$$   /$$$$$$                             
|  $$$$$$  /$$__  $$ |____  $$| $$_  $$_  $$ /$$__  $$ /$$__  $$                            
 \\____  $$| $$  \\ $$  /$$$$$$$| $$ \\ $$ \\ $$| $$$$$$$$| $$  \\__/                            
 /$$  \\ $$| $$  | $$ /$$__  $$| $$ | $$ | $$| $$_____/| $$                                  
|  $$$$$$/| $$$$$$$/|  $$$$$$$| $$ | $$ | $$|  $$$$$$$| $$                                  
 \\______/ | $$____/  \\_______/|__/ |__/ |__/ \\_______/|__/                                  
          | $$                                                                              
          | $$                                                                              
          |__/                                                                              
                          .gg/demonicc 
`;

console.log(asciiBanner);

const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

const mainMenu = async () => {
    const token = await askQuestion("Put Your Token: ");
    client.login(token);

    client.on('ready', async () => {
        console.log(`Logged in as ${client.user.tag}`);

        const serverId = await askQuestion("Put Server Id: ");
        const message = await askQuestion("Put Message [Optional]: ");
        const spamMessage = message || "By DemonicSQ discord.gg/demonicc";

        const antiSpam = await askQuestion("With anti-spam? [Y or N]: ");
        let finalMessage = spamMessage;

        if (antiSpam.toLowerCase() === 'y' || antiSpam.toLowerCase() === 'yes') {
            const emojis = '😊😂😍😜🤔';
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            finalMessage += ` | ${randomEmoji}`;
        }

        const randomLettersChoice = await askQuestion("With letter Random? [Y or N]: ");
        if (randomLettersChoice.toLowerCase() === 'y' || randomLettersChoice.toLowerCase() === 'yes') {
            const randomLetters = Math.random().toString(36).substring(2, 7);
            finalMessage += ` | ${randomLetters}`;
        }

        const pingChoice = await askQuestion("With ping? [Y or N]: ");
        if (pingChoice.toLowerCase() === 'y' || pingChoice.toLowerCase() === 'yes') {
            const members = await client.guilds.cache.get(serverId).members.fetch();
            const randomMember = members.random();
            finalMessage += ` | @${randomMember.user.username}`;
        }

        const channel = client.guilds.cache.get(serverId).channels.cache.find(channel => channel.type === 'text');
        if (channel) {
            setInterval(() => {
                channel.send(finalMessage);
            }, 1000); // Envía el mensaje cada segundo
        } else {
            console.log("No se encontraron canales de texto en el servidor.");
        }
    });
};

mainMenu();
