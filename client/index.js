const axios = require('axios');
const readline = require('readline');
const { promisify } = require('node:util');
const { ObjectId } = require('fastest-validator-typescript');
const mongoose = require('mongoose'); 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let question = promisify(rl.question)
question = question.bind(rl)

const validOrders = ['ascPrice', 'descPrice', 'yearAsc', 'yearDesc', 'asc', 'desc']

const cb = async function (arg) {
    switch (arg) {
        case 'add': {
            const brand = await question('Input Brand: ');
            const year = await question('Input year: ')
            const price = await question('Input price: ')
            const name = await question('Input name: ')
            try {
                await axios.post('http://localhost:3000/cars/add', {
                    brand: brand.trim(),
                    productionYear: new Date(year),
                    name: name.trim(),
                    price: Number(price)
                })
                const ask = await question('Done. Input Command: ');
                await cb(ask)
            } catch (e) {
                const ask = await question('Failed to create car, input new Command: ');
                await cb(ask)
            }
            break;
        }
        case 'list': {
            const order = await question(`Input order  from list: [ ${validOrders} ] `)
            if (validOrders.includes(order)) {
                const lim = await question('Input Limit: ');
                const limit = isNaN(Number(lim)) ? Number(lim) : 10;
                const resp = await axios.get(`http://localhost:3000/cars/sort/${order}?limit=${limit}`)
                console.log('Cars:', resp.data)
                const ask = await question('Input Command: ')
                await cb(ask)
            } else {
                const ask = await question('Invalid orderBy Value input new Command: ');
                await cb(ask);
            }
            break;
        }
        case 'delete' : {
            const _id = await question(`Input id which you want to remove: `)
            try {
                await axios.delete('http://localhost:3000/cars/delete',
                { 
                    params: { _id } 
                });
                const ask = await question('Done. Input Command: ');
                await cb(ask);
            } catch (e) {
                const ask = await question('Failed to delete car, input new Command: ');
                await cb(ask);
            }
            break;
        }
        case 'exit': {
            console.log('\nBYE BYE !!!');
            process.exit(0);
            break;
        }
        default: {
            console.log("DEFAILT")
            const ask = await question('Input Valid Command: ');
            await cb(ask);
        }

    }

}

rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

(async()=> {
    const ask = await question('Input Commands: ');
    await cb(ask);
})()
