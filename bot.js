const axios = require("axios");

const token = process.env.BOT_TOKEN;

let offset = 0;

async function checkMessages() {
    try {
        const response = await axios.get(
            `https://api.telegram.org/bot${token}/getUpdates`,
            {
                params: {
                    offset: offset,
                    timeout: 30
                }
            }
        );

        const updates = response.data.result;

        for (const update of updates) {
            offset = update.update_id + 1;

            if (update.message?.text === "/start") {
                const chatId = update.message.chat.id;

                await axios.post(
                    `https://api.telegram.org/bot${token}/sendMessage`,
                    {
                        chat_id: chatId,
                        text: "Welcome! 👋\n\nClick the button below:",
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: "🔗 Open Link",
                                        url: "https://example.com"
                                    }
                                ]
                            ]
                        }
                    }
                );
            }
        }
    } catch (error) {
        console.log("Error:", error.message);
    }

    checkMessages();
}

console.log("Bot is running...");
checkMessages();