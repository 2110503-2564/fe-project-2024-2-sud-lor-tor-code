export default function CampgroundDetail({campgroundDetail}:{campgroundDetail:any}) {

    return (
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-amber-300 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/50 rounded-bl-full"></div>
          
          <div className="p-6 relative z-10">
            <h1 className="text-2xl font-semibold text-amber-800 mb-4">
              {campgroundDetail.data.name}
            </h1>
            
            <div className="border-b border-gray-200 my-4"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
              <div className="md:col-span-4">
                <div className="w-full h-48 bg-amber-100/70 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Camp Image</span>
                </div>
              </div>
              
              <div className="md:col-span-8 md:pl-4 text-left">
                <div className="flex mb-3">
                  <span className="w-28 text-amber-800 font-medium">Name:</span>
                  <span>{campgroundDetail.data.name}</span>
                </div>
                
                <div className="flex mb-3">
                  <span className="w-28 text-amber-800">Address:</span>
                  <span>{campgroundDetail.data.address}</span>
                </div>
                
                <div className="flex mb-3">
                  <span className="w-28 text-amber-800">District:</span>
                  <span>{campgroundDetail.data.district}</span>
                </div>
                
                <div className="flex mb-3">
                  <span className="w-28 text-amber-800">Postal Code:</span>
                  <span>{campgroundDetail.data.postalcode}</span>
                </div>
                
                <div className="flex mb-3">
                  <span className="w-28 text-amber-800">Tel:</span>
                  <span>{campgroundDetail.data.tel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}