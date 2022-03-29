import React from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Copyright } from 'pages'
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
    text: 'FAQ',
    url: '#faq',
  },
  {
    text: 'Devconnect',
    url: 'https://devconnect.org',
  },
  {
    text: 'Discord',
    url: 'https://discord.gg/FsCFPMTSm9',
  },
  // {
  //   text: 'Livestream',
  //   url: 'https://devconnect.org',
  // },
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

      <Link href="https://workspace.web3.design/" className="button orange-fill sm">
        Notion
      </Link>
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

  if (!mounted) return null

  return (
    <div className={css['mobile-navigation']}>
      <div className={css['foldout-toggle']}>
        <Link href="https://workspace.web3.design/" className="button orange-fill xs">
          Notion
        </Link>
        <div className={css['clickable-surface']} onClick={() => setOpen(true)}>
          <HamburgerIcon className="large-text-em icon" />
        </div>
      </div>

      {createPortal(
        <div className={`${open ? css['open'] : ''} ${css['foldout']}`}>
          <div className="section">
            <div className={css['body']}>
              <div className={css['header']}>
                <Logos />
                <div className={`${css['foldout-toggle']} clear`}>
                  <div className={css['clickable-surface']} onClick={() => setOpen(false)}>
                    <IconCross />
                  </div>
                </div>
              </div>

              <div className={css['nav']}>
                {menuItems.map(menuItem => {
                  if (menuItem.url.startsWith('#')) {
                    return (
                      <AnchorLink
                        className={css['nav-item']}
                        key={menuItem.text}
                        href={menuItem.url}
                        onClick={() => setOpen(false)}
                      >
                        {menuItem.text}
                      </AnchorLink>
                    )
                  }

                  return (
                    <Link className={css['nav-item']} key={menuItem.text} href={menuItem.url}>
                      {menuItem.text}
                    </Link>
                  )
                })}
              </div>

              <Copyright />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

const Logos = () => {
  return (
    <div className={css['logo-container']}>
      <Logo />
      <p className={css['title']}>
        UX
        <br />
        UNCONF
        <br />
        <span>22 —</span>
      </p>
    </div>
  )
}

const Menu = () => {
  return (
    <div className={`section`}>
      <div className={css['menu-container']}>
        <Logos />
        <div className={css['right']}>
          <DesktopNavigation />
          <MobileNavigation />
        </div>
      </div>
    </div>
  )
}

export default Menu
