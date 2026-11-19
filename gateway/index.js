const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const TELEMETRIA_URL = process.env.TELEMETRIA_URL || 'http://ms-telemetria:8001';
const MANTENIMIENTO_URL = process.env.MANTENIMIENTO_URL || 'http://ms-mantenimiento:8002';
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;

function verificarFirebase(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de Firebase requerido' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    if (FIREBASE_PROJECT_ID && payload.aud !== FIREBASE_PROJECT_ID) {
      return res.status(403).json({ error: 'Token no pertenece al proyecto Firebase' });
    }
    req.usuario = payload.email;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token malformado o invalido' });
  }
}

app.get('/api/telemetria', verificarFirebase, async (req, res) => {
  try {
    const response = await fetch(`${TELEMETRIA_URL}/status`);
    const data = await response.json();
    res.json({ gateway: 'OK', usuario_autenticado: req.usuario, origen: data });
  } catch (err) {
    res.status(502).json({ error: 'Fallo conectando con ms-telemetria' });
  }
});

app.get('/api/mantenimiento', verificarFirebase, async (req, res) => {
  try {
    const response = await fetch(`${MANTENIMIENTO_URL}/wear`);
    const data = await response.json();
    res.json({ gateway: 'OK', usuario_autenticado: req.usuario, origen: data });
  } catch (err) {
    res.status(502).json({ error: 'Fallo conectando con ms-mantenimiento' });
  }
});

app.listen(8000, () => console.log('API Gateway escuchando en puerto 8000'));
