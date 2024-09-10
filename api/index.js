const http = require('http');

const MANDARIN_PRICE_USD = 0.33;
const GOLD_API_URL = 'http://api.gold-api.com/price/XAU';

module.exports = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      http.get(GOLD_API_URL, (response) => {
        let body = '';

        response.on('data', (chunk) => {
          body += chunk;
        });

        response.on('end', () => {
          try {
            const json = JSON.parse(body);
            resolve(json);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });

    // Asegúrate de obtener el precio en USD
    const goldPriceUSD = data.price;

    // Calcula cuántas mandarinas se pueden comprar
    const mandarinsCanBuy = goldPriceUSD / MANDARIN_PRICE_USD;

    // Responde con el resultado
    res.status(200).json({ mandarinsCanBuy });
  } catch (error) {
    // Maneja errores
    res.status(500).json({ error: 'Error fetching gold price' });
  }
};
