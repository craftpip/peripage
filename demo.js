"use strict";


let renderDemo = function(){



    var page = new PeriPage(38);
    page.addText([
        {
            content: 'Ash Ketchum International Restaurant'.toUpperCase(),
            align: PeriPosition.center
        }
    ]);
    page.addText([
        {
            content: 'Adilya, 17710100,17710010',
            align: PeriPosition.center
        }
    ]);
    page.addText([
        {
            content: 'Kingdom of Bahrain',
            align: PeriPosition.center
        }
    ]);
    page.addText([
        {
            content: 'VAT: 200011024300002',
            align: PeriPosition.center
        }
    ]);
    page.addHorizontalLine();
    page.addText([
        {
            content: 'Sales# 1004043',
            align: PeriPosition.right
        },
    ]);
    page.addText([
        {
            content: 'Served by: HASHID',
            align: PeriPosition.left
        }
    ]);
    page.addText([
        {
            content: '09/03/19 08:18:14 PM',
            align: PeriPosition.left
        }
    ]);
    page.addHorizontalLine();
    page.addText([
        {
            content: 'KOT Wo: 1031537 @ 8:16:00 PM',
            align: PeriPosition.left
        }
    ]);
    page.addText([
        {
            content: 'Order Type: HOME DELIVERY',
            align: PeriPosition.left
        }
    ]);
    page.addHorizontalLine();
    page.addHorizontalLine();
    page.addText([
        {
            content: 'qty'.toUpperCase(),
            align: PeriPosition.left,
            width: 10
        },
        {
            content: 'Item'.toUpperCase(),
            align: PeriPosition.left,
            width: 70
        },
        {
            content: 'Amount'.toUpperCase(),
            align: PeriPosition.right
        },
    ]);
    page.addHorizontalLine();
    var orders = [
        [
            "1",
            "Chicken tikka plate",
            "1.600"
        ],
        [
            "1",
            "Chicken tikka (1 pc) spicy with chappathy",
            "0.900"
        ],
        [
            "1",
            "chicken kabab spicy with chappathy all soft & dal rice",
            '2.000'
        ],
        [
            '1',
            'Mix fried rice no beef extra chutney extra chutney',
            '2.200'
        ]
    ];
    for(var _i = 0, orders_1 = orders; _i < orders_1.length; _i++){
        var o = orders_1[_i];
        page.addText([
            {
                content: o[0].toUpperCase(),
                align: PeriPosition.left,
                width: 10
            },
            {
                content: o[1].toUpperCase(),
                align: PeriPosition.left,
                width: 70
            },
            {
                content: o[2].toUpperCase(),
                align: PeriPosition.right,
                width: 20
            },
        ]);
    }
    page.addHorizontalLine();
    page.addText([
        {
            content: 'Payment type:',
            align: PeriPosition.right,
            width: 70
        },
        {
            content: 'CASH',
            align: PeriPosition.right
        },
    ]);
    let calcs = [
        [
            'Gross amount:',
            '6.700'
        ],
        [
            'Vat:',
            '0.335'
        ],
        [
            'Discount:',
            '0.000'
        ],
        [
            'Net amount:',
            '7.035'
        ],
        [
            'Currency Paid:',
            '0.000'
        ],
        [
            'Balance amount:',
            '-7.035'
        ]
    ];
    for(var _a = 0, calcs_1 = calcs; _a < calcs_1.length; _a++){
        var c = calcs_1[_a];
        page.addText([
            {
                content: c[0],
                align: PeriPosition.right,
                width: 70
            },
            {
                content: c[1],
                align: PeriPosition.right
            }
        ]);
    }
    page.addHorizontalLine();
    page.addText([
        {
            content: 'DB. Seven and Fils 35/1000 only',
            align: PeriPosition.left
        }
    ]);
    page.addHorizontalLine();
    page.addText([
        {
            content: '39667436(1)',
            align: PeriPosition.left
        },
        {
            content: '39667436(1)',
            align: PeriPosition.right
        }
    ]);
    page.addText([
        {
            content: 'Bldg: 50',
            align: PeriPosition.left
        },
        {
            content: 'Rd: 2601',
            align: PeriPosition.left
        },
        {
            content: 'Blk: 326',
            align: PeriPosition.left
        },
    ]);
    page.addText([
        {
            content: 'Area: Adilya',
            align: PeriPosition.left
        },
    ]);
    page.addHorizontalLine();
    page.addText([
        {
            content: 'Sales# 1004043',
            align: PeriPosition.left
        }
    ]);
    page.addHorizontalLine();
    page.addText([
        {
            content: '**** Thanks & have a nice meal ****',
            align: PeriPosition.center
        }
    ]);

    let printableText = page.output();
    $('.output').html(printableText);
}


$(function(){
    renderDemo();
})
