// Enhanced pricing data structure for multi-product quote system
export const productCategories = {
  'game-boxes': {
    name: 'Game Boxes',
    nameZh: '游戏盒子',
    products: {
      'lid-bottom-box': {
        name: 'Lid & Bottom Box',
        nameZh: '天地盒',
        defaultSpecs: {
          material: '1200g Grey Board + 157g Art Paper',
          size: '295mm × 295mm × 70mm',
          printing: '4C/4C CMYK',
          finish: 'Matte Lamination',
          moq: 500
        },
        pricing: {
          basePrice: 45.00, // CNY per unit
          minPrice: 38.00,
          customUpcharge: { min: 20, max: 40 } // percentage
        }
      },
      'tuck-box': {
        name: 'Tuck Box',
        nameZh: '开槽盒',
        defaultSpecs: {
          material: '350g Coated Paper',
          size: '100mm × 70mm × 25mm',
          printing: '4C/4C CMYK',
          finish: 'Gloss Varnish',
          moq: 1000
        },
        pricing: {
          basePrice: 8.50,
          minPrice: 6.80,
          customUpcharge: { min: 20, max: 40 }
        }
      },
      'custom-shape-box': {
        name: 'Custom Shape Box',
        nameZh: '异形盒',
        defaultSpecs: {
          material: 'Various Options',
          size: 'Custom Design',
          printing: 'Custom Design',
          finish: 'Multiple Options',
          moq: 500
        },
        pricing: {
          basePrice: 65.00,
          minPrice: 52.00,
          customUpcharge: { min: 30, max: 50 }
        }
      }
    }
  },
  'game-inserts': {
    name: 'Game Inserts',
    nameZh: '游戏内衬',
    products: {
      'eva-foam-insert': {
        name: 'EVA Foam Insert',
        nameZh: 'EVA泡棉内衬',
        defaultSpecs: {
          material: '2mm EVA Foam',
          size: '280mm × 280mm × 60mm',
          color: 'Black/White',
          finish: 'Die-cut Precision',
          moq: 500
        },
        pricing: {
          basePrice: 12.00,
          minPrice: 9.60,
          customUpcharge: { min: 25, max: 40 }
        }
      },
      'cardboard-insert': {
        name: 'Cardboard Insert',
        nameZh: '纸板内衬',
        defaultSpecs: {
          material: '1200g Grey Board',
          size: '280mm × 280mm × 60mm',
          printing: '1C Black',
          finish: 'Die-cut',
          moq: 1000
        },
        pricing: {
          basePrice: 8.00,
          minPrice: 6.40,
          customUpcharge: { min: 20, max: 35 }
        }
      }
    }
  },
  'game-boards': {
    name: 'Game Boards',
    nameZh: '游戏板',
    products: {
      'folding-board': {
        name: 'Folding Game Board',
        nameZh: '折叠游戏板',
        defaultSpecs: {
          material: '1200g Grey Board + 157g Art Paper',
          size: '420mm × 594mm (A2)',
          printing: '4C/4C CMYK',
          finish: 'Matte Lamination',
          moq: 500
        },
        pricing: {
          basePrice: 25.00,
          minPrice: 20.00,
          customUpcharge: { min: 20, max: 35 }
        }
      },
      'mounted-board': {
        name: 'Mounted Game Board',
        nameZh: '裱糊游戏板',
        defaultSpecs: {
          material: '2mm Cardboard + 157g Art Paper',
          size: '420mm × 594mm (A2)',
          printing: '4C/4C CMYK',
          finish: 'Matte Lamination',
          moq: 500
        },
        pricing: {
          basePrice: 35.00,
          minPrice: 28.00,
          customUpcharge: { min: 25, max: 40 }
        }
      }
    }
  },
  'game-cards': {
    name: 'Game Cards',
    nameZh: '游戏卡牌',
    products: {
      'poker-cards': {
        name: 'Poker Size Cards',
        nameZh: '扑克尺寸卡牌',
        defaultSpecs: {
          material: '350g Coated Paper',
          size: '63mm × 88mm',
          printing: '4C/4C CMYK',
          finish: 'Varnish + Shrink Wrap',
          quantity: '54pcs/set',
          moq: 500
        },
        pricing: {
          basePrice: 18.50,
          minPrice: 14.80,
          customUpcharge: { min: 20, max: 30 }
        }
      },
      'tarot-cards': {
        name: 'Tarot Size Cards',
        nameZh: '塔罗尺寸卡牌',
        defaultSpecs: {
          material: '350g Coated Paper',
          size: '70mm × 120mm',
          printing: '4C/4C CMYK',
          finish: 'Varnish + Shrink Wrap',
          quantity: '78pcs/set',
          moq: 500
        },
        pricing: {
          basePrice: 28.00,
          minPrice: 22.40,
          customUpcharge: { min: 20, max: 30 }
        }
      },
      'mini-cards': {
        name: 'Mini Cards',
        nameZh: '迷你卡牌',
        defaultSpecs: {
          material: '350g Coated Paper',
          size: '44mm × 67mm',
          printing: '4C/4C CMYK',
          finish: 'Varnish + Shrink Wrap',
          quantity: '54pcs/set',
          moq: 1000
        },
        pricing: {
          basePrice: 12.00,
          minPrice: 9.60,
          customUpcharge: { min: 20, max: 30 }
        }
      }
    }
  },
  'die-cut-cards': {
    name: 'Die-cut Cards',
    nameZh: '单层模切卡',
    products: {
      'character-standees': {
        name: 'Character Standees',
        nameZh: '角色立牌',
        defaultSpecs: {
          material: '2mm Cardboard',
          size: '50mm × 80mm',
          printing: '4C/1C CMYK',
          finish: 'Die-cut Shape',
          moq: 500
        },
        pricing: {
          basePrice: 3.50,
          minPrice: 2.80,
          customUpcharge: { min: 25, max: 40 }
        }
      },
      'tokens': {
        name: 'Game Tokens',
        nameZh: '游戏标记',
        defaultSpecs: {
          material: '2mm Cardboard',
          size: '25mm × 25mm',
          printing: '4C/1C CMYK',
          finish: 'Die-cut Circle/Square',
          moq: 1000
        },
        pricing: {
          basePrice: 1.20,
          minPrice: 0.96,
          customUpcharge: { min: 20, max: 35 }
        }
      }
    }
  },
  'instruction-manuals': {
    name: 'Instruction Manuals',
    nameZh: '说明书',
    products: {
      'saddle-stitched': {
        name: 'Saddle Stitched Manual',
        nameZh: '骑马钉说明书',
        defaultSpecs: {
          material: '157g Art Paper',
          size: '210mm × 297mm (A4)',
          pages: '8-16 pages',
          printing: '4C/4C CMYK',
          finish: 'Saddle Stitched',
          moq: 500
        },
        pricing: {
          basePrice: 4.50,
          minPrice: 3.60,
          customUpcharge: { min: 20, max: 30 }
        }
      },
      'perfect-bound': {
        name: 'Perfect Bound Manual',
        nameZh: '胶装说明书',
        defaultSpecs: {
          material: '157g Art Paper',
          size: '210mm × 297mm (A4)',
          pages: '16-64 pages',
          printing: '4C/4C CMYK',
          finish: 'Perfect Bound',
          moq: 500
        },
        pricing: {
          basePrice: 8.50,
          minPrice: 6.80,
          customUpcharge: { min: 20, max: 30 }
        }
      }
    }
  },
  'game-components': {
    name: 'Game Components',
    nameZh: '游戏配件',
    products: {
      'wooden-meeples': {
        name: 'Wooden Meeples',
        nameZh: '木制米宝',
        defaultSpecs: {
          material: 'Beech Wood',
          size: '16mm × 16mm × 8mm',
          color: 'Natural/Colored',
          finish: 'Smooth Sanded',
          moq: 1000
        },
        pricing: {
          basePrice: 0.85,
          minPrice: 0.68,
          customUpcharge: { min: 30, max: 50 }
        }
      },
      'plastic-dice': {
        name: 'Plastic Dice',
        nameZh: '塑料骰子',
        defaultSpecs: {
          material: 'ABS Plastic',
          size: '16mm × 16mm × 16mm',
          color: 'Various Colors',
          finish: 'Engraved Numbers',
          moq: 1000
        },
        pricing: {
          basePrice: 0.45,
          minPrice: 0.36,
          customUpcharge: { min: 25, max: 40 }
        }
      }
    }
  }
};

