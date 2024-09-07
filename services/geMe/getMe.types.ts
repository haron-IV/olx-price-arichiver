export interface Me {
  data: Data
}

export interface Data {
  id: number
  uuid: null
  created: Date
  last_login: Date
  is_business: boolean
  name: string
  person: null
  show_photo: boolean
  user_photo: null
  social_network_account_type: null
  is_online: boolean
  last_seen: Date
  user_ads_url: string
  position: null
  message_response_time: MessageResponseTime
  type: string
  protect_phone_in_categories: number[]
  email: string
  sms_phone: null
  sms_verification_phone: null
  sms_verification_status: string
  is_restricted: boolean
  phone: null
  language: string
  location: Location
  banner_desktop: string
  banner_mobile: string
}

export interface Location {
  region: null
  city: null
  district: null
}

export interface MessageResponseTime {
  time: null
  text: null
}
