const express = require('express');
const IPData = require('ipdata').default;
const app = express();

const ipdata = new IPData('73fdb4a809629b5884be03082fbc95a0a9037fa7193cbae3cf37835a');

app.set('trust proxy', true);

app.get('/', async (req, res) => {
    try {
        const ip = req.ip;
        const data = await ipdata.lookup(ip);
        
        const filteredData = {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country_name,
        };

        res.json(filteredData);


    } catch (error) {


        console.error('Error looking up IP data:', error);
        res.status(500).send('Internal Server Error');


    }
});



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
