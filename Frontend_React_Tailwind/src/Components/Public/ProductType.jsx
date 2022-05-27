export default function ProductType() {
  return (
    <a href="#" class="flex flex-wrap place-content-center overflow-hidden">
      {Array.from({ length: 12 }, (index, val) =>
          <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            {/* Image */}
            <img className="h-40 object-cover rounded-xl h-40 object-cover rounded-xl" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt />
            <div className="p-2">
              {/* Heading */}
              <h2 className="font-bold text-lg mb-2 ">Gaming</h2>
              {/* Description */}
              <p className="text-sm text-gray-600">Laptop chuyên game, đồ họa</p>
            </div>
            {/* CTA */}
          </div>
      )}


    </a>



  )

};