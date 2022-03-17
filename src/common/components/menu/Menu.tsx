import React from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import css from './menu.module.scss'
import IconCross from 'assets/icons/cross.svg'
import Logo from 'assets/images/logo.svg'
import HamburgerIcon from 'assets/icons/menu.svg'
import Link from 'common/components/link'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'

const menuItems = [
  {
    text: 'About',
    url: '#about',
  },
  {
    text: 'Notion',
    url: 'https://devconnect.org',
  },
  {
    text: 'FAQ',
    url: '#faq',
  },
  {
    text: 'Devconnect',
    url: 'https://devconnect.org',
  },
]

const DesktopNavigation = () => {
  return (
    <div className={css['desktop-navigation']}>
      {menuItems.map(menuItem => {
        if (menuItem.url.startsWith('#')) {
          return (
            <AnchorLink key={menuItem.text} href={menuItem.url}>
              {menuItem.text}
            </AnchorLink>
          )
        }

        return (
          <Link key={menuItem.text} href={menuItem.url}>
            {menuItem.text}
          </Link>
        )
      })}
    </div>
  )
}

const MobileNavigation = () => {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!mounted) return false

  return (
    <div className={css['mobile-menu']}>
      <div className={css['foldout-toggle']}>
        <div className={css['icon']} onClick={() => setOpen(true)}>
          <HamburgerIcon className="large-text-em" />
        </div>
      </div>

      {createPortal(
        <div className={`${open ? css['open'] : ''} ${css['foldout']}`}>
          <div className={`${css['foldout-toggle']} clear`}>
            {/* <p className="uppercase bold underline">Devconnect</p> */}
            {/* ahhh */}
            <div className={css['icon']} onClick={() => setOpen(false)}>
              <IconCross />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

const Menu = () => {
  return (
    <div className={`section`}>
      <div className={css['menu-container']}>
        <div className={css['left']}>
          <Logo />
          <p className={css['title']}>
            UX
            <br />
            UNCONF
            <br />
            <span>22 —</span>
          </p>
        </div>
        <div className={css['right']}>
          <DesktopNavigation />
          <MobileNavigation />
        </div>
      </div>
    </div>
  )
}

export default Menu
