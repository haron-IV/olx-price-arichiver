export interface Announcements {
  data: Data[]
  metadata: Metadata
  links: Links
}

interface Data {
  id: number
  url: string
  title: string
  last_refresh_time: Date
  created_time: Date
  valid_to_time: Date
  pushup_time: Date | null
  description: string
  promotion: Promotion
  params: Param[]
  key_params: KeyParam[]
  business: boolean
  user: User
  status: string
  contact: Contact
  map: Map
  location: Location
  photos: Photo[]
  partner: Partner | null
  external_url?: string
  category: Category
  delivery: Delivery
  safedeal: Safedeal
  shop: Shop
  offer_type: string
  omnibus_pushup_time?: Date
}

interface Category {
  id: number
  type: string
}

interface Contact {
  name: string
  phone: boolean
  chat: boolean
  negotiation: boolean
  courier: boolean
}
interface Delivery {
  rock: Rock
}

interface Rock {
  offer_id: null
  active: boolean
  mode: string
}

enum KeyParam {
  M = "m",
  PricePerM = "price_per_m",
}

interface Location {
  city: City
  district: District
  region: City
}

interface City {
  id: number
  name: string
  normalized_name: string
}

interface District {
  id: number
  name: string
}

interface Map {
  zoom: number
  lat: number
  lon: number
  radius: number
  show_detailed: boolean
}

interface Param {
  key: string
  name: string
  type: Type
  value: Value
}

enum Type {
  Input = "input",
  Price = "price",
  Select = "select",
}

interface Value {
  key?: string
  label: string
}

interface Partner {
  code: string
}

interface Photo {
  id: number
  filename: string
  rotation: number
  width: number
  height: number
  link: string
}

interface Promotion {
  highlighted: boolean
  urgent: boolean
  top_ad: boolean
  options: string[]
  b2c_ad_page: boolean
  premium_ad_page: boolean
}

interface Safedeal {
  weight: number
  weight_grams: number
  status: string
  safedeal_blocked: boolean
  allowed_quantity: any[]
}

interface Shop {
  subdomain: null
}

interface User {
  id: number
  created: Date
  other_ads_enabled: boolean
  name: string
  logo: null
  logo_ad_page: null
  social_network_account_type: null | string
  photo: null | string
  banner_mobile: string
  banner_desktop: string
  company_name: string
  about: string
  b2c_business_page: boolean
  is_online: boolean
  last_seen: Date
  seller_type: null
  uuid: string
}

interface Links {
  self: First
  first: First
}

interface First {
  href: string
}

interface Metadata {
  total_elements: number
  promoted: any[]
}
