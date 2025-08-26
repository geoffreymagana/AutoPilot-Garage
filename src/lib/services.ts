export const serviceCategories = [
  {
    category: 'Routine Maintenance',
    description: 'Essential services to keep your vehicle running smoothly and extend its lifespan.',
    services: [
      { name: 'Standard Oil Change', price: '4500', details: ['Up to 5L semi-synthetic oil', 'New oil filter', 'Fluid top-up'], from: false },
      { name: 'Full Synthetic Oil Change', price: '7000', details: ['Up to 5L full-synthetic oil', 'Premium oil filter', 'Comprehensive fluid check'], from: false },
      { name: 'Tire Rotation & Balancing', price: '2500', details: ['Rotation of all four tires', 'Computerized wheel balancing', 'Tire pressure check'], from: false },
      { name: 'Air & Cabin Filter Replacement', price: '3000', details: ['Improved engine performance', 'Cleaner cabin air', 'OEM-quality filters'], from: false },
    ],
  },
  {
    category: 'Diagnostics & Inspections',
    description: 'Using advanced tools to accurately identify and assess any issues with your vehicle.',
    services: [
      { name: 'Computerized Engine Diagnostics', price: '5000', details: ['OBD-II scan', 'Error code analysis', 'Detailed diagnostic report'], from: false },
      { name: 'Pre-Purchase Vehicle Inspection', price: '8000', details: ['150-point comprehensive check', 'Mechanical & electrical systems', 'Written report with photos'], from: false },
      { name: 'Brake System Inspection', price: '2000', details: ['Pad and rotor measurement', 'Brake fluid check', 'Hydraulic system inspection'], from: false },
    ],
  },
  {
    category: 'Repairs',
    description: 'Expert repairs for all major and minor issues to get you back on the road safely.',
    services: [
      { name: 'Brake Pad & Rotor Replacement', price: '12000', from: true, details: ['Front or rear axle', 'High-quality ceramic pads', 'Machining or replacement of rotors'] },
      { name: 'Suspension & Steering Repair', price: '9500', from: true, details: ['Shock/strut replacement', 'Control arm & bushing service', 'Wheel alignment check'] },
      { name: 'AC System Service & Repair', price: '6500', from: true, details: ['Refrigerant recharge', 'Leak detection', 'Compressor & condenser check'] },
      { name: 'Engine Cooling System Repair', price: '7000', from: true, details: ['Radiator, thermostat, water pump', 'Coolant flush and replacement', 'Pressure testing'] },
    ],
  },
];
