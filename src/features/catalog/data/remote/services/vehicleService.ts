import type { VehicleDto } from '../models/vehicleDto';

const mockVehicles: VehicleDto[] = [
  {
    id: '1',
    name: 'Toyota RAV4',
    year: 2024,
    variant: 'XLE Premium AWD',
    category: 'SUV',
    badge: 'Hybrid',
    price: { amount: 32500, currency: 'USD' },
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=450&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1567334719007-5c041c05e94a?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1619767886558-efdc7b9af620?w=120&h=80&fit=crop',
    ],
    specs: {
      transmission: '8-Speed Automatic',
      engine: '2.5L 4-Cylinder',
      horsepower: '203 HP @ 6600 rpm',
      torque: '184 lb-ft @ 5000 rpm',
      drivetrain: 'All-Wheel Drive (AWD)',
      fuelEconomy: '27 City / 33 Hwy mpg',
      passengers: 5,
      safety: 'Toyota Safety Sense',
    },
    description:
      'The 2024 Toyota RAV4 blends versatility, efficiency, and comfort in a sophisticated package. With its hybrid powertrain and All-Wheel Drive capabilities, it delivers confident handling in any condition. The spacious interior and advanced safety features make it the perfect companion for both city commutes and weekend adventures.',
    location: 'Lima, Peru',
  },
  {
    id: '2',
    name: 'BMW Series 3',
    year: 2024,
    variant: '330i Sedan',
    category: 'Sedan',
    badge: 'Premium',
    price: { amount: 44500, currency: 'USD' },
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=120&h=80&fit=crop',
    ],
    specs: {
      transmission: 'Sport Automatic',
      engine: '2.0L Turbo 4-Cylinder',
      horsepower: '255 HP @ 5000 rpm',
      torque: '295 lb-ft @ 1550 rpm',
      drivetrain: 'Rear-Wheel Drive (RWD)',
      fuelEconomy: '26 City / 34 Hwy mpg',
      passengers: 5,
      safety: 'BMW Active Guard',
    },
    description:
      'The BMW 3 Series Sedan sets the benchmark for the premium sports sedan segment. Its refined design, dynamic performance, and cutting-edge technology create an unparalleled driving experience that seamlessly blends luxury with athleticism.',
    location: 'Lima, Peru',
  },
  {
    id: '3',
    name: 'Tesla Model 3',
    year: 2024,
    variant: 'Long Range',
    category: 'Electrico',
    badge: '100% Electric',
    price: { amount: 47740, currency: 'USD' },
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1536700503339-0e4f5a0b85e0?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1619767886558-efdc7b9af620?w=120&h=80&fit=crop',
    ],
    specs: {
      transmission: 'Single-Speed Direct Drive',
      engine: 'Dual Electric Motors',
      horsepower: '346 HP',
      torque: '332 lb-ft',
      drivetrain: 'All-Wheel Drive (Dual Motor)',
      autonomy: '341 mi',
      acceleration: '0-60 mph in 4.2s',
      passengers: 5,
      safety: 'Tesla Autopilot',
    },
    description:
      'The Tesla Model 3 redefines the electric driving experience. With its dual motor all-wheel drive, exceptional range of 341 miles, and cutting-edge Autopilot technology, it delivers a perfect fusion of sustainability, performance, and innovation.',
    location: 'Lima, Peru',
  },
];

export function getVehicles(): VehicleDto[] {
  return mockVehicles;
}
