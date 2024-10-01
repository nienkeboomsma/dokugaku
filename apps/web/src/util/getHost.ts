export default function getHost() {
  const otherDevicesAllowed =
    process.env.NEXT_PUBLIC_ALLOW_OTHER_DEVICES === '1' &&
    process.env.NEXT_PUBLIC_HOST_IP &&
    // Some people may accidentally use the sample .env file without changing
    // the placeholders
    process.env.NEXT_PUBLIC_HOST_IP !== '***'

  if (otherDevicesAllowed) return process.env.NEXT_PUBLIC_HOST_IP
  return 'localhost'
}
