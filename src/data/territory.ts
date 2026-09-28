export interface TerritoryBlock {
  slug: string;
  eyebrow: string;
  title: string;
  text: string[];
  images: string[];
  mediaSide: 'left' | 'right';
}

export const territoryBlocks: TerritoryBlock[] = [
  {
    slug: 'views',
    eyebrow: 'Территория',
    title: 'Виды на море и горы',
    text: [
      'С балконов и террас апарт-отеля открывается панорама на Чёрное море и горы Крыма — от ясного утра до огней вечерней Ялты.',
      'Здесь хочется просто сидеть с чашкой кофе и смотреть, как меняется свет: днём — синева моря и солнце над горным хребтом, вечером — розовый закат, силуэты гор и первые звёзды.',
    ],
    images: [
      '/images/territory/views/1.webp',
      '/images/territory/views/2.webp',
      '/images/territory/views/3.webp',
    ],
    mediaSide: 'right',
  },
];
