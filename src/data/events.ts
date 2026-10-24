import type { CityEvent } from '../types';

export const seedEvents: CityEvent[] = [
  {
    id: 'event-rooftop-jazz',
    title: 'Джаз на крыше старой типографии',
    description:
      'Камерный вечер с молодым квартетом, видом на вечерний город и короткой экскурсией по зданию типографии.',
    category: 'music',
    venue: 'Типография № 7',
    address: 'ул. Советская, 18',
    startsAt: '2026-10-30T19:30:00+03:00',
    price: 1200,
    ageRating: '12+',
    imageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Музыканты выступают на сцене под открытым небом',
    tags: ['живая музыка', 'на крыше'],
  },
  {
    id: 'event-ceramics',
    title: 'Утренний воркшоп по ручной лепке',
    description:
      'Знакомство с глиной для начинающих. Все материалы входят в стоимость, готовую работу можно будет забрать после обжига.',
    category: 'workshop',
    venue: 'Мастерская «Форма»',
    address: 'пер. Тихий, 4',
    startsAt: '2026-10-31T11:00:00+03:00',
    price: 900,
    ageRating: '6+',
    imageUrl:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Руки мастера формируют глиняную чашу',
    tags: ['своими руками', 'для начинающих'],
  },
  {
    id: 'event-architecture-walk',
    title: 'Город в деталях: прогулка по конструктивистскому кварталу',
    description:
      'Архитектор расскажет, как проектировали жилые кварталы сто лет назад и какие детали обычно остаются незамеченными.',
    category: 'outdoors',
    venue: 'Старт у библиотеки',
    address: 'пл. Мира, 2',
    startsAt: '2026-11-01T14:00:00+03:00',
    price: 0,
    ageRating: '12+',
    imageUrl:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Городская улица с историческими зданиями',
    tags: ['прогулка', 'архитектура'],
  },
  {
    id: 'event-small-stage',
    title: 'Спектакль-читка «Последний трамвай»',
    description:
      'Новая пьеса о случайной встрече двух пассажиров ночного маршрута. После показа состоится разговор с драматургом.',
    category: 'theatre',
    venue: 'Малая сцена',
    address: 'ул. Театральная, 9',
    startsAt: '2026-11-02T20:00:00+03:00',
    price: 700,
    ageRating: '16+',
    imageUrl:
      'https://images.unsplash.com/photo-1507924538820-ede94a04019d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Пустая театральная сцена в свете прожекторов',
    tags: ['премьера', 'обсуждение'],
  },
  {
    id: 'event-urban-trees',
    title: 'Лекция «Зачем городу взрослые деревья и почему их нельзя заменить саженцами»',
    description:
      'Биолог и городской исследователь обсудят зелёную инфраструктуру, жару и способы участвовать в жизни своего района.',
    category: 'lecture',
    venue: 'Лекторий «Смена»',
    address: 'наб. Речная, 21',
    startsAt: '2026-11-04T18:30:00+03:00',
    price: 0,
    ageRating: '12+',
    imageUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Высокие деревья в городском парке',
    tags: ['экология', 'город'],
  },
  {
    id: 'event-vinyl-market',
    title: 'Виниловый маркет и открытый диджей-сет',
    description:
      'Независимые магазины и коллекционеры привезут пластинки разных жанров. Вход свободный, регистрация не нужна.',
    category: 'music',
    venue: 'Двор культурного центра',
    address: 'ул. Ленина, 44',
    startsAt: '2026-11-07T13:00:00+03:00',
    price: 0,
    ageRating: '0+',
    imageUrl:
      'https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Проигрыватель и виниловая пластинка',
    tags: ['маркет', 'винил', 'вход свободный'],
  },
];
