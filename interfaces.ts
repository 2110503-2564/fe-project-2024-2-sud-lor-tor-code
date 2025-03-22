interface CampgroundItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  region: string,
  picture: string,
  dailyrate: number,
  __v: number,
}
  
interface CampgroundJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CampgroundItem[]
}

interface BookingItem {
  nameLastname: string;
  tel: string;
  campground: string;
  bookDate: string;
}