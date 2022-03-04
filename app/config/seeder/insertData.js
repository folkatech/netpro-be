const db = require('../../models');
const config = require('../config');
let crypto = require('crypto');


async function registerMember()
{
    try {
        await db.users.bulkCreate([{
            name: 'rno',
            email: 'rto@gmail.com',
            username: '123456',
            role: 'rno',
            image: 'https://i.ibb.co/6XKMvGw/610-6104451-image-placeholder-png-user-profile-placeholder-image-png.jpg',
            active : '1',
            password: crypto.createHash('sha256').update('123456').digest('hex')
        }, {
            name: 'pnd',
            email: 'pnd@gmail.com',
            username: '122456',
            role: 'pnd',
            image: 'https://i.ibb.co/6XKMvGw/610-6104451-image-placeholder-png-user-profile-placeholder-image-png.jpg',
            active : '1',
            password: crypto.createHash('sha256').update('123456').digest('hex')
        }, {
            name: 'mitra',
            email: 'mitra@gmail.com',
            username: '124456',
            role: 'mitra',
            image: 'https://i.ibb.co/6XKMvGw/610-6104451-image-placeholder-png-user-profile-placeholder-image-png.jpg',
            active : '1',
            password: crypto.createHash('sha256').update('123456').digest('hex')
        }, {
            name: 'netar',
            email: 'netar@gmail.com',
            username: '12556',
            role: 'netar',
            image: 'https://i.ibb.co/6XKMvGw/610-6104451-image-placeholder-png-user-profile-placeholder-image-png.jpg',
            active : '1',
            password: crypto.createHash('sha256').update('123456').digest('hex')
            }]).catch((err) => {
                console.log(err.errors);
            });
    } catch (err) {
        console.log(err.stack);
    }
}

async function witel()
{
    try {
        await db.witel.bulkCreate([{
            name: 'semarang',
            active: '1',
            code : 'SMG'
        }, {
            name: 'Purwekerto',
            active: '1',
            code : 'PWO'
        },  {
            name: 'Yogyakarta',
            active: '1',
            code : 'YOG'
        },  {
            name: 'Solo',
            active: '1',
            code : 'SLO'
        },  {
            name: 'Kudus',
            active: '1',
            code : 'KDS'
        }, {
            name: 'Magelang',
            active: '1',
            code : 'MGL'
        }]).catch((err) => {
            console.log('error insert data witel');    
            console.log(err);
        });

        await db.expand.bulkCreate([{
            name: 'Expand Modul Metro',
            type : 'e',
            active : '1'
        }, {
            name: 'Expand Modul OTN',
            type : 'e',
            active : '1',
        },  {
            name: 'Expand Modul Trunk',
            type : 'e',
            active : '1',
        },  {
            name: 'Expand Modul Metro',
            type : 'e',
            active : '1',
        },  {
            name: 'Expand Modul Rectifier',
            type : 'e',
            active : '1',
        },  {
            name: 'Rectifier',
            type : 'n',
            active : '1',
        },  {
            name: 'OTN',
            type : 'n',
            active : '1',
        },  {
            name: 'Baterai',
            type : 'n',
            active : '1',
        },  {
            name: 'Tera',
            type : 'n',
            active : '1',
        },  {
            name: 'Bras',
            type : 'n',
            active : '1',
        },  {
            name: 'DCN',
            type : 'n',
            active : '1',
        }]).catch((err) => {
            console.log('error insert data expand');    
                console.log(err.errors);
        });

        let witelId = await db.witel.findOne({
             where: {
                code: 'SLO'
             }
        });

        console.log('witel print');
       // console.log(witelId);
        if (witelId != undefined) {
            await db.sto.bulkCreate([{
                name: 'STO SoloBaru',
                witel_id: witelId.dataValues.id,
                active: '1'
            }, {
                name: 'Expand Modul OTN',
                witel_id: witelId.dataValues.id,
                active: '1',
            }, {
                name: 'Expand Modul Trunk',
                witel_id: witelId.dataValues.id,
                active: '1',
            }, {
                name: 'Expand Modul Metro',
                witel_id: witelId.dataValues.id,
                active: '1',
            }, {
                name: 'Expand Modul Retifier',
                witel_id: witelId.dataValues.id,
                active: '1',
            }]).catch((err) => {
                console.log('sto insert failed');
                console.log(err);
            });    
        }
        
        await db.board.bulkCreate([{
            name: 'Update',
            active: '1',
            number: 0,
            type: 'nonneter'
        }, {
            name: 'To Do',
            active: '1',
            number: 1,
            type: 'nonneter'
        }, {
            name: 'In Progress',
            active: '1',
            number: 2,
            type: 'nonneter'
        }, {
            name: 'Update',
            active: '1',
            number: 0,
            type: 'netar'
        }, {
            name: 'Need Aprove',
            active: '1',
            number: 1,
            type: 'netar'
        }, {
            name: 'In Progress',
            active: '1',
            number: 2,
            type: 'netar'
        }]);

    } catch (err) {
        console.log(err);
    }
}

async function addAssets()
{
    try {
        await db.asset.bulkCreate([
            {
                name: 'Kerten',
                code: 'KRT',
                address: 'JL. Adi Sucipto No.60',
                region: 'TR4',
                witel: 'SLO',
                active : '1'
            }, {
                name: 'Mojosongo',
                code: 'MJS',
                address: 'JL. Sumpah Pemuda No.140',
                region: 'TR4',
                witel: 'SLO',
                active : '1'
            }, {
                name: 'Palur',
                code: 'PLR',
                address: 'JL. Solo - Sragen, Turisari, Palur',
                region: 'TR4',
                witel: 'SLO',
                active : '1'
            }, {
                name: 'Kartosuro',
                code: 'KRS',
                address: 'JL. Diponogoro  No.60',
                region: 'TR4',
                witel: 'SLO',
                active : '1'
            }, {
                name: 'Bekonang',
                code: 'BKG',
                address: 'Jalan Merak Liproro Rw 5',
                region: 'TR4',
                witel: 'SLO',
                active : '1'
            }, {
                name: 'NP000097',
                code: 'SKH',
                address: 'JL. Mayor Sunaryo Sukoharjo',
                region: 'TR4',
                witel: 'SLO',
                active : '1'
            }
        ]);
        console.log('success insert asset');
    } catch (err) {
        
    }
}

function index()   
    {
    registerMember();
    witel();
    addAssets();
    }

    index();