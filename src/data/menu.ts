// Editorial menu snapshot, checked against the restaurant's public Toast menu.
// Keep this list in sync manually; Toast confirms final prices and availability.
export const TOAST_ORDER_URL = 'https://order.toasttab.com/online/la-souq-richardson-dallas';
export const toastItemUrl = (path: string) => `${TOAST_ORDER_URL}/${path}`;

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  image?: string;
  toastItemPath: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  note: string;
  items: MenuItem[];
}

const imageRoot = 'https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/';

export const menuCategories: MenuCategory[] = [
  {
    id: 'coffee', name: 'Coffee', note: 'The everyday ritual, thoughtfully crafted.',
    items: [
      { name: 'Double Espresso', description: 'Rich, concentrated espresso from our house blend, bold and balanced.', price: '$3.50', image: imageRoot + '1778060900663-6e4qri-chatgpt-image-may-6-2026-12-48-11-pm.jpg', toastItemPath: 'item-double-espresso_23066ff0-2be6-437e-94e0-fb52d9139a90' },
      { name: 'Americano', description: 'Smooth espresso mellowed with hot water for a clean, classic finish.', price: '$4.00', image: imageRoot + '1778060660817-ifxbqb-chatgpt-image-may-6-2026-12-43-23-pm.jpg', toastItemPath: 'item-americano_34aff967-8677-4450-bfab-df21146ca08c' },
      { name: 'Cortado (4oz)', description: 'Equal parts espresso and lightly textured milk — bold and smooth.', price: '$4.50', image: imageRoot + '1778060434831-gomena-chatgpt-image-may-6-2026-12-39-04-pm.jpg', toastItemPath: 'item-cortado-4oz_1720b534-eedf-4f03-b5d4-4b9f5a109677' },
      { name: 'Flat White (8oz)', description: 'Velvety micro-foam poured over espresso — silky, rich, and refined.', price: '$5.00', image: imageRoot + '1778060387049-p3o46u-chatgpt-image-may-6-2026-12-38-22-pm.jpg', toastItemPath: 'item-flat-white-8oz_9f266236-3f24-45eb-8ac5-9dc1639699d4' },
      { name: 'Cappuccino (8oz)', price: '$5.00', toastItemPath: 'item-cappuccino-8oz_802252cf-8fac-453e-859b-22a72a1028e3' },
      { name: 'Cold Brew', price: '$5.00+', toastItemPath: 'item-cold-brew_61c89e1e-3177-4baa-a604-3e84d98fe0d3' },
      { name: 'Latte', price: '$5.50+', toastItemPath: 'item-latte_82d308d4-28fd-4641-928d-eac32b64937e' },
      { name: 'Hot Cocoa', price: '$5.50', toastItemPath: 'item-hot-cocoa_ae3a03ae-6804-4fbc-b48f-606ac1a16c32' },
    ],
  },
  {
    id: 'signature-coffee', name: 'Signature Coffee', note: 'Familiar comforts. A little discovery in every cup.',
    items: [
      { name: 'Habibti Latte', description: 'Soft rose & warm cardamom accented espresso — floral and comforting.', price: '$6.50+', image: imageRoot + '1778069447382-h8ij1r-chatgpt-image-may-6-2026-03-04-04-pm.jpg', toastItemPath: 'item-habibti-latte_fcf15714-321d-470f-a5c2-504a70d1e25a' },
      { name: 'Lavender & Honey Latte', description: 'Calming lavender and golden honey layered with rich espresso.', price: '$6.50+', image: imageRoot + '1778069372877-8f3go8-chatgpt-image-may-6-2026-03-01-38-pm.jpg', toastItemPath: 'item-lavender-honey-latte_d54d61f6-61b1-4294-9898-99eb88e1b3dc' },
      { name: "Za'atar W' Zeit Latte", description: 'A savory twist — fresh thyme and a hint of olive oil meet espresso.', price: '$6.50+', image: imageRoot + '1778069477594-0ftxlm-chatgpt-image-may-6-2026-03-03-04-pm.jpg', toastItemPath: 'item-zaatar-w-zeit-latte_5f1c4689-a7ad-407c-a495-ce665465a1ad' },
      { name: 'Rouhi Latte', description: 'Silky white chocolate and cool mint folded into espresso — fresh, smooth, and lightly sweet.', price: '$7.00+', image: imageRoot + '1778069293478-mpkync-chatgpt-image-may-6-2026-02-59-42-pm.jpg', toastItemPath: 'item-rouhi-latte_6ef0654a-4a29-477a-9b96-99b79381e125' },
      { name: 'Aden Gold Rush Latte', price: '$7.00+', toastItemPath: 'item-aden-gold-rush-latte_3d0a193b-c569-44b4-9c68-4d915193768b' },
      { name: 'Fig & Cinnamon Latte', price: '$7.00+', toastItemPath: 'item-fig-cinnamon-latte_1f450d12-3e51-4309-8365-40dba3aa7487' },
      { name: 'Oh La La Latte', price: '$7.50+', toastItemPath: 'item-oh-la-la-latte_70b68170-1d85-497b-956b-b50eb37376b3' },
      { name: 'Halwa Latte', price: '$8.00+', toastItemPath: 'item-halwa-latte_da085d61-6f1c-4e51-9f60-09febb836b48' },
      { name: 'Turkish Coffee (16oz)', toastItemPath: 'item-turkish-coffee-16oz_f7e10e9b-ac3e-4bae-8a91-2362f595b67f' },
      { name: 'Pista-Affogato', price: '$8.00', toastItemPath: 'item-pistaaffogato_fbea446a-ff85-404d-ada3-7c8fadf8af6d' },
    ],
  },
  {
    id: 'matcha', name: 'Ceremonial Matcha', note: 'A slower sip, a brighter moment.',
    items: [
      { name: 'Matcha Latte', price: '$5.50+', toastItemPath: 'item-matcha-latte_787dfc9e-1e02-42a6-b3f5-f3c03b77d9ac' },
      { name: 'Strawberry Matcha Latte', price: '$7.00+', toastItemPath: 'item-strawberry-matcha-latte_288f69ed-b9eb-416c-9492-2ecc625f4b71' },
      { name: 'Mango Matcha Latte', price: '$7.00+', toastItemPath: 'item-mango-matcha-latte_8c01f20c-0985-475a-9d52-4a21b11041ec' },
      { name: 'Rose & Pistachio Matcha Latte', price: '$7.00+', toastItemPath: 'item-rose-pistachio-matcha-latte_6cb13af5-6a1b-4d43-8666-d5207c11fa50' },
      { name: 'Fig & Cinnamon Matcha', price: '$7.00+', toastItemPath: 'item-fig-cinnamon-matcha_390d4584-acb6-4a1e-8ef7-a531203b8786' },
      { name: 'Matcha Mint Chip', price: '$7.00+', toastItemPath: 'item-matcha-mint-chip_fc75f9e5-acd7-4b91-8af4-3a83cc19bf4a' },
      { name: 'Matcha Lemonade', price: '$7.50', toastItemPath: 'item-matcha-lemonade_a7cce147-329c-47d3-bab4-adc9569d99dc' },
    ],
  },
  {
    id: 'tea', name: 'Specialty Tea', note: 'A cup worth making time for.',
    items: [
      { name: 'Karak Chai', price: '$5.00', toastItemPath: 'item-karak-chai_c46d58ce-4376-4079-a002-cfefe299a143' },
      { name: 'Iced Chai Latte', price: '$5.50+', toastItemPath: 'item-iced-chai-latte_82654f21-2ad5-4268-af58-110b4d04809c' },
      { name: 'Other Teas', price: '$4.00', toastItemPath: 'item-other-teas_df9dbade-d9f6-40d3-9061-d70825113d8b' },
      { name: 'Moroccan Mint Tea', price: '$5.00', toastItemPath: 'item-moroccan-mint-tea_cb4c266d-005c-412c-89fc-27f7c7031008' },
    ],
  },
  {
    id: 'refreshers', name: 'Refreshers', note: 'Something refreshing for your next pause.',
    items: [
      { name: 'Zaher Lemonade', price: '$5.00+', toastItemPath: 'item-zaher-lemonade_de3977b3-cdcd-415d-af00-0ee34f980db0' },
      { name: 'Jallab', price: '$5.00+', toastItemPath: 'item-jallab_b99404c5-c743-4a98-a6f0-19b14f60588f' },
      { name: 'Qamar Al-Din', price: '$5.00+', toastItemPath: 'item-qamar-aldin_d8567635-ac64-40c2-96e6-370865f18004' },
      { name: 'Iced Hibiscus', price: '$5.50+', toastItemPath: 'item-iced-hibiscus_d8ce8848-c3c2-4b63-957c-366b46aebd71' },
      { name: 'Berry Blossom', price: '$5.50+', toastItemPath: 'item-berry-blossom_325a02f2-ddf5-42af-9e0b-b8e60ba671bc' },
    ],
  },
  {
    id: 'sandwiches', name: 'Sandwiches', note: 'Settle in. Make it a meal.',
    items: [
      { name: 'Amore & Roses', price: '$10.00', toastItemPath: 'item-amore-roses_7eb5b194-2bc0-4ffc-a623-c3331915b0d6' },
      { name: 'Labneh A La Libanaise', price: '$11.00', toastItemPath: 'item-labneh-a-la-libanaise_68bc2b66-0f90-4329-8435-30bf8e2cf072' },
      { name: 'Harissa Egg Salad', price: '$12.00', toastItemPath: 'item-harissa-egg-salad_4dc17399-50e4-4869-8340-7603d8334ecc' },
      { name: 'Baraka Bites', price: '$13.00', toastItemPath: 'item-baraka-bites_97cff4d3-1322-4abe-9e4c-c5d6bb77d159' },
      { name: 'Greek Zest', price: '$14.00', toastItemPath: 'item-greek-zest_eae98337-a0f0-4769-9a55-168b0dbf880a' },
      { name: 'Alaskan Aurora', price: '$15.00', toastItemPath: 'item-alaskan-aurora_2c22cefe-8e8e-4a0e-95a8-4483ed6f24f8' },
    ],
  },
  {
    id: 'desserts', name: 'Desserts', note: 'A sweet reason to stay a little longer.',
    items: [
      { name: 'Turkish Cake', price: '$6.00', toastItemPath: 'item-turkish-cake_45c7d977-b8c0-4dc7-aa90-9f493c2c0676' },
      { name: 'Milk Cake', price: '$7.00', toastItemPath: 'item-milk-cake_27c45d5e-e17f-4348-88f0-1dc97064cd11' },
      { name: 'Tiramisu', price: '$8.00', toastItemPath: 'item-tiramisu_3d0cb335-8561-442e-a981-1c6efc7c0319' },
    ],
  },
];
