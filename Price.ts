import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const MANDARIN_PRICE_USD = 0.33;
const GOLD_API_URL = 'https://api.gold-api.com/price/XAU';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Consulta el precio del oro
    const response = await axios.get(GOLD_API_URL);
    const data = response.data;

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
}
