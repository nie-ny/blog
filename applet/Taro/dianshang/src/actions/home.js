// import * as homeApi from '../api/home';

export const LOAD = 'home/load';
export const PRODUCT = 'home/product';
export const SAVE = 'home/save';

// 首页查询数据
const banner = [
  {
    id: 368,
    title: '新手引导',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/7/1/717c853c165b48f8908671c68f708e58.png'
  },
  {
    id: 284,
    title: '清洗说明',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/f/8/f8a2e9336e633c7b4436a0ce22ca0dc0.jpg'
  }
];
const brands = [
  {
    id: 201,
    title: 'MK',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/a/a/aa6f88be738258c6a72c7c95e152495c.jpg'
  },
  {
    id: 179,
    title: 'ZARA(新首页）',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/e/6/e6b1b023fc68738ab4af9abc4e6df17b.jpg'
  },
  {
    id: 198,
    title: 'DVF',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/4/0/40ce8215d145a8b4fea53934dce348fa.jpg'
  },
  {
    id: 202,
    title: 'BCBG',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/d/8/d81e774fb3d39911b3cacc4be11cdad9.jpg'
  },
  {
    id: 197,
    title: 'Lili',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/b/c/bc12c8c7d98e947f9262b6eac6210b21.jpg'
  },
  {
    id: 195,
    title: 'ochirly',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/5/d/5df3ffb0b1c1f9e559e9cac6cb28aca5.jpg'
  },
  {
    id: 192,
    title: 'self-portrait',
    subtitle: '',
    image_src:
      'http://ms-cdn.caibowen.net/uploads/banners/b/8/b8212c29daa6e016a57bf0671c458764.jpg'
  }
];

//
export const load = () => {
  return (dispatch) => {
    // homeApi.homepage().then(({ status, data }) => {
    //   if (status === 'ok') {
    dispatch({
      type: LOAD,
      val: {
        banner: banner,
        brands: brands
      }
    });
    //   }
    // });
  };
};

