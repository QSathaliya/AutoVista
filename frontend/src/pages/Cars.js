import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCar, FaFilter, FaSearch, FaStar, FaHeart, FaGasPump, FaCog } from 'react-icons/fa';
import './Cars.css';

export const mockCars = [
  // Maruti Suzuki Cars
  {
    id: 1,
    make: 'Maruti Suzuki',
    model: 'Swift',
    year: 2024,
    price: 649000,
    mileage: 22.38,
    fuelType: 'Petrol',
    transmission: 'Manual / AMT',
    bodyType: 'Hatchback',
    color: 'Red',
    condition: 'New',
    image: 'https://media.umbraco.io/suzuki-gb/vyuhzguv/10816_suzuki_swift_512_r1.jpg',
    engine: '1197 cc Dualjet Petrol',
    power: '80.46 bhp @ 5700 rpm',
    torque: '111.7 Nm @ 4300 rpm',
    features: ['Apple CarPlay', 'Android Auto', 'Push Start', 'LED DRLs', 'Alloy Wheels']
  },
  {
    id: 2,
    make: 'Maruti Suzuki',
    model: 'Baleno',
    year: 2024,
    price: 670000,
    mileage: 22.35,
    fuelType: 'Petrol',
    transmission: 'Manual / CVT',
    bodyType: 'Hatchback',
    color: 'Blue',
    image: 'https://imgd-ct.aeplcdn.com/1056x660/n/1ihrrua_1559469.jpg?q=80',
    engine: '1197 cc K‑Series Dualjet Petrol',
    power: '88 bhp @ 6000 rpm',
    torque: '113 Nm @ 4400 rpm',
    features: ['360° Camera', 'Head‑up Display', 'Connected Car Tech', 'LED Projector Headlamps']
  },
  {
    id: 3,
    make: 'Maruti Suzuki',
    model: 'Grand Vitara',
    year: 2024,
    price: 1142000,
    mileage: 21.11,
    fuelType: 'Petrol / Hybrid',
    transmission: 'Manual / Automatic',
    bodyType: 'SUV',
    color: 'White',
    image: 'https://static.businessworld.in/WhatsApp%20Image%202024-10-08%20at%209.22.23%20PM_20241008212233_original_image_49.webp',
    engine: '1462 cc K15C Petrol (also 1490 cc Hybrid)',
    power: '91.18 bhp @ 5500 rpm',
    torque: '122 Nm @ 4400–4800 rpm',
    features: ['Panoramic Sunroof', 'AWD', 'Hybrid Tech', 'Ventilated Seats']
  },
  {
    id: 4,
    make: 'Maruti Suzuki',
    model: 'Brezza',
    year: 2024,
    price: 869000,
    mileage: 17.8,
    fuelType: 'Petrol / CNG',
    transmission: 'Manual / Automatic',
    bodyType: 'SUV',
    color: 'Red',
    image: 'https://images8.alphacoders.com/125/thumb-1920-1251695.jpg',
    engine: '1462 cc K15C Smart‑Hybrid Petrol',
    power: '102 bhp @ 6000 rpm',
    torque: '138 Nm @ 4300 rpm',
    features: ['Sunroof', 'Connected Car Tech', 'Cruise Control', 'LED DRLs']
  },
  {
    id: 5,
    make: 'Maruti Suzuki',
    model: 'Ciaz',
    year: 2024,
    price: 941000,
    mileage: 20.65,
    fuelType: 'Petrol',
    transmission: 'Manual / CVT',
    bodyType: 'Sedan',
    color: 'Silver',
    image: 'https://wallpapers.com/images/hd/suzuki-ciaz-6ibxcghybzvb363l.jpg',
    engine: '1462 cc K15B Petrol',
    power: '103.25 bhp @ 6000 rpm',
    torque: '138 Nm @ 4400 rpm',
    features: ['Cruise Control', 'Push Start', 'Leather Seats', 'Smart Connectivity']
  },
  {
    id: 6,
    make: 'Maruti Suzuki',
    model: 'Dzire',
    year: 2024,
    price: 684000,
    mileage: 24.79,
    fuelType: 'Petrol / CNG',
    transmission: 'Manual / AMT',
    bodyType: 'Sedan',
    color: 'White',
    image: 'https://www.v3cars.com/media/model-imgs/40109101-Dzire-front-quater-exterior.webp',
    engine: '1197 cc Z12E Petrol',
    power: '80 bhp @ 5700 rpm',
    torque: '111.7 Nm @ 4300 rpm',
    features: ['SmartPlay Studio', 'Auto AC', 'Push Start', 'LED DRLs']
  },

  // Hyundai Cars
  {
    id: 7,
    make: 'Hyundai',
    model: 'i20',
    year: 2024,
    price: 947000,
    mileage: 20,
    fuelType: 'Petrol',
    transmission: 'Manual / IVT',
    bodyType: 'Hatchback',
    color: 'Blue',
    image: 'https://images5.alphacoders.com/115/thumb-1920-1156548.jpg',
    engine: '1197 cc Kappa Petrol',
    power: '87 bhp @ 6000 rpm',
    torque: '114.7 Nm @ 4200 rpm',
    features: ['Digital Cluster', 'Bose Sound', 'BlueLink Connected', 'Sunroof']
  },
  {
    id: 8,
    make: 'Hyundai',
    model: 'Grand i10 NIOS',
    year: 2024,
    price: 748000,
    mileage: 20,
    fuelType: 'Petrol',
    transmission: 'Manual / AMT',
    bodyType: 'Hatchback',
    color: 'Red',
    image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg',
    engine: '1197 cc Kappa Petrol',
    power: '82 bhp @ 6000 rpm',
    torque: '113.75 Nm @ 4200 rpm',
    features: ['Wireless Charging', 'Smart Key', 'DRLs', '8-inch Touchscreen']
  },
  {
    id: 9,
    make: 'Hyundai',
    model: 'Creta',
    year: 2024,
    price: 1083000,
    mileage: 17.4,
    fuelType: 'Petrol',
    transmission: 'Manual / Automatic',
    bodyType: 'SUV',
    color: 'Atlas White',
    image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-front-1.jpg',
    engine: '1497 cc MPi Petrol',
    power: '113 bhp @ 6300 rpm',
    torque: '144 Nm @ 4500 rpm',
    features: ['ADAS', 'Panoramic Sunroof', 'BlueLink', 'Bose Sound']
  },
  {
    id: 10,
    make: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    price: 3000000,
    mileage: 18.4,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Black',
    image: 'https://images8.alphacoders.com/673/thumb-1920-673573.jpg',
    engine: '1999 cc CRDi Diesel',
    power: '185 bhp @ 4000 rpm',
    torque: '420 Nm @ 1750–2750 rpm',
    features: ['ADAS', 'AWD', 'Premium Interior', 'Panoramic Sunroof']
  },
  {
    id: 11,
    make: 'Hyundai',
    model: 'Verna',
    year: 2024,
    price: 1400000,
    mileage: 20.7,
    fuelType: 'Petrol',
    transmission: 'Manual / CVT',
    bodyType: 'Sedan',
    color: 'Silver',
    image: 'https://images4.alphacoders.com/130/thumb-1920-1307742.jpg',
    engine: '1497 cc MPi Petrol',
    power: '115 bhp @ 6300 rpm',
    torque: '144 Nm @ 4500 rpm',
    features: ['ADAS', 'Digital Cluster', 'Ventilated Seats', 'Bose Sound']
  },
  {
    id: 12,
    make: 'Hyundai',
    model: 'Aura',
    year: 2024,
    price: 850000,
    mileage: 20.0,
    fuelType: 'Petrol',
    transmission: 'Manual / AMT',
    bodyType: 'Sedan',
    color: 'White',
    image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Aura/gallery/pc/auragallerypc_1.jpg',
    engine: '1197 cc Kappa Petrol',
    power: '82 bhp @ 6000 rpm',
    torque: '113.75 Nm @ 4200 rpm',
    features: ['Wireless Charging', '8-inch Display', 'Voice Recognition', 'LED DRLs']
  },
  {
    id: 13,
    make: 'Hyundai',
    model: 'Venue',
    year: 2024,
    price: 1100000,
    mileage: 24.2,
    fuelType: 'Petrol',
    transmission: 'Manual / DCT',
    bodyType: 'Compact SUV',
    color: 'Denim Blue',
    image: 'https://images.pexels.com/photos/15001927/pexels-photo-15001927/free-photo-of-blue-hyundai-venue-parked-on-a-parking-lot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    engine: '1493 cc MPi Petrol',
    power: '115 bhp @ 6300 rpm',
    torque: '144 Nm @ 4500 rpm',
    features: ['BlueLink', 'Air Purifier', 'Drive Modes', 'Wireless Charging']
  },
  {
    id: 14,
    make: 'Hyundai',
    model: 'i20',
    year: 2024,
    price: 900000,
    mileage: 20,
    fuelType: 'Petrol',
    transmission: 'Manual / IVT',
    bodyType: 'Hatchback',
    color: 'Starry Night',
    image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/highlights_innerkv_pc.jpg',
    engine: '1197 cc Kappa Petrol',
    power: '87 bhp @ 6000 rpm',
    torque: '114.7 Nm @ 4200 rpm',
    features: ['BlueLink', 'Bose Sound', 'Sunroof', 'LED Lights']
  },
  {
    id: 15,
    make: 'Hyundai',
    model: 'Verna',
    year: 2024,
    price: 1500000,
    mileage: 20.7,
    fuelType: 'Petrol',
    transmission: 'Manual / CVT',
    bodyType: 'Sedan',
    color: 'Abyss Black',
    image: 'https://images4.alphacoders.com/130/thumb-1920-1307742.jpg',
    engine: '1497 cc MPi Petrol',
    power: '115 bhp @ 6300 rpm',
    torque: '144 Nm @ 4500 rpm',
    features: ['ADAS', 'Ventilated Seats', 'BlueLink', 'Bose Sound']
  },

  // Toyota Cars
  {
    id: 16,
    make: 'Toyota',
    model: 'Glanza',
    year: 2024,
    price: 690000,
    mileage: 22.94,
    fuelType: 'Petrol',
    transmission: 'Manual / AMT',
    bodyType: 'Hatchback',
    color: 'Red',
    image: 'https://static3.toyotabharat.com/images/showroom/glanza/new/colors/car-white.png',
    engine: '1197 cc Petrol',
    power: '88.50 bhp @ 6000 rpm',
    torque: '113 Nm @ 4400 rpm',
    features: ['Head‑up Display', 'Connected Car Tech', '360° Camera', 'Push Start']
  },
  {
    id: 17,
    make: 'Toyota',
    model: 'Rumion',
    year: 2024,
    price: 849000,
    mileage: 23.47,
    fuelType: 'Petrol',
    transmission: 'Manual / CVT',
    bodyType: 'Hatchback',
    color: 'Blue',
    image: 'https://cdn.cars24.com/prod/new-car-cms/Rumion_Feature_Image_08ede3a5d9.png',
    engine: '1198 cc Dual VVT‑i Petrol',
    power: '89 bhp @ 6000 rpm',
    torque: '113 Nm @ 4400 rpm',
    features: ['Smart Playcast', 'Auto AC', 'Cruise Control', 'Alloy Wheels']
  },
  {
    id: 18,
    make: 'Toyota',
    model: 'Fortuner',
    year: 2024,
    price: 4000000,
    mileage: 14.96,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Pearl White',
    image: 'https://mrwallpaper.com/images/hd/toyota-fortuner-custom-jet-black-color-przv6k586qsn6gbf.jpg',
    engine: '2755 cc Diesel',
    power: '201 bhp @ 3400 rpm',
    torque: '500 Nm @ 1600–2800 rpm',
    features: ['4x4', 'Connected Car', 'JBL Sound', 'Drive Modes']
  },
  {
    id: 19,
    make: 'Toyota',
    model: 'Innova Hycross',
    year: 2024,
    price: 2500000,
    mileage: 19.12,
    fuelType: 'Hybrid',
    transmission: 'e‑CVT',
    bodyType: 'MPV',
    color: 'Platinum White',
    image: 'https://www.team-bhp.com/sites/default/files/styles/amp_high_res/public/innova-hycross-review_24.jpg',
    engine: '2487 cc Hybrid',
    power: '186 bhp total',
    torque: '227 Nm (ICE)',
    features: ['ADAS', 'Panoramic Sunroof', 'Connected Car', 'Captain Seats']
  },
  {
    id: 20,
    make: 'Toyota',
    model: 'Urban Cruiser Hyryder',
    year: 2024,
    price: 1800000,
    mileage: 23.35,
    fuelType: 'Hybrid',
    transmission: 'e‑CVT',
    bodyType: 'SUV',
    color: 'Cafe White',
    image: 'https://images.hindustantimes.com/auto/img/2024/11/26/1600x900/Toyota_Urban_Cruiser_Hyryder_1732603021529_1732603021673.jpeg',
    engine: '1462 cc Smart‑Hybrid Petrol',
    power: '91.18 bhp @ 5500 rpm',
    torque: '122 Nm @ 4400 rpm',
    features: ['Hybrid Tech', 'Panoramic Sunroof', 'Connected Car', '360° Camera']
  },
  {
    id: 21,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 4500000,
    mileage: 21.37,
    fuelType: 'Hybrid',
    transmission: 'e‑CVT',
    bodyType: 'Sedan',
    color: 'Platinum White',
    image: 'https://images3.alphacoders.com/856/thumb-1920-856704.jpg',
    engine: '2487 cc Hybrid',
    power: '208 bhp total',
    torque: '224 Nm (ICE)',
    features: ['Hybrid Tech', 'HUD', 'JBL Sound', 'Ventilated Seats']
  },

  // Tata Cars
  {
    id: 22,
    make: 'Tata',
    model: 'Altroz',
    year: 2024,
    price: 690000,
    mileage: 19.33,
    fuelType: 'Diesel',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    color: 'Blue',
    image: 'https://www.v3cars.com/media/model-imgs/1664865463-Tata%20Altroz%20Dark.webp',
    engine: '1497 cc Revotron Diesel',
    power: '88.76 bhp @ 4000 rpm',
    torque: '200 Nm @ 1250–3000 rpm',
    features: ['Connected Car Tech', 'Digital Cluster', 'Cruise Control', 'IRA Connected']
  },
  {
    id: 23,
    make: 'Tata',
    model: 'Tiago',
    year: 2024,
    price: 700000,
    mileage: 23.84,
    fuelType: 'Petrol',
    transmission: 'Manual / AMT',
    bodyType: 'Hatchback',
    color: 'Red',
    image: 'https://images.carandbike.com/car-images/large/tata/tiago/tata-tiago.jpg?v=69',
    engine: '1199 cc Revotron Petrol',
    power: '85 bhp @ 6000 rpm',
    torque: '113 Nm @ 3300 rpm',
    features: ['Harman Audio', 'Auto AC', 'Digital Cluster', 'Connected Car']
  },
  {
    id: 24,
    make: 'Tata',
    model: 'Harrier',
    year: 2024,
    price: 2300000,
    mileage: 17.5,
    fuelType: 'Diesel',
    transmission: 'Automatic / Manual',
    bodyType: 'SUV',
    color: 'Dark Edition',
    image: 'https://www.netcarshow.com/Tata-Harrier-2024-wallpaper.jpg',
    engine: '1956 cc Kryotec Diesel',
    power: '168 bhp @ 3750 rpm',
    torque: '350 Nm @ 1750–2500 rpm',
    features: ['Panoramic Sunroof', 'ADAS', 'JBL Sound', 'Air Purifier']
  },
  {
    id: 25,
    make: 'Tata',
    model: 'Safari',
    year: 2024,
    price: 2500000,
    mileage: 17.5,
    fuelType: 'Diesel',
    transmission: 'Automatic / Manual',
    bodyType: 'SUV',
    color: 'White',
    image: 'https://cars.tatamotors.com.np/images/safari/new-gallery/adventure-7.jpg',
    engine: '1956 cc Kryotec Diesel',
    power: '168 bhp @ 3750 rpm',
    torque: '350 Nm @ 1750–2500 rpm',
    features: ['ADAS', 'Captain Seats', 'Panoramic Roof', 'JBL Premium Audio']
  },
  {
    id: 26,
    make: 'Tata',
    model: 'Tigor',
    year: 2024,
    price: 800000,
    mileage: 20.1,
    fuelType: 'Petrol',
    transmission: 'Manual / AMT',
    bodyType: 'Sedan',
    color: 'Blue',
    image: 'https://strapi-file-uploads.parkplus.io/2025_Tata_Tigor_s_Top_End_Variant_A_Fresh_Look_at_Premium_Features_f74e0d9724.webp',
    engine: '1199 cc Revotron Petrol',
    power: '85 bhp @ 6000 rpm',
    torque: '113 Nm @ 3300 rpm',
    features: ['Connected Car', 'Auto AC', 'Digital Cluster', 'Harman Audio']
  },
  {
    id: 27,
    make: 'Tata',
    model: 'Tigor EV',
    year: 2024,
    price: 1300000,
    mileage: 250,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Teal Blue',
    image: 'https://media.assettype.com/indulgexpress%2Fimport%2F2021%2F9%2F18%2Foriginal%2FTataTigorEV.jpg?w=1024&auto=format%2Ccompress&fit=max',
    engine: '26 kWh Electric Motor',
    power: '74 bhp',
    torque: '170 Nm',
    features: ['Connected Car', 'Fast Charging', 'Digital Display', 'Multi Drive Modes']
  },

  // Honda Cars
  {
    id: 28,
    make: 'Honda',
    model: 'Jazz',
    year: 2024,
    price: 801000,
    mileage: 17.1,
    fuelType: 'Petrol',
    transmission: 'Manual / Automatic',
    bodyType: 'Hatchback',
    color: 'Red',
    image: 'https://img.autocarindia.com/Galleries/20191023111054_2020-Honda-Jazz-rear-front.jpg?w=736&h=488&q=75&c=1',
    engine: '1199 cc i‑VTEC Petrol',
    power: '88.50 bhp @ 6000 rpm',
    torque: '110 Nm @ 4800 rpm',
    features: ['Magic Seats', 'Paddle Shifters', 'Cruise Control', 'Honda Connect']
  },
  {
    id: 29,
    make: 'Honda',
    model: 'Amaze',
    year: 2024,
    price: 850000,
    mileage: 18.6,
    fuelType: 'Petrol',
    transmission: 'Manual / CVT',
    bodyType: 'Sedan',
    color: 'White',
    image: 'https://www.financialexpress.com/wp-content/uploads/2021/08/new-honda-amaze-facelift-price.jpg',
    engine: '1198 cc i‑VTEC Petrol',
    power: '88.6 bhp @ 6000 rpm',
    torque: '110 Nm @ 4800 rpm',
    features: ['Cruise Control', 'Paddle Shifters', 'Auto AC', 'Honda Connect']
  },
  {
    id: 30,
    make: 'Honda',
    model: 'Elevate',
    year: 2024,
    price: 1800000,
    mileage: 17.1,
    fuelType: 'Petrol',
    transmission: 'CVT',
    bodyType: 'SUV',
    color: 'Phoenix Orange',
    image: 'https://c.ndtvimg.com/2025-02/g7edipig_honda-elevate_625x300_25_February_25.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=800',
    engine: '1498 cc i‑VTEC Petrol',
    power: '121 hp @ 6000 rpm',
    torque: '145 Nm @ 4600 rpm',
    features: ['Honda Sensing', 'Wireless Charging', 'Sunroof', 'Connected Tech']
  },
  {
    id: 31,
    make: 'Honda',
    model: 'WR-V',
    year: 2024,
    price: 1200000,
    mileage: 18.4,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'SUV',
    color: 'Blue',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/2022_Honda_WR-V_RS_with_Honda_Sensing_%28Indonesia%29_front_view.jpg',
    engine: '1199 cc i‑VTEC Petrol',
    power: '88.50 bhp @ 6000 rpm',
    torque: '110 Nm @ 4800 rpm',
    features: ['Sunroof', 'LED Lights', 'Honda Connect', 'Cruise Control']
  },
  {
    id: 32,
    make: 'Honda',
    model: 'City',
    year: 2024,
    price: 1500000,
    mileage: 18.0,
    fuelType: 'Petrol',
    transmission: 'CVT',
    bodyType: 'Sedan',
    color: 'White',
    image: 'https://cdn.wallpapersafari.com/71/61/al5z92.jpg',
    engine: '1498 cc i‑DTEC Diesel / i‑VTEC Petrol',
    power: '118.46 bhp @ 3600 rpm (Diesel) / 121 hp @ 6600 rpm (Petrol)',
    torque: '260 Nm @ 1750 rpm (Diesel) / 145 Nm @ 4600 rpm (Petrol)',
    features: ['Sunroof', 'Lane Watch', 'Wireless Charging', 'Connected Features']
  },
  {
    id: 33,
    make: 'Honda',
    model: 'City Hybrid',
    year: 2024,
    price: 2000000,
    mileage: 27.5,
    fuelType: 'Hybrid',
    transmission: 'e‑CVT',
    bodyType: 'Sedan',
    color: 'Platinum White',
    image: 'https://wallpapercave.com/wp/wp1972480.jpg',
    engine: '1498 cc i‑MMD Hybrid',
    power: '107 hp @ 6000 rpm (Petrol) + 80 kW Electric',
    torque: '131 Nm @ 4500–5000 rpm (Petrol) + 253 Nm Electric',
    features: ['Honda Sensing', 'e:HEV Tech', 'Connected Car', 'Lane Watch']
  },

  // Mahindra Cars
  {
    id: 34,
    make: 'Mahindra',
    model: 'XUV700',
    year: 2024,
    price: 1399000,
    mileage: 16.57,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Electric Blue',
    image: 'https://cdn.cartoq.com/photos/mahindra-xuv700_exterior_front-left-side_ad3317f6.webp',
    engine: '2198 cc mHAWK Diesel',
    power: '182 bhp @ 3500 rpm',
    torque: '450 Nm @ 1750–2800 rpm',
    features: ['ADAS', 'Panoramic Sunroof', 'AdrenoX Connect', 'Sony 3D Sound']
  },
  {
    id: 35,
    make: 'Mahindra',
    model: 'Scorpio N',
    year: 2024,
    price: 1734000,
    mileage: 16.8,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Deep Forest',
    image: 'https://wallpapercave.com/wp/wp13303747.jpg',
    engine: '2184 cc mHAWK Diesel',
    power: '140 bhp @ 3750 rpm',
    torque: '320 Nm @ 1600–2800 rpm',
    features: ['4XPLOR', 'Sony Sound', 'Connected Features', 'Terrain Modes']
  },
  {
    id: 36,
    make: 'Mahindra',
    model: 'XUV300',
    year: 2024,
    price: 1200000,
    mileage: 18.4,
    fuelType: 'Petrol',
    transmission: 'Manual / AMT',
    bodyType: 'Compact SUV',
    color: 'Red Rage',
    image: 'https://www.carbodydesign.com/media/2019/06/Mahindra-XUV-300-01.jpg',
    engine: '1197 cc TGDi Petrol',
    power: '110 bhp @ 5000 rpm',
    torque: '200 Nm @ 2000–3000 rpm',
    features: ['Sunroof', 'Connected Car', 'Dual Zone AC', 'BlueSense Plus']
  },
  {
    id: 37,
    make: 'Mahindra',
    model: 'Thar',
    year: 2024,
    price: 1800000,
    mileage: 13.6,
    fuelType: 'Petrol',
    transmission: 'Manual / Automatic',
    bodyType: 'Off‑Road SUV',
    color: 'Galaxy Grey',
    image: 'https://wallpapers.com/images/high/red-mahindra-thar-2021-imyeaqdsnntacoal.webp',
    engine: '1999 cc mStallion Petrol',
    power: '150 bhp @ 5000 rpm',
    torque: '300 Nm @ 1750 rpm',
    features: ['4x4', 'Adventure Stats', 'Cruise Control', 'Drizzle Resistant']
  },

  // Kia Cars
  {
    id: 38,
    make: 'Kia',
    model: 'Seltos',
    year: 2024,
    price: 1113000,
    mileage: 17.0,
    fuelType: 'Petrol / Diesel',
    transmission: 'Manual / CVT / DCT / IMT',
    bodyType: 'SUV',
    color: 'Imperial Blue',
    image: 'https://images.unsplash.com/photo-1659406189166-7c17fe5df12a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    engine: '1497 cc Smartstream Petrol',
    power: '113 bhp @ 6300 rpm',
    torque: '144 Nm @ 4500 rpm',
    features: ['ADAS', 'Panoramic Display', 'UVO Connect', 'Bose Sound']
  },
  {
    id: 39,
    make: 'Kia',
    model: 'Sonet',
    year: 2024,
    price: 800000,
    mileage: 24.1,
    fuelType: 'Diesel / Petrol',
    transmission: 'Manual / Automatic',
    bodyType: 'Compact SUV',
    color: 'Red',
    image: 'https://images4.alphacoders.com/116/thumb-1920-1167871.jpg',
    engine: '1493 cc U2 Diesel / 1497 cc Smartstream Petrol',
    power: '115 bhp @ 4000 rpm (Diesel) / 113 bhp @ 6300 rpm (Petrol)',
    torque: '250 Nm @ 1500–2750 rpm (Diesel) / 144 Nm @ 4500 rpm (Petrol)',
    features: ['UVO Connect', 'Ventilated Seats', 'Bose Sound', 'Drive Modes']
  },
  {
    id: 40,
    make: 'Kia',
    model: 'Carens',
    year: 2024,
    price: 1060000,
    mileage: 15.0,
    fuelType: 'Petrol / Diesel',
    transmission: 'Manual / Automatic',
    bodyType: 'MPV',
    color: 'Imperial Blue',
    image: 'https://wallpapercave.com/wp/wp11403516.jpg',
    engine: '1497 cc Smartstream Petrol / 1493 cc Diesel',
    power: '115 bhp @ 6300 rpm (Petrol) / 113.45 bhp @ 4000 rpm (Diesel)',
    torque: '144 Nm @ 4500 rpm (Petrol) / 250 Nm @ 1500–2750 rpm (Diesel)',
    features: ['6 Airbags', 'UVO Connect', 'Ventilated Seats', 'Bose Sound']
  },
  {
    id: 41,
    make: 'Kia',
    model: 'EV6',
    year: 2024,
    price: 6590000,
    mileage: 663,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Electric SUV',
    color: 'Moonscape',
    image: 'https://images3.alphacoders.com/122/thumb-1920-1227230.jpg',
    engine: '84 kWh Battery + Electric Motor',
    power: '321 bhp',
    torque: '605 Nm',
    features: ['ADAS', 'AR HUD', 'Vehicle to Load', 'Meridian Sound']
  }
];


