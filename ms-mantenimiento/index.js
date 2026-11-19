const express = require('express');
const app = express();

app.get('/wear', (req, res) => {
  res.json({
    servicio: 'ms-mantenimiento',
    aceite_restante_km: 650,
    pastillas_freno: '72% vida util',
    kit_arrastre: 'Optimo',
    alerta: 'Ninguna'
  });
});

app.listen(8002, () => console.log('ms-mantenimiento activo en puerto 8002'));