const rows = [
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 7400,
    id: 10176,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/3/a/3a4976ea9339e58ce9882608392de75b.jpg',
    wait_back: 0,
    second_hand_discount: '3.1',
    brand: 'MSPARIS SELECT',
    show_specifications: 'S M L XL',
    is_clothes: 1,
    enabled_timestamp: 1532948996,
    dots: 1,
    type_id: 1,
    limit_tag_ids: [],
    limit_tag: '',
    sale_price: 7378,
    rental_limit_days: 4,
    product_spu: 'SG012R',
    rental_price: 13000,
    new_buy_discount: '5',
    name: '红色条纹网纱连衣裙',
    spu: 'SG012R',
    market_price: 0,
    sale_stock: 0,
    point_price: 3700,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 23100,
    id: 46091,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/f/e/fea95b618e5f86aeae2dce36ba364aad.jpg',
    wait_back: 0,
    second_hand_discount: '7',
    brand: 'TAMMY TANGS',
    show_specifications: 'XS S M L',
    is_clothes: 1,
    enabled_timestamp: 1526991990,
    dots: 1,
    type_id: 1,
    limit_tag_ids: [
      {
        id: 1,
        name: '年卡'
      }
    ],
    limit_tag: '年卡专享',
    sale_price: 23030,
    rental_limit_days: 4,
    product_spu: 'tm409wu',
    rental_price: 4000,
    new_buy_discount: '8.8',
    name: '优雅荷叶边露肩连衣裙',
    spu: 'TM409W',
    market_price: 0,
    sale_stock: 0,
    point_price: 11600,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 85500,
    id: 45511,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/8/6/86c6d0310c9731f506c246fb6832dbd8.jpg',
    wait_back: 0,
    second_hand_discount: '1.8',
    brand: 'TIBI',
    show_specifications: 'XS S M L',
    is_clothes: 1,
    enabled_timestamp: 1525960549,
    dots: 2,
    type_id: 2,
    limit_tag_ids: [
      {
        id: 1,
        name: '年卡'
      },
      {
        id: 0,
        name: 'VIP'
      }
    ],
    limit_tag: '年卡专享',
    sale_price: 85500,
    rental_limit_days: 4,
    product_spu: 'ib021mu',
    rental_price: 48000,
    new_buy_discount: '7',
    name: 'Jones条纹纯棉连衣裙',
    spu: 'IB021M',
    market_price: 475000,
    sale_stock: 0,
    point_price: 42800,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 71200,
    id: 47007,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/c/7/c754d044558182af7f7de0ea22c71fda.jpg',
    wait_back: 0,
    second_hand_discount: '1.8',
    brand: 'KATE SPADE',
    show_specifications: 'XS S M L XL',
    is_clothes: 1,
    enabled_timestamp: 1529413856,
    dots: 2,
    type_id: 2,
    limit_tag_ids: [
      {
        id: 1,
        name: '年卡'
      },
      {
        id: 0,
        name: 'VIP'
      }
    ],
    limit_tag: '年卡专享',
    sale_price: 71100,
    rental_limit_days: 4,
    product_spu: 'ks094mu',
    rental_price: 40000,
    new_buy_discount: '7',
    name: '印花开衩纯棉连衣裙',
    spu: 'KS094M',
    market_price: 395000,
    sale_stock: 0,
    point_price: 35600,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 74800,
    id: 10332,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/d/e/dea6529b34e11b1d6babad24ca7c7f56.jpg',
    wait_back: 0,
    second_hand_discount: '1.5',
    brand: 'DVF',
    show_specifications: 'S M L XL',
    is_clothes: 1,
    enabled_timestamp: 1522659928,
    dots: 2,
    type_id: 2,
    limit_tag_ids: [
      {
        id: 1,
        name: '年卡'
      },
      {
        id: 0,
        name: 'VIP'
      }
    ],
    limit_tag: '年卡专享',
    sale_price: 74700,
    rental_limit_days: 4,
    product_spu: 'DF178B',
    rental_price: 32000,
    new_buy_discount: '3.5',
    name: '蕾丝修身连衣裙',
    spu: 'DF178B',
    market_price: 498000,
    sale_stock: 0,
    point_price: 37400,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 143700,
    id: 48678,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/3/4/3464489ec4cd597231b702ab2477a7f5.jpg',
    wait_back: 0,
    second_hand_discount: '1.8',
    brand: 'TORY BURCH',
    show_specifications: 'S M L XL',
    is_clothes: 1,
    enabled_timestamp: 1532515771,
    dots: 2,
    type_id: 2,
    limit_tag_ids: [
      {
        id: 1,
        name: '年卡'
      },
      {
        id: 0,
        name: 'VIP'
      }
    ],
    limit_tag: '年卡专享',
    sale_price: 143640,
    rental_limit_days: 4,
    product_spu: 'tb076mu',
    rental_price: 80000,
    new_buy_discount: '7',
    name: '剪纸镂空百褶连衣裙(含腰带)',
    spu: 'TB076M',
    market_price: 798000,
    sale_stock: 0,
    point_price: 71900,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 41100,
    id: 45522,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/f/3/f39e35d26b9d4e732107e0d280ed7b26.jpg',
    wait_back: 0,
    second_hand_discount: '1.8',
    brand: 'BCBG MAXAZRIA',
    show_specifications: 'XS S M L XL',
    is_clothes: 1,
    enabled_timestamp: 1525958504,
    dots: 2,
    type_id: 2,
    limit_tag_ids: [
      {
        id: 1,
        name: '年卡'
      },
      {
        id: 0,
        name: 'VIP'
      }
    ],
    limit_tag: '年卡专享',
    sale_price: 41040,
    rental_limit_days: 4,
    product_spu: 'bc861mu',
    rental_price: 23000,
    new_buy_discount: '7',
    name: 'Dodi荷叶边不规则连衣裙',
    spu: 'BC861M',
    market_price: 228000,
    sale_stock: 0,
    point_price: 20600,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 7500,
    id: 10186,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/b/6/b617201c899fabe93fd628fda9b0ae04.jpg',
    wait_back: 0,
    second_hand_discount: '2',
    brand: 'MSPARIS SELECT',
    show_specifications: 'S M L XL',
    is_clothes: 1,
    enabled_timestamp: 1533118378,
    dots: 1,
    type_id: 1,
    limit_tag_ids: [],
    limit_tag: '',
    sale_price: 7460,
    rental_limit_days: 4,
    product_spu: 'SG013N',
    rental_price: 16000,
    new_buy_discount: '5',
    name: '气质柔美露肩蕾丝连衣裙',
    spu: 'SG013N',
    market_price: 0,
    sale_stock: 0,
    point_price: 3800,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 11900,
    id: 6927,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/7/c/7c516ab6478c2f6c84edaab8d799bab5.jpg',
    wait_back: 0,
    second_hand_discount: '3.3',
    brand: 'TAMMY TANGS',
    show_specifications: 'XS S M L',
    is_clothes: 1,
    enabled_timestamp: 1556097871,
    dots: 1,
    type_id: 1,
    limit_tag_ids: [],
    limit_tag: '',
    sale_price: 11814,
    rental_limit_days: 4,
    product_spu: 'TM185A',
    rental_price: 17000,
    new_buy_discount: '5',
    name: '嫣蓝立体百褶半裙(腰带自配)',
    spu: 'TM185A',
    market_price: 0,
    sale_stock: 0,
    point_price: 6000,
    cover_image_label: []
  },
  {
    is_favorite: 0,
    enabled: 1,
    mode_id: 1,
    second_sale_price: 13800,
    id: 11068,
    cover_image:
      'http://ms-cdn.caibowen.net/uploads/products/9/6/967d06fb06e637aac96451b5971f3c74.jpg',
    wait_back: 0,
    second_hand_discount: '2.3',
    brand: 'MSPARIS SELECT',
    show_specifications: 'XS S M L XL',
    is_clothes: 1,
    enabled_timestamp: 1503321650,
    dots: 1,
    type_id: 1,
    limit_tag_ids: [],
    limit_tag: '',
    sale_price: 13777,
    rental_limit_days: 4,
    product_spu: 'HX002B',
    rental_price: 18000,
    new_buy_discount: '5',
    name: '黑色飞飞袖时尚优雅气质连衣裙',
    spu: 'HX002B',
    market_price: 59900,
    sale_stock: 0,
    point_price: 6900,
    cover_image_label: []
  }
];

//
export const product = (val) => {
  return (dispatch, getState) => {
    // 获取 store 中的下一页参数 和 已查询的列表数据
    const { page, products_list = [] } = getState().home;
    // homeApi.product({page:page}).then(({ status, data }) => {
    //   if (status === 'ok') {
    dispatch({
      type: PRODUCT,
      val: {
        products_list: [...products_list, ...rows]
      }
    });
    //   }
    // });
  };
};

//
export const save = (val) => {
  return {
    type: SAVE,
    val
  };
};
