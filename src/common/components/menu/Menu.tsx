import Image from 'next/image'
import css from './menu.module.scss'
import Logo from 'assets/images/logo.svg'

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
        <div className={css['right']}>Menus</div>
      </div>
    </div>
  )
}

export default Menu
