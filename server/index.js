const TelegramBot = require("node-telegram-bot-api");
const token = "6385314171:AAHMK7frezBvR3_nOfTg7dV7WO5tkEF_CDI";

const bot = new TelegramBot(token, { polling: true });
const botStart = () => {
    bot.setMyCommands([
        {
            command: "/start",
            description: "Start"
        },
        {
            command: "/courses",
            description:"Courselar"
        }
    ])
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Assalom Alekum Web Botimizga hush kelibsiz!",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Kurslarni ko'rish",
                  web_app: {
                    url: "https://web-telegram-bot-xcmb.vercel.app/",
                  },
                },
              ],
            ],
          },
        }
      );
    }
    if (text === "/courses") {
        await bot.sendMessage(
            chatId,
            "Assalom Alekum Web Botimizga hush kelibsiz!",
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Kurslarni ko'rish",
                      web_app: {
                        url: "https://web-telegram-bot-xcmb.vercel.app/",
                      },
                    },
                  ],
                ],
              },
            }
          );
    }

    if (msg.web_app_data?.data) {
      try {
        const data = JSON.parse(msg.web_app_data.data);
        await bot.sendMessage(chatId, `Siz sotib olgan kurslar, `);
        for (item of data) {
          await bot.sendPhoto(chatId, item.Image);
          await bot.sendMessage(chatId, `${item.title}-${item.quantity}x`);
        }
        return await bot.sendMessage(
          chatId,
          `Umumiy narx, ${data
            .reduce((a, c) => a + c.price * c.quantity, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })} `
        );
      } catch (error) {
        console.log(error);
      }
    }
  });
};
botStart();
