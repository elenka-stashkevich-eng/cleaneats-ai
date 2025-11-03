// Импортируем библиотеку для запросов
import fetch from "node-fetch";

// Функция для общения с ChatGPT
async function askAI(question) {
  const apiKey = process.env.OPENAI_API_KEY; // ключ из Secrets
  if (!apiKey) {
    console.log("❗ Добавь свой API-ключ OpenAI в Replit Secrets.");
    return;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // можно заменить на gpt-3.5-turbo, если 4o-mini недоступна
      messages: [
        { role: "system", content: "Ты дружелюбный помощник, который отвечает кратко и по существу." },
        { role: "user", content: question }
      ]
    })
  });

  const data = await response.json();
  console.log("\nОтвет ИИ:");
  console.log(data.choices[0].message.content);
}

// Запускаем пример
askAI("Придумай полезный завтрак без жареного и жирного.");