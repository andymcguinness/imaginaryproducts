// The API just saying 'hey'
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}