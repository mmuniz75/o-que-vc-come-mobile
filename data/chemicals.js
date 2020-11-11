const chemicals = [
    {
        "id": 182,
        "name": "Acessulfame de potássio",
        "url": ""
    },
    {
        "id": 112,
        "name": "Acetado de DL - Alfa-tocoferila",
        "url": null
    },
    {
        "id": 113,
        "name": "Acetado de retilina",
        "url": null
    },
    {
        "id": 1,
        "name": "Ácido Acético Glacial",
        "url": null
    },
    {
        "id": 14,
        "name": "Ácido Ascórbico",
        "url": null
    },
    {
        "id": 30,
        "name": "Ácido Bórico",
        "url": null
    },
    {
        "id": 2,
        "name": "Ácido Cítrico",
        "url": null
    },
    {
        "id": 129,
        "name": "Ácido Fólico",
        "url": ""
    },
    {
        "id": 3,
        "name": "Ácido Fosfórico",
        "url": null
    },
    {
        "id": 4,
        "name": "Ácido Lático",
        "url": null
    },
    {
        "id": 148,
        "name": "Ácido Pantotênico",
        "url": ""
    },
    {
        "id": 16,
        "name": "Ácido Sórbico",
        "url": null
    },
    {
        "id": 173,
        "name": "Acidulante INS 330",
        "url": ""
    },
    {
        "id": 54,
        "name": "Amido de Milho",
        "url": null
    },
    {
        "id": 124,
        "name": "Antioxidante INS 220",
        "url": ""
    },
    {
        "id": 111,
        "name": "Ascorbado de Sódio",
        "url": null
    },
    {
        "id": 33,
        "name": "Benzoato de Sódio",
        "url": null
    },
    {
        "id": 159,
        "name": "Betacaroteno",
        "url": ""
    },
    {
        "id": 88,
        "name": "Bicarbonato de Amônio",
        "url": null
    },
    {
        "id": 65,
        "name": "Bicarbonato de Sódio",
        "url": null
    },
    {
        "id": 149,
        "name": "Biotina",
        "url": ""
    },
    {
        "id": 22,
        "name": "Cacau em Pó",
        "url": null
    },
    {
        "id": 23,
        "name": "Cafeína",
        "url": null
    },
    {
        "id": 141,
        "name": "Calciferol",
        "url": ""
    },
    {
        "id": 134,
        "name": "Carbonato de Amônio",
        "url": ""
    },
    {
        "id": 108,
        "name": "Carbonato de Cálcio",
        "url": null
    },
    {
        "id": 165,
        "name": "Carbonato de Potássio",
        "url": ""
    },
    {
        "id": 166,
        "name": "Carbonato de Sódio",
        "url": ""
    },
    {
        "id": 115,
        "name": "Carragena",
        "url": null
    },
    {
        "id": 147,
        "name": "Cianocobalamina",
        "url": ""
    },
    {
        "id": 136,
        "name": "Citrato de Pótassio",
        "url": ""
    },
    {
        "id": 169,
        "name": "Citrato de Sódio",
        "url": ""
    },
    {
        "id": 90,
        "name": "Cloreto de Amônio",
        "url": null
    },
    {
        "id": 6,
        "name": "Cloreto de Cálcio",
        "url": null
    },
    {
        "id": 56,
        "name": "Cloreto de Potássio",
        "url": null
    },
    {
        "id": 104,
        "name": "Cloreto de sódio",
        "url": null
    },
    {
        "id": 146,
        "name": "Cloridrato de Piridoxina",
        "url": ""
    },
    {
        "id": 114,
        "name": "Colecalciferol",
        "url": null
    },
    {
        "id": 170,
        "name": "Conservador INS 202",
        "url": ""
    },
    {
        "id": 171,
        "name": "Conservador INS 211",
        "url": ""
    },
    {
        "id": 172,
        "name": "Conservador INS 223",
        "url": ""
    },
    {
        "id": 123,
        "name": "Conservante INS 202",
        "url": ""
    },
    {
        "id": 181,
        "name": "Coramte INS 160",
        "url": ""
    },
    {
        "id": 43,
        "name": "Corante Caramelo",
        "url": null
    },
    {
        "id": 42,
        "name": "Corantes Artificiais",
        "url": null
    },
    {
        "id": 27,
        "name": "Diatomitas",
        "url": null
    },
    {
        "id": 118,
        "name": "Dimetil Dicarbonato",
        "url": null
    },
    {
        "id": 160,
        "name": "Dióxido de Silício",
        "url": ""
    },
    {
        "id": 44,
        "name": "Dióxido de Titânio Anatase",
        "url": null
    },
    {
        "id": 24,
        "name": "D-Limoneno",
        "url": null
    },
    {
        "id": 117,
        "name": "Edulcorante Sucralose",
        "url": null
    },
    {
        "id": 178,
        "name": "Emulsificantes INS 435",
        "url": ""
    },
    {
        "id": 179,
        "name": "Emulsificantes INS 471",
        "url": ""
    },
    {
        "id": 180,
        "name": "Emulsificantes Lecitinas",
        "url": ""
    },
    {
        "id": 175,
        "name": "Espessantes INS 412",
        "url": ""
    },
    {
        "id": 176,
        "name": "Espessantes INS 415",
        "url": ""
    },
    {
        "id": 174,
        "name": "Espessantes INS 466",
        "url": ""
    },
    {
        "id": 177,
        "name": "Estabilizante INS 460",
        "url": ""
    },
    {
        "id": 25,
        "name": "Etilvanilina",
        "url": null
    },
    {
        "id": 158,
        "name": "Fosfato Sódico Monobásico",
        "url": ""
    },
    {
        "id": 119,
        "name": "Fosfato tricálcio",
        "url": null
    },
    {
        "id": 126,
        "name": "Fosfato trissódico",
        "url": ""
    },
    {
        "id": 12,
        "name": "Glicerina Bidestilada",
        "url": null
    },
    {
        "id": 34,
        "name": "Gluconato de Sódio",
        "url": null
    },
    {
        "id": 83,
        "name": "Glutamato Monossódico",
        "url": null
    },
    {
        "id": 121,
        "name": "Glúten",
        "url": null
    },
    {
        "id": 10,
        "name": "Goma Arábica",
        "url": null
    },
    {
        "id": 137,
        "name": "Goma Gelana",
        "url": ""
    },
    {
        "id": 11,
        "name": "Goma Guar",
        "url": null
    },
    {
        "id": 167,
        "name": "Goma Jataí",
        "url": ""
    },
    {
        "id": 138,
        "name": "Goma Tara",
        "url": ""
    },
    {
        "id": 49,
        "name": "Goma Xantana",
        "url": null
    },
    {
        "id": 161,
        "name": "Inosinato Dissódico",
        "url": ""
    },
    {
        "id": 120,
        "name": "Iodato de Potássio",
        "url": null
    },
    {
        "id": 17,
        "name": "Lecitina de Soja",
        "url": null
    },
    {
        "id": 139,
        "name": "Lectina de Girassol",
        "url": ""
    },
    {
        "id": 13,
        "name": "Maltodextrina",
        "url": null
    },
    {
        "id": 7,
        "name": "Metabissulfito de Potássio",
        "url": null
    },
    {
        "id": 8,
        "name": "Metabissulfito de Sódio",
        "url": null
    },
    {
        "id": 28,
        "name": "Metilato de Sódio",
        "url": null
    },
    {
        "id": 51,
        "name": "Mono 90",
        "url": null
    },
    {
        "id": 106,
        "name": "Monofosfato Monossódico",
        "url": null
    },
    {
        "id": 163,
        "name": "Niacina",
        "url": ""
    },
    {
        "id": 145,
        "name": "Nicotinamida",
        "url": ""
    },
    {
        "id": 127,
        "name": "Nisina",
        "url": ""
    },
    {
        "id": 37,
        "name": "Nitrato de Sódio",
        "url": null
    },
    {
        "id": 38,
        "name": "Nitrito de Sódio",
        "url": null
    },
    {
        "id": 122,
        "name": "Pectina",
        "url": null
    },
    {
        "id": 164,
        "name": "Piridoxina",
        "url": ""
    },
    {
        "id": 133,
        "name": "Pirofosfato Ácido de Sódio",
        "url": ""
    },
    {
        "id": 107,
        "name": "Pirofosfato Dissódico",
        "url": null
    },
    {
        "id": 109,
        "name": "Pirofosfato Férrico",
        "url": null
    },
    {
        "id": 157,
        "name": "Pirofosfato Tretassódico",
        "url": ""
    },
    {
        "id": 116,
        "name": "Polidemetilsiloxano",
        "url": null
    },
    {
        "id": 52,
        "name": "Polisorbato",
        "url": null
    },
    {
        "id": 103,
        "name": "Propilenoglicol",
        "url": null
    },
    {
        "id": 39,
        "name": "Propionato de Cálcio",
        "url": null
    },
    {
        "id": 162,
        "name": "Quanilato Dissódico",
        "url": ""
    },
    {
        "id": 140,
        "name": "Retinol",
        "url": ""
    },
    {
        "id": 144,
        "name": "Riboflavina",
        "url": ""
    },
    {
        "id": 20,
        "name": "Sorbato de Potássio",
        "url": null
    },
    {
        "id": 82,
        "name": "Soro de Leite em Pó",
        "url": null
    },
    {
        "id": 110,
        "name": "Sufalto de Zinco",
        "url": null
    },
    {
        "id": 9,
        "name": "Sulfito de Sódio",
        "url": null
    },
    {
        "id": 125,
        "name": "Tetrapirofosfato de sódio",
        "url": ""
    },
    {
        "id": 156,
        "name": "Tiamina",
        "url": ""
    },
    {
        "id": 142,
        "name": "Tocoferol",
        "url": ""
    },
    {
        "id": 132,
        "name": "Triestearato de Sorbitana",
        "url": ""
    },
    {
        "id": 105,
        "name": "Trifosfato de sódio",
        "url": null
    },
    {
        "id": 79,
        "name": "Tripolifosfato de Sódio",
        "url": null
    },
    {
        "id": 26,
        "name": "Vanilina",
        "url": null
    }
]

export default chemicals