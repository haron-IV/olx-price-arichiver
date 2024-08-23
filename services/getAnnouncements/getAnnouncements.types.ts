export interface Announcements {
  data: Data[]
  metadata: Metadata
  links: Links
}

export interface Data {
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

export interface Category {
  id: number
  type: string
}

export interface Contact {
  name: string
  phone: boolean
  chat: boolean
  negotiation: boolean
  courier: boolean
}
export interface Delivery {
  rock: Rock
}

export interface Rock {
  offer_id: null
  active: boolean
  mode: string
}

export enum KeyParam {
  M = "m",
  PricePerM = "price_per_m",
}

export interface Location {
  city: City
  district: District
  region: City
}

export interface City {
  id: number
  name: Name
  normalized_name: NormalizedName
}

export enum Name {
  Katowice = "Katowice",
  Śląskie = "Śląskie",
}

export enum NormalizedName {
  Katowice = "katowice",
  Slaskie = "slaskie",
}

export interface District {
  id: number
  name: string
}

export interface Map {
  zoom: number
  lat: number
  lon: number
  radius: number
  show_detailed: boolean
}

export interface Param {
  key: string
  name: string
  type: Type
  value: Value
}

export enum Type {
  Input = "input",
  Price = "price",
  Select = "select",
}

export interface Value {
  key?: string
  label: string
}

export interface Partner {
  code: string
}

export interface Photo {
  id: number
  filename: string
  rotation: number
  width: number
  height: number
  link: string
}

export interface Promotion {
  highlighted: boolean
  urgent: boolean
  top_ad: boolean
  options: string[]
  b2c_ad_page: boolean
  premium_ad_page: boolean
}

export interface Safedeal {
  weight: number
  weight_grams: number
  status: string
  safedeal_blocked: boolean
  allowed_quantity: any[]
}

export interface Shop {
  subdomain: null
}

export interface User {
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

export interface Links {
  self: First
  first: First
}

export interface First {
  href: string
}

export interface Metadata {
  total_elements: number
  promoted: any[]
}
