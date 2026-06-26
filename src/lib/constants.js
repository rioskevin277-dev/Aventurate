export const WHATSAPP_NUMBER = "+573212798126";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=¡Hola!%20Quiero%20información%20sobre%20las%20experiencias%20en%20Marulanda`;
export const EMAIL = "hola@larutadelalana.co";
export const INSTAGRAM = "@aventuratemarulanda";
export const INSTAGRAM_URL = "https://www.instagram.com/aventuratemarulanda/";
export const SITE_NAME = "La Ruta de la Lana";

const INTEREST_VALUES = [
  { value: 'bosques-niebla', tKey: 'contact.form.interestsOptions.0.label' },
  { value: 'palma-cera', tKey: 'contact.form.interestsOptions.1.label' },
  { value: 'ovinocultura', tKey: 'contact.form.interestsOptions.2.label' },
  { value: 'paquete-completo', tKey: 'contact.form.interestsOptions.3.label' },
]

const GROUP_SIZE_VALUES = [
  { value: '', tKey: 'contact.form.groupSizeOptions.0.label' },
  { value: '1-2', tKey: 'contact.form.groupSizeOptions.1.label' },
  { value: '3-5', tKey: 'contact.form.groupSizeOptions.2.label' },
  { value: '6-8', tKey: 'contact.form.groupSizeOptions.3.label' },
]

export function createInterestOptions(t) {
  return INTEREST_VALUES.map(({ value, tKey }) => ({
    value,
    label: t(tKey),
  }))
}

export function createGroupSizeOptions(t) {
  return GROUP_SIZE_VALUES.map(({ value, tKey }) => ({
    value,
    label: t(tKey),
  }))
}
