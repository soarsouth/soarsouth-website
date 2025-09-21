// 基于真实Excel报价单的产品数据和价格
export const productCategories = {
  'rulebook': {
    name: 'Rulebook',
    products: {
      'standard_rulebook': {
        name: 'Standard Rulebook',
        basePrice: { 200: 1.32, 500: 1.01, 1000: 0.85 },
        material: '157g coated paper',
        printing: '4C/4C',
        defaultSpecs: {
          dimension: '64mm × 124mm',
          pages: '16 pages',
          binding: 'stapled',
          orientation: 'landscape'
        }
      }
    }
  },
  'cards': {
    name: 'Cards',
    products: {
      'standard_cards': {
        name: 'Standard Game Cards',
        basePrice: { 200: 3.67, 500: 2.82, 1000: 2.20 },
        material: '300g coated paper',
        printing: '4C/4C Varnishing',
        defaultSpecs: {
          dimension: '63mm × 88mm',
          quantity: '108 cards',
          packaging: 'Shrinkwrap to 4 decks'
        }
      },
      'premium_cards': {
        name: 'Premium Cards',
        basePrice: { 200: 4.50, 500: 3.45, 1000: 2.70 },
        material: '350g coated paper',
        printing: '4C/4C UV coating',
        defaultSpecs: {
          dimension: '63mm × 88mm',
          quantity: '108 cards',
          packaging: 'Individual shrinkwrap'
        }
      }
    }
  },
  'game_box': {
    name: 'Game Box',
    products: {
      'custom_game_box': {
        name: 'Custom Game Box',
        basePrice: { 200: 1.58, 500: 1.21, 1000: 0.95 },
        material: '157g coated paper + 1300g greyboard',
        printing: '4C/0C',
        defaultSpecs: {
          dimension: '132mm × 76mm × 81mm',
          type: 'Tuck box',
          finish: 'Matte lamination'
        }
      },
      'deluxe_box': {
        name: 'Deluxe Game Box',
        basePrice: { 200: 2.80, 500: 2.15, 1000: 1.68 },
        material: '250g coated paper + 2000g greyboard',
        printing: '4C/4C',
        defaultSpecs: {
          dimension: '200mm × 150mm × 50mm',
          type: 'Lift-off lid',
          finish: 'Gloss lamination + UV spot'
        }
      }
    }
  },
  'dice': {
    name: 'Dice',
    products: {
      'd8_dice': {
        name: 'Eight-sided die (d8)',
        basePrice: { 200: 0.79, 500: 0.68, 1000: 0.55 },
        material: 'Plastic',
        printing: 'Pad printing',
        defaultSpecs: {
          dimension: '16mm',
          color: 'Standard black',
          faces: 'Numbered faces'
        }
      },
      'd6_dice': {
        name: 'Six-sided die (d6)',
        basePrice: { 200: 0.65, 500: 0.55, 1000: 0.45 },
        material: 'Plastic',
        printing: 'Pad printing',
        defaultSpecs: {
          dimension: '16mm',
          color: 'Standard white',
          faces: 'Dot faces'
        }
      }
    }
  },
  'insert': {
    name: 'Insert/Divider',
    products: {
      'card_insert': {
        name: 'Card Insert/Divider',
        basePrice: { 200: 0.28, 500: 0.21, 1000: 0.16 },
        material: '300g white cardboard',
        printing: 'Matte lamination',
        defaultSpecs: {
          dimension: '125mm × 69mm × 38mm',
          type: 'Folded insert',
          compartments: 'Multiple card slots'
        }
      },
      'foam_insert': {
        name: 'Foam Insert',
        basePrice: { 200: 1.20, 500: 0.95, 1000: 0.75 },
        material: 'EVA foam',
        printing: 'Die-cut',
        defaultSpecs: {
          dimension: 'Custom fit',
          type: 'Component organizer',
          compartments: 'Custom layout'
        }
      }
    }
  },
  'tokens': {
    name: 'Tokens',
    products: {
      'cardboard_tokens': {
        name: 'Cardboard Tokens',
        basePrice: { 200: 0.85, 500: 0.65, 1000: 0.50 },
        material: '2mm greyboard',
        printing: '4C/4C',
        defaultSpecs: {
          dimension: '25mm diameter',
          quantity: '50 tokens',
          finish: 'Die-cut punch'
        }
      },
      'wooden_tokens': {
        name: 'Wooden Tokens',
        basePrice: { 200: 1.50, 500: 1.15, 1000: 0.90 },
        material: 'Birch wood',
        printing: 'Screen printing',
        defaultSpecs: {
          dimension: '20mm × 20mm',
          quantity: '30 tokens',
          finish: 'Natural wood'
        }
      }
    }
  },
  'board': {
    name: 'Game Board',
    products: {
      'folded_board': {
        name: 'Folded Game Board',
        basePrice: { 200: 2.15, 500: 1.65, 1000: 1.29 },
        material: '157g coated paper + 1.5mm greyboard',
        printing: '4C/4C',
        defaultSpecs: {
          dimension: '420mm × 297mm',
          fold: 'Quad-fold',
          finish: 'Matte lamination'
        }
      },
      'mounted_board': {
        name: 'Mounted Game Board',
        basePrice: { 200: 3.80, 500: 2.92, 1000: 2.28 },
        material: '157g coated paper + 3mm greyboard',
        printing: '4C/4C',
        defaultSpecs: {
          dimension: '600mm × 400mm',
          type: 'Single piece',
          finish: 'Gloss lamination'
        }
      }
    }
  },
  'wooden_products': {
    name: 'Wooden Products',
    products: {
      'wooden_meeples': {
        name: 'Wooden Meeples',
        basePrice: { 200: 2.50, 500: 1.95, 1000: 1.50 },
        material: 'Birch wood',
        printing: 'Screen printing',
        defaultSpecs: {
          dimension: '16mm × 16mm × 8mm',
          quantity: '50 pieces',
          finish: 'Natural wood'
        }
      },
      'wooden_cubes': {
        name: 'Wooden Cubes',
        basePrice: { 200: 1.80, 500: 1.40, 1000: 1.10 },
        material: 'Birch wood',
        printing: 'Laser engraving',
        defaultSpecs: {
          dimension: '10mm × 10mm × 10mm',
          quantity: '100 pieces',
          finish: 'Natural wood'
        }
      }
    }
  },
  'zinc_alloy': {
    name: 'Zinc Alloy',
    products: {
      'metal_coins': {
        name: 'Metal Coins',
        basePrice: { 200: 3.20, 500: 2.50, 1000: 1.95 },
        material: 'Zinc alloy',
        printing: 'Embossed design',
        defaultSpecs: {
          dimension: '25mm diameter × 2mm',
          quantity: '30 coins',
          finish: 'Antique bronze'
        }
      },
      'metal_tokens': {
        name: 'Metal Tokens',
        basePrice: { 200: 2.80, 500: 2.20, 1000: 1.70 },
        material: 'Zinc alloy',
        printing: 'Enamel fill',
        defaultSpecs: {
          dimension: '20mm × 20mm × 2mm',
          quantity: '40 tokens',
          finish: 'Silver plating'
        }
      }
    }
  },
  'fabric_bags': {
    name: 'Fabric Bags',
    products: {
      'drawstring_bag': {
        name: 'Drawstring Bag',
        basePrice: { 200: 1.50, 500: 1.15, 1000: 0.90 },
        material: 'Cotton canvas',
        printing: 'Screen printing',
        defaultSpecs: {
          dimension: '150mm × 200mm',
          quantity: '10 bags',
          finish: 'Natural cotton'
        }
      },
      'velvet_pouch': {
        name: 'Velvet Pouch',
        basePrice: { 200: 2.20, 500: 1.70, 1000: 1.35 },
        material: 'Velvet fabric',
        printing: 'Embroidery',
        defaultSpecs: {
          dimension: '100mm × 150mm',
          quantity: '15 pouches',
          finish: 'Luxury velvet'
        }
      }
    }
  },
  'plastic_components': {
    name: 'Plastic Components',
    products: {
      'plastic_standees': {
        name: 'Plastic Standees',
        basePrice: { 200: 1.20, 500: 0.95, 1000: 0.75 },
        material: 'Acrylic plastic',
        printing: 'UV printing',
        defaultSpecs: {
          dimension: '30mm × 40mm × 3mm',
          quantity: '20 standees',
          finish: 'Clear acrylic'
        }
      },
      'plastic_markers': {
        name: 'Plastic Markers',
        basePrice: { 200: 0.80, 500: 0.65, 1000: 0.50 },
        material: 'ABS plastic',
        printing: 'Injection molding',
        defaultSpecs: {
          dimension: '15mm × 15mm × 5mm',
          quantity: '60 markers',
          finish: 'Colored plastic'
        }
      }
    }
  },
  'figurines': {
    name: 'Figurines',
    products: {
      'resin_miniatures': {
        name: 'Resin Miniatures',
        basePrice: { 200: 4.50, 500: 3.50, 1000: 2.75 },
        material: 'Resin',
        printing: 'Hand painted',
        defaultSpecs: {
          dimension: '28mm scale',
          quantity: '6 miniatures',
          finish: 'Detailed painting'
        }
      },
      'plastic_figures': {
        name: 'Plastic Figures',
        basePrice: { 200: 2.80, 500: 2.20, 1000: 1.70 },
        material: 'PVC plastic',
        printing: 'Injection molding',
        defaultSpecs: {
          dimension: '32mm scale',
          quantity: '12 figures',
          finish: 'Pre-painted'
        }
      }
    }
  }
};

