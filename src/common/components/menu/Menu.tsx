import Image from 'next/image'
import css from './menu.module.scss'

const Menu = () => {
  return (
    <div className={`section`}>
      <div className={css['menu']} style={{ background: 'blue' }}>
        Menus
      </div>
    </div>
  )
}

export default Menu
