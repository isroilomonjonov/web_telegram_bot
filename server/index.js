const TelegramBot = require("node-telegram-bot-api");
const token = "6385314171:AAHMK7frezBvR3_nOfTg7dV7WO5tkEF_CDI";
const express = require("express");
const cors = require("cors");
const bot = new TelegramBot(token, { polling: true });
const app = express();
app.use(express.json());
app.use(cors());
const botStart = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Start",
    },
    {
      command: "/courses",
      description: "Courselar",
    },
  ]);
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
app.post("/web-data", async (req, res) => {
  const { queryId, products } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Muvaffaqiyatli xarid qildingiz",
      input_message_content: {
        message_text: `Xaridingiz bilan tabriklayman siz ${products
          .reduce((a, c) => a + c.price * c.quantity, 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} qiymatga ega mahsulot sotib oldingiz, ${products
          .map((product) => `${c.title}-${c.quantity}x`)
          .join(", ")}`,
      },
    });
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({});
  }
});
app.listen(process.env.PORT || 8000, () => {
  console.log("server started");
});
