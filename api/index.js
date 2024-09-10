const http = require('https');

const MANDARIN_PRICE_USD = 0.33;
const GOLD_API_URL = 'https://api.gold-api.com/price/XAU';

module.exports = async (req, res) => {
  try {
    // Configura los encabezados CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Maneja las solicitudes OPTIONS para CORS preflight
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

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
    res.status(200).send(mandarinsCanBuy.toString()); // Asegúrate de enviar como cadena
  } catch (error) {
    // Maneja errores
    res.status(500).json({ error: 'Error fetching gold price' });
  }
};
