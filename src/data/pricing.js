// 基于Excel文件的报价数据
export const pricingData = {
  // 汇率 (人民币转美元，可以动态更新)
  exchangeRate: 0.14, // 1 CNY = 0.14 USD (示例汇率)
  
  // 产品类别
  categories: {
    boxes: {
      name: "Game Boxes",
      nameZh: "游戏盒",
      items: [
        {
          id: "tiandihe",
          name: "Lid & Bottom Box",
          nameZh: "天地盒",
          description: "Height below 140MM, 26×26×5cm",
          basePrice: 8.45, // CNY
          minPrice: 7.67,
          specifications: {
            defaultSize: "26×26×5cm",
            maxHeight: "140mm",
            material: "Grey board",
            notes: "Anti-scratch film for dark colors, weight under 5KG"
          }
        },
        {
          id: "kaicanhe",
          name: "Tuck Box",
          nameZh: "开槽盒",
          description: "Height below 140MM",
          basePrice: null,
          specifications: {
            maxHeight: "140mm",
            notes: "For weight over 5KG, use 2mm tuck box"
          }
        },
        {
          id: "yixinghe",
          name: "Custom Shape Box",
          nameZh: "异形盒",
          description: "Height below 140MM",
          basePrice: null,
          specifications: {
            maxHeight: "140mm"
          }
        }
      ]
    },
    
    inserts: {
      name: "Game Inserts",
      nameZh: "内衬",
      items: [
        {
          id: "walengneichen",
          name: "Corrugated Insert",
          nameZh: "瓦楞内衬",
          description: "26×26×5cm box insert",
          basePrice: 2.00,
          minPrice: 1.90
        }
      ]
    },
    
    gameBoards: {
      name: "Game Boards",
      nameZh: "棋盘",
      items: [
        {
          id: "default_board",
          name: "Standard Game Board",
          nameZh: "标准棋盘",
          description: "4-fold, no edge binding, standard film",
          basePrice: 10.60,
          minPrice: 8.80,
          specifications: {
            size: "500×500mm",
            printing: "4C/0C",
            folding: "4-fold default"
          }
        },
        {
          id: "scratch_film",
          name: "Anti-scratch Film",
          nameZh: "刮花膜",
          description: "Additional anti-scratch coating",
          basePrice: 0.80,
          isAddon: true
        },
        {
          id: "six_fold",
          name: "6-Fold Board",
          nameZh: "6折棋盘",
          description: "6-fold additional cost",
          basePrice: 0.80,
          isAddon: true
        }
      ]
    },
    
    cards: {
      name: "Game Cards",
      nameZh: "卡牌",
      items: [
        {
          id: "cards_350g_57x87_60pcs",
          name: "350g Coated Paper Cards",
          nameZh: "350g铜板卡牌",
          description: "57mm × 87mm, 60pcs/set",
          basePrice: 11.475,
          minPrice: 7.02,
          specifications: {
            size: "57mm × 87mm",
            quantity: "60pcs/set",
            material: "350g coated paper",
            finish: "Varnish, shrink wrap"
          }
        },
        {
          id: "cards_350g_63x88_54pcs",
          name: "350g Coated Paper Cards",
          nameZh: "350g铜板卡牌",
          description: "63mm × 88mm, 54pcs/set",
          basePrice: 10.665,
          minPrice: 6.21,
          specifications: {
            size: "63mm × 88mm",
            quantity: "54pcs/set",
            material: "350g coated paper"
          }
        },
        {
          id: "cards_350g_59x91_45pcs",
          name: "350g Coated Paper Cards",
          nameZh: "350g铜板卡牌",
          description: "59mm × 91mm, 45pcs/set",
          basePrice: 10.665,
          minPrice: 6.21,
          specifications: {
            size: "59mm × 91mm",
            quantity: "45pcs/set",
            material: "350g coated paper"
          }
        },
        {
          id: "cards_300g_57x87_60pcs",
          name: "300g Coated Paper Cards",
          nameZh: "300g铜板卡牌",
          description: "57mm × 87mm, 60pcs/set",
          basePrice: 11.05,
          minPrice: 6.76,
          specifications: {
            size: "57mm × 87mm",
            quantity: "60pcs/set",
            material: "300g coated paper"
          }
        },
        {
          id: "cards_300g_63x88_54pcs",
          name: "300g Coated Paper Cards",
          nameZh: "300g铜板卡牌",
          description: "63mm × 88mm, 54pcs/set",
          basePrice: 10.27,
          minPrice: 5.98,
          specifications: {
            size: "63mm × 88mm",
            quantity: "54pcs/set",
            material: "300g coated paper"
          }
        },
        {
          id: "cards_300g_59x91_45pcs",
          name: "300g Coated Paper Cards",
          nameZh: "300g铜板卡牌",
          description: "59mm × 91mm, 45pcs/set",
          basePrice: 10.27,
          minPrice: 5.98,
          specifications: {
            size: "59mm × 91mm",
            quantity: "45pcs/set",
            material: "300g coated paper"
          }
        }
      ]
    },
    
    diecuts: {
      name: "Die-cut Cards",
      nameZh: "模切卡",
      items: [
        {
          id: "single_layer_diecut",
          name: "Single Layer Die-cut",
          nameZh: "单层模切卡",
          description: "280×280mm, 250g grey back white + 1.5mm grey board + 250g grey back white",
          basePrice: 4.55,
          minPrice: 3.38,
          specifications: {
            size: "280×280mm",
            material: "250g grey back white + 1.5mm grey board + 250g grey back white"
          }
        },
        {
          id: "spinner_diecut",
          name: "Spinner Die-cut",
          nameZh: "转盘类模切卡",
          description: "Diameter 12cm, 250g grey back white + 1.5mm grey board + 250g grey back white",
          basePrice: 1.95,
          minPrice: 1.56,
          specifications: {
            size: "Diameter 12cm",
            material: "250g grey back white + 1.5mm grey board + 250g grey back white"
          }
        },
        {
          id: "diecut_scratch_film",
          name: "Anti-scratch Film for Die-cuts",
          nameZh: "模切卡刮花膜",
          description: "Additional anti-scratch coating",
          basePrice: 0.80,
          isAddon: true
        }
      ]
    },
    
    manuals: {
      name: "Instruction Manuals",
      nameZh: "说明书",
      items: [
        {
          id: "saddle_stitch_manual",
          name: "Saddle Stitch Manual",
          nameZh: "骑马钉说明书",
          description: "125g coated paper, multiples of 4, 12PP",
          basePrice: 2.60,
          minPrice: 1.82,
          specifications: {
            material: "125g coated paper",
            pages: "Multiples of 4, 12PP default"
          }
        },
        {
          id: "perfect_bound_manual",
          name: "Perfect Bound Manual",
          nameZh: "胶装说明书",
          description: "125g coated paper, multiples of 16",
          basePrice: 4.55,
          minPrice: 2.60,
          specifications: {
            material: "125g coated paper",
            pages: "Multiples of 16"
          }
        }
      ]
    },
    
    components: {
      name: "Game Components",
      nameZh: "游戏配件",
      items: [
        {
          id: "standard_dice",
          name: "Standard Dice",
          nameZh: "标准骰子",
          description: "D6 16mm, standard dots",
          basePrice: 0.40,
          minPrice: 0.38,
          specifications: {
            type: "D6 16mm",
            design: "Standard dots"
          }
        },
        {
          id: "custom_dice",
          name: "Custom Printed Dice",
          nameZh: "热转印骰子",
          description: "D6 16mm, custom printing",
          basePrice: 3.60,
          minPrice: 3.00,
          specifications: {
            type: "D6 16mm",
            design: "Custom printing"
          }
        },
        {
          id: "zinc_alloy",
          name: "Zinc Alloy Components",
          nameZh: "锌合金配件",
          description: "~3cm size, electroplating, custom mold",
          basePrice: 5.20,
          minPrice: 3.50,
          specifications: {
            size: "~3cm",
            finish: "Electroplating",
            notes: "Custom mold fee: 2000 CNY/design"
          }
        },
        {
          id: "fabric_bag",
          name: "Fabric Bag",
          nameZh: "布袋",
          description: "10×12cm velvet bag, single color logo printing",
          basePrice: 1.80,
          minPrice: 1.60,
          specifications: {
            size: "10×12cm",
            material: "Velvet",
            printing: "Single color logo"
          }
        },
        {
          id: "pvc_figure",
          name: "PVC Figure",
          nameZh: "PVC公仔",
          description: "2cm height, single color",
          basePrice: 2.08,
          minPrice: 1.95,
          specifications: {
            height: "2cm",
            color: "Single color",
            notes: "Mold fee: 10000 CNY/design"
          }
        }
      ]
    }
  },
  
  // 数量折扣
  quantityDiscounts: [
    { min: 1, max: 499, discount: 0 },
    { min: 500, max: 999, discount: 0.05 },
    { min: 1000, max: 2999, discount: 0.10 },
    { min: 3000, max: 4999, discount: 0.15 },
    { min: 5000, max: 9999, discount: 0.20 },
    { min: 10000, max: Infinity, discount: 0.25 }
  ],
  
  // 附加服务
  additionalServices: {
    shrinkWrap: {
      name: "Shrink Wrap",
      nameZh: "热缩包装",
      price: 0.30
    },
    antiScratchFilm: {
      name: "Anti-scratch Film",
      nameZh: "防刮花膜",
      price: 0.80
    },
    edgeBinding: {
      name: "Edge Binding",
      nameZh: "包边",
      price: null // 需要单独报价
    }
  }
};

// 计算价格的工具函数
export const calculatePrice = (item, quantity = 1, useMinPrice = false) => {
  if (!item.basePrice && !item.minPrice) return null;
  
  const basePrice = useMinPrice && item.minPrice ? item.minPrice : item.basePrice;
  if (!basePrice) return null;
  
  // 应用数量折扣
  const discount = pricingData.quantityDiscounts.find(
    d => quantity >= d.min && quantity <= d.max
  )?.discount || 0;
  
  const discountedPrice = basePrice * (1 - discount);
  const totalCNY = discountedPrice * quantity;
  const totalUSD = totalCNY * pricingData.exchangeRate;
  
  return {
    unitPriceCNY: discountedPrice,
    unitPriceUSD: discountedPrice * pricingData.exchangeRate,
    totalCNY,
    totalUSD,
    discount: discount * 100
  };
};

// 获取所有产品类别
export const getAllCategories = () => {
  return Object.entries(pricingData.categories).map(([key, category]) => ({
    id: key,
    ...category
  }));
};

// 根据类别获取产品
export const getProductsByCategory = (categoryId) => {
  return pricingData.categories[categoryId]?.items || [];
};
