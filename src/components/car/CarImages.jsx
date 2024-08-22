import React from 'react'

function CarImages() {
  return (
    <div>
      {/* Car Image Cards */}
      <section id="rentals" className="py-12 bg-gray-100 flex justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1">
              <img src="https://imgd.aeplcdn.com/642x336/n/cw/ec/109123/i4-exterior-right-front-three-quarter.jpeg?isig=0&q=80" alt="Car 1" className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold mb-2">SEDAN</h3>
              <p className="text-gray-600">Comfortable and stylish sedan for your city trips.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1">
              <img src="https://imgd.aeplcdn.com/600x337/n/cw/ec/142515/elevate-exterior-right-front-three-quarter-21.jpeg?isig=0&q=80" alt="Car 2" className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold mb-2">SUV</h3>
              <p className="text-gray-600">Spacious and powerful SUV for your family adventures.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1">
              <img src="https://imgd.aeplcdn.com/600x337/n/cw/ec/159099/swift-exterior-right-front-three-quarter.jpeg?isig=0&q=80" alt="Car 3" className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold mb-2">HATCHBACK</h3>
              <p className="text-gray-600">Enjoy the open road with our stylish Hatchback.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-start-2 md:col-end-3">
              <img src="https://inv.assets.ansira.net/ChromeMultiView/us/WHITE_2023FOV440001_1280_01.jpg" alt="Car 4" className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold mb-2">VAN</h3>
              <p className="text-gray-600">Enjoy the open road with our stylish VAN.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CarImages;