// Exchange rate
export const EXCHANGE_RATE = 0.14; // 1 CNY = 0.14 USD

// Calculate price with quantity discounts
export function calculatePrice(basePrice, quantity, useMinPricing = false) {
  let unitPrice = basePrice;
  
  if (useMinPricing) {
    // Use minimum pricing for bulk orders
    const product = Object.values(productCategories)
      .flatMap(cat => Object.values(cat.products))
      .find(p => p.pricing.basePrice === basePrice);
    
    if (product) {
      unitPrice = product.pricing.minPrice;
    }
  } else {
    // Apply quantity discounts
    if (quantity >= 5000) {
      unitPrice = basePrice * 0.85; // 15% discount
    } else if (quantity >= 2000) {
      unitPrice = basePrice * 0.90; // 10% discount
    } else if (quantity >= 1000) {
      unitPrice = basePrice * 0.95; // 5% discount
    }
  }
  
  const totalCNY = unitPrice * quantity;
  const totalUSD = totalCNY * EXCHANGE_RATE;
  
  return {
    unitPriceCNY: unitPrice,
    unitPriceUSD: unitPrice * EXCHANGE_RATE,
    totalCNY: totalCNY,
    totalUSD: totalUSD
  };
}

// Calculate custom pricing range
export function calculateCustomPricing(basePrice, quantity, customUpcharge) {
  const basePricing = calculatePrice(basePrice, quantity);
  
  const minUpcharge = customUpcharge.min / 100;
  const maxUpcharge = customUpcharge.max / 100;
  
  return {
    minTotalCNY: basePricing.totalCNY * (1 + minUpcharge),
    maxTotalCNY: basePricing.totalCNY * (1 + maxUpcharge),
    minTotalUSD: basePricing.totalUSD * (1 + minUpcharge),
    maxTotalUSD: basePricing.totalUSD * (1 + maxUpcharge)
  };
}

