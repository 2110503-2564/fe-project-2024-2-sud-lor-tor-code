interface CampgroundItem {
  _id?: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  region: string,
  picture: string,
  dailyrate: number,
  __v?: number,
}
  
interface CampgroundJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CampgroundItem[]
}

interface BookingItem {
  _id: string;
  fullname: string;
  tel: string;
  campground: CampgroundItem;
  bookingDate: Date;
  user: string;
  __v: number;
}

interface BookingJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: BookingItem[]
}