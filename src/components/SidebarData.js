import { FaUserAlt } from 'react-icons/fa'
import { MdDevices } from 'react-icons/md'
import { GoRequestChanges } from 'react-icons/go'
import { GoAlert } from 'react-icons/go'

export const SidebarData = [
  {
    title: 'Użytkownicy',
    path: '/users',
    icon: <FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Sprzęt IT',
    path: '/devices',
    icon: <MdDevices />,
    cName: 'nav-text'
  },
  {
    title: 'Zapotrzebowania',
    path: '/demands',
    icon: <GoRequestChanges />,
    cName: 'nav-text'
  },
  {
    title: 'Zgłoszenia',
    path: '/notifications',
    icon: <GoAlert />,
    cName: 'nav-text'
  }
]