const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    priceRange: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    color: '',
    condition: ''
  });

  // Filter options
  const filterOptions = {
    make: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Toyota', 'Honda', 'Kia', 'MG', 'Volkswagen', 'Skoda'],
    model: ['Swift', 'i20', 'Nexon', 'XUV700', 'Fortuner', 'City', 'Seltos', 'Hector', 'Taigun', 'Kushaq'],
    year: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
    priceRange: ['Under ₹5 Lakhs', '₹5-10 Lakhs', '₹10-15 Lakhs', '₹15-20 Lakhs', '₹20-30 Lakhs', 'Above ₹30 Lakhs'],
    mileage: ['Under 10,000 km', '10,000-30,000 km', '30,000-50,000 km', '50,000-80,000 km', 'Above 80,000 km'],
    fuelType: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'],
    transmission: ['Manual', 'Automatic', 'AMT', 'CVT', 'DCT'],
    bodyType: ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'],
    color: ['White', 'Black', 'Silver', 'Grey', 'Red', 'Blue'],
    condition: ['New', 'Used', 'Certified Pre-Owned']
  };

  useEffect(() => {
    // Simulate API call to fetch cars
    setTimeout(() => {
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    let filtered = [...cars];
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(car => {
          if (key === 'priceRange') {
            const [min, max] = value.split(' - ').map(v => {
              const num = v.replace(/[^0-9]/g, '');
              return num.includes('Lakhs') ? parseInt(num) * 100000 : parseInt(num);
            });
            return car.price >= min && (!max || car.price <= max);
          }
          if (key === 'mileage') {
            const [min, max] = value.split(' - ').map(v => parseInt(v.replace(/[^0-9]/g, '')));
            return car.mileage >= min && (!max || car.mileage <= max);
          }
          return car[key] === value;
        });
      }
    });

    setFilteredCars(filtered);
  };

  const resetFilters = () => {
    setFilters({
      make: '',
      model: '',
      year: '',
      priceRange: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      bodyType: '',
      color: '',
      condition: ''
    });
    setFilteredCars(cars);
  };

  // Format price in Indian Rupees using Indian numbering format (lakh, crore)
  const formatPrice = (price) => {
    if (price >= 10000000) {
      // Format as Crore (7+ digits)
      return `₹${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      // Format as Lakhs (5-7 digits)
      return `₹${(price / 100000).toFixed(2)} Lakhs`;
    } else {
      // Indian number format
      return price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      });
    }
  };

  return (
    <div className="cars-page">
      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-header">
          <h2>
            <FaFilter /> Filter Vehicles
          </h2>
          <button className="reset-filters" onClick={resetFilters}>
            Reset All
          </button>
        </div>
        
        <div className="filter-grid">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key} className="filter-group">
              <label>
                {key === 'priceRange' ? 'Price Range' :
                 key === 'bodyType' ? 'Body Type' :
                 key === 'fuelType' ? 'Fuel Type' :
                 key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <select
                value={filters[key]}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="filter-select"
                aria-label={`Select ${key}`}
              >
                <option value="">
                  {key === 'make' ? 'All Brands' :
                   key === 'model' ? 'All Models' :
                   key === 'year' ? 'All Years' :
                   key === 'priceRange' ? 'Any Price' :
                   key === 'mileage' ? 'Any Mileage' :
                   key === 'fuelType' ? 'Any Fuel Type' :
                   key === 'transmission' ? 'Any Transmission' :
                   key === 'bodyType' ? 'Any Body Type' :
                   key === 'color' ? 'Any Color' :
                   key === 'condition' ? 'Any Condition' :
                   `All ${key}`}
                </option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="filter-actions">
          <button className="apply-filters" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="cars-grid">
        {loading ? (
          <div className="loading">Loading cars...</div>
        ) : filteredCars.length === 0 ? (
          <div className="no-results">
            <h3>No cars found matching your criteria</h3>
            <button onClick={resetFilters}>Reset Filters</button>
          </div>
        ) : (
          filteredCars.map(car => (
            <motion.div
              key={car.id}
              className="car-card"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Image Section */}
              <div className="car-image-container">
                <img 
                  src={car.image} 
                  alt={`${car.make} ${car.model}`} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                  }}
                />
                
                {/* Fuel Type Badge */}
                <div className="fuel-type-badge">
                  <span className={`badge-content ${car.fuelType.toLowerCase()}`}>
                    {car.fuelType.toUpperCase()}
                  </span>
                </div>
                
                {/* New Badge if applicable */}
                {car.condition === 'New' && <div className="car-badge new-badge">NEW</div>}
              </div>
              
              {/* Card Content */}
              <div className="car-info">
                {/* Car Name */}
                <h3 
                  className="car-title" 
                  title={`${car.make} ${car.model}`}
                  style={{ color: '#000000', textShadow: 'none' }}
                >
                  {car.make} {car.model} <span className="car-year" style={{ color: '#444444' }}>{car.year}</span>
                </h3>
                
                {/* Price */}
                <p className="car-price">
                  <span className="rupee-icon">₹</span>
                  {car.price >= 100000 ? 
                    `${(car.price / 100000).toFixed(2)} Lakh` : 
                    car.price.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
                
                {/* View Details Button */}
                <Link to={`/cars/${car.id}`} className="view-detail-btn">View Details</Link>
              </div>
            </motion.div>
          ))
        )}
      </section>
    </div>
  );
};

export default Cars;