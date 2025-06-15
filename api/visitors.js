import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'visitors.json');

  // Lire le fichier JSON
  let data = { count: 0 };
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  }

  // Incrémenter le compteur uniquement si méthode GET
  if (req.method === 'GET') {
    data.count += 1;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ count: data.count });
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
