import { Metadata } from 'next'
import SettingsPage from '../../../../components/SettingsPage/SettingsPage'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
  return <SettingsPage />
}