// SEO Keywords for board game manufacturing
export const seoKeywords = [
  // Primary keywords
  'board game manufacturing',
  'tabletop game manufacturing',
  'board game suppliers',
  'custom board game printing',
  'board game manufacturer China',
  
  // Secondary keywords
  'card game printing',
  'game box manufacturing',
  'board game components',
  'custom game pieces',
  'board game production',
  'tabletop game printing',
  'game card printing services',
  'board game packaging',
  'custom dice manufacturing',
  'game manual printing',
  
  // Long-tail keywords
  'professional board game manufacturing services',
  'custom board game manufacturer China',
  'board game printing and packaging',
  'tabletop game production company',
  'board game manufacturing process',
  'custom game box printing',
  'board game component manufacturing',
  'game card printing China',
  'board game supplier for Kickstarter',
  'custom board game pieces manufacturing',
  
  // Industry-specific
  'Kickstarter board game manufacturing',
  'indie board game printing',
  'prototype board game manufacturing',
  'small batch board game printing',
  'board game manufacturing quote',
  'game publisher manufacturing services',
  'board game fulfillment services',
  'custom game manufacturing China'
];

export default {
  productCategories,
  EXCHANGE_RATE,
  calculatePrice,
  calculateCustomPricing,
  seoKeywords
};