// 汇率转换
export const exchangeRates = {
  USD: 1,
  CNY: 7.2,
  EUR: 0.85
};

// 数量折扣
export const quantityDiscounts = {
  200: 1.0,
  500: 0.77,  // 基于真实数据计算的折扣率
  1000: 0.64
};

// 定制规格加价范围
export const customPricing = {
  minMarkup: 0.20,  // 20%
  maxMarkup: 0.40   // 40%
};

// 获取产品价格
export const getProductPrice = (category, product, quantity, currency = 'USD') => {
  const productData = productCategories[category]?.products[product];
  if (!productData) return 0;

  // 获取基础价格
  let basePrice = 0;
  if (quantity >= 1000) {
    basePrice = productData.basePrice[1000];
  } else if (quantity >= 500) {
    basePrice = productData.basePrice[500];
  } else {
    basePrice = productData.basePrice[200];
  }

  // 转换货币
  const rate = exchangeRates[currency] || 1;
  return (basePrice * rate).toFixed(2);
};

// 获取定制价格范围
export const getCustomPriceRange = (basePrice, currency = 'USD') => {
  const rate = exchangeRates[currency] || 1;
  const minPrice = basePrice * (1 + customPricing.minMarkup) * rate;
  const maxPrice = basePrice * (1 + customPricing.maxMarkup) * rate;
  
  return {
    min: minPrice.toFixed(2),
    max: maxPrice.toFixed(2)
  };
};
