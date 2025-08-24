import React, { useRef } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { SEO } from 'common/components/SEO'
import Logo from 'assets/images/logo.svg'
import css from './index.module.scss'
import Menu from 'common/components/menu'
import HolographicAnimation from 'common/components/holographic/Holographic'
import DevconnectLogo from 'assets/images/devconnect-logo.svg'
import AmsterdamBackground from 'assets/images/istanbul-background.png'
import Zuck from 'assets/images/zuck.png'
import AmsterdamForeground from 'assets/images/istanbul-foreground.png'
import Link from 'common/components/link'
import ScrollDownIcon from 'assets/icons/scroll-down.svg'
import PinIcon from 'assets/icons/pin.svg'
import EFLogo from 'assets/images/ef-logo.svg'
import PlusIcon from 'assets/icons/plus.svg'
import MinusIcon from 'assets/icons/minus.svg'
import DiscordIcon from 'assets/icons/discord.svg'
import { DESCRIPTION } from 'common/components/SEO'
import { CyberpunkScene } from 'common/components/cyberpunk-scene/CyberpunkScene'

const FAQ = [
  {
    title: 'What is an UNCONFERENCE?',
    text: (
      <>
        An <u>unconference</u> is a participant-driven meeting. Avoiding hierarchical aspects of a conventional
        conference, such as sponsored presentations and top-down organization. The attendees steer the discussions and
        sessions at hand, leading to working groups being led by the participant who suggested it&apos;s topic or
        directed open discussions of the session topic.
      </>
    ),
  },
  {
    title: 'What is the event agenda?',
    text: (
      <>
        10:00 - 12:30 Lightning talks session. Lunch Break. Afternoon Onwards - Unconference dictated agenda and working
        groups based on general consensus.
      </>
    ),
  },
  {
    title: 'Do I need to be familiar with WEB3 UX design methodologies to attend?',
    text: (
      <>
        No, the goal of the UNCONFERENCE is to bring together a breadth of participants from all layers of the Web3 Tech
        Stack to share their painpoints and potential solutions they would like to see come to fruition. The value is
        created through examining the diverse sets of perspectives and aiming for consistent mental models that can be
        easily adopted and shared amongst the eco-system.
      </>
    ),
  },
  {
    title: 'Can I participate remotely?',
    text: (
      <>
        The morning lighting talks will be recorded and shared for all to view. Due to the collaborative and in-person
        nature of the UNCONFERENCE working groups it is not possible to facilitate them live remotely during the actual
        event. However, the outputs and additional educational resources will be made public with open calls to action
        for any interested parties to join the conversation and continue post the UNCONFERENCE. You can join our discord
        community here to keep updated and engaged.
      </>
    ),
  },
  {
    title: 'How should I prepare for the UNCONFERENCE?',
    text: (
      <>
        Come ready to participate and be open to collaboration. The intent should not be to shill your particular
        solution but to learn about and explore alternatives that you may have overlooked or missed in the past.
      </>
    ),
  },
  {
    title: 'Can I present and promote my project?',
    text: (
      <>
        The Unconference has been designed to be a no-shill zone and therefore has no product promotion oriented talks.
        Therefore, if you do wish to apply to present something please frame it in the context of the UX challenge you
        are trying to solve for or hoping to gain additional community involvement with.
      </>
    ),
  },
]

const Accordion = () => {
  const [open, setOpen] = React.useState<string | null>(null)

  return (
    <ul className={css['accordion']}>
      {FAQ.map(faqItem => {
        let className = css['accordion-item']

        const selected = faqItem.title === open

        if (selected) className += ` ${css['open']}`

        return (
          <li key={faqItem.title} onClick={() => setOpen(selected ? null : faqItem.title)} className={className}>
            <div className={css['header']}>
              <p className={css['title']}>{faqItem.title}</p>
              {selected ? <MinusIcon /> : <PlusIcon />}
            </div>
            <p className={css['content']}>{faqItem.text}</p>
          </li>
        )
      })}
    </ul>
  )
}

export const Copyright = () => {
  return (
    <div className={'copyright-block'}>
      <p className={`copyright tiny-text`}>
        © {new Date().getFullYear()} Web3 Design, EMPIRE. Trademarks and brands are the property of their respective
        owners.
      </p>
      <Link href="http://empire.ventures" className={'empire'}>
        <p className={`uppercase bold`}>Empire</p>
      </Link>
    </div>
  )
}

const Newsletter = React.memo(() => {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <div className={css['newsletter']}>
      <p className={css['grey']}>Subscribe to our newsletter</p>

      <div className={css['input-submit']}>
        <div id="mc_embed_signup">
          <form
            ref={ref}
            action="https://studio.us14.list-manage.com/subscribe/post?u=75297465be6b369bc5599ec9f&amp;id=4a44b4f9dc"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group">
                <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" />
              </div>

              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
              </div>

              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" name="b_75297465be6b369bc5599ec9f_4a44b4f9dc" tabIndex={-1} />
              </div>
            </div>
          </form>
        </div>

        <button className={`button xs grey`} onClick={() => ref.current && ref.current.submit()}>
          Subscribe
        </button>
      </div>
    </div>
  )
})

Newsletter.displayName = 'Newsletter'

const useParallax = (elementRef: any) => {
  const [parallaxMultiplier, setParallaxMultiplier] = React.useState(0)

  React.useEffect(() => {
    const element = elementRef.current

    if (!element) return

    let options = {
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    }

    const callback = (entries: any) => {
      const { intersectionRatio, boundingClientRect } = entries[0]

      const scrolledBeyond = boundingClientRect.y < 0

      const maxMagnitude = 200

      if (scrolledBeyond) {
        const magnitude = 100 + (100 - intersectionRatio * 100)

        setParallaxMultiplier(magnitude / maxMagnitude)
      } else {
        const magnitude = intersectionRatio * 100

        setParallaxMultiplier(magnitude / maxMagnitude)
      }
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef])

  return parallaxMultiplier
}

const parallax = (parallaxMultiplier: any) => {
  const baselineTranslateY = 30 // Upper limit translate Y
  const targetTransLateY = -20 // Lower limit translate Y
  const range = baselineTranslateY - targetTransLateY
  const translateYPercentage = baselineTranslateY - parallaxMultiplier * range

  return {
    transform: `translateY(${Math.min(3, translateYPercentage * -1)}%)`,
  }
}

const Background = () => {
  const ref = React.useRef<any>()
  const parallaxMultiplier = useParallax(ref)

  return (
    <>
      <div className={css['background']} ref={ref}>
        <Image src={"/devconnect-arg-text.svg"} layout="fill" alt='ARG'></Image>
        {/* <div style={parallax(parallaxMultiplier)}>
          <Image src={AmsterdamBackground} alt="Background" layout="fill" objectFit="contain" objectPosition="bottom" />
        </div> */}
      </div>
      {/* <div className={css['foreground']}>
        <Image src={AmsterdamForeground} alt="Background" layout="fill" objectFit="contain" objectPosition="bottom" />
      </div> */}
    </>
  )
}

const Home: NextPage = () => {
  return (
    <div>
      <SEO />

      <div className={`${css['scene']} ${css['no-overflow']}`}>
        <div className={css['hero']}>
          <Menu />

          <div className="section" id="title-section">
            <div className={css['title-block']}>
              <h1 className="title">
                UX<span className={css['conference-name']}>ARGENTINA</span>
                <span className={css['year']}>25</span>
                <br />
                UNCONFERENCE
              </h1>
              <Link href="https://devconnect.org/">
                <DevconnectLogo />
              </Link>
            </div>
          </div>

          <div className="section">
            <div className={css['bottom-block']}>
              <div className={css['date-block']}>
                <p className={`${css['date']}`}>Nov 18 —</p>
                <p className={css['where']}>
                  Devconnect
                  <span>Argentina</span>
                </p>
              </div>
              {/* <div className={css['call-to-action']}>
                <Link
                  href="https://noteforms.com/forms/ux-unconf-devconnect-ist-vcsn9e"
                  className="button orange-fill sm"
                >
                  Apply
                </Link>

                <Link href="https://workspace.web3.design/" className="button sm">
                  Notion
                </Link>

                <Link
                  // indicateExternal
                  href={(() => {
                    const googleCalUrl = new URL(
                      `https://www.google.com/calendar/render?action=TEMPLATE&ctz=Europe/Istanbul`
                    )

                    googleCalUrl.searchParams.append('text', `UX Unconference`)
                    googleCalUrl.searchParams.append('details', DESCRIPTION)

                    googleCalUrl.searchParams.append(
                      'location',
                      `Istanbul Congress Center
                      Darülbedai Cad. No:3 34367 Şişli Maçka, İstanbul, Türkiye`
                    )

                    googleCalUrl.searchParams.append('dates', `20231116T093000/20231116T180000`)

                    return googleCalUrl.href
                  })()}
                  className="button sm"
                >
                  Add to calendar
                </Link>
              </div> */}
              <div className={css['location']}>
                <PinIcon width={50} height={50} />

                <Link href="https://www.google.com/maps/place/La+Rural/@-34.5797805,-58.4235076,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcb59cd6452553:0x6b521307d135059a!8m2!3d-34.5797805!4d-58.4209327!16s%2Fg%2F1ymyp0my0?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D">
                  <p>
                    <span className={"bold " + css['location-name']}>La Rural</span> <br />
                    Palermo — Av. Sarmiento 2704, C1425 Cdad. <br />
                    <span className="orange">Buenos Aires, Argentina</span>
                  </p>
                </Link>
                {/* <Link href="https://g.page/het-west-indisch-huis?share">
                  <p>
                    Het West-Indisch Huis
                    <br />
                    Herenmarkt 99, 1013 EC Amsterdam, Netherlands
                  </p>
                </Link> */}
              </div>
            </div>
            <div className={css['scroll-to-continue']}>
              {/* <ScrollDownIcon />
              <p>Scroll to continue</p> */}
            </div>
          </div>

          <div className={css['animated-background']}>
            <CyberpunkScene/>
            {/* <HolographicAnimation /> */}
          </div>
        </div>
      </div>

      <div className={`${css['scene']} ${css['grow-naturally']} ${css['grow-vertically']}`} id="about">
        <div className={css['about']}>
          <div className="section">
            <div className={css['info-block']}>
              <div className={css['left']}>
                <Logo />
              </div>

              <div className={css['right']}>
                <div className={css['block']}>
                  <h3 className={css['header']}>UX Unconference</h3>

                  <p className="extra-large-text">
                    Open-source design un<span style={{ textDecoration: 'line-through' }}>conference</span> and
                    structured working groups helping to drive improved User Experience and usability standards forward
                    for the decentralized eco-system.
                  </p>
                </div>

                <div className={css['block']}>
                  <h3 className={css['header']}>Objective</h3>

                  <p className={css['grey']}>
                    Enable cross-pollination of fresh perspectives, emerging UX methodologies, and AI-driven innovations, bringing together developers and designers working across the layers of the Web3 tech stack to share unique solutions, encourage interoperability, and harness intelligent systems. Together, we’ll create consistent, sustainable mental models that make navigating the decentralized, AI-powered web intuitive and empowering for everyone.
                  </p>
                </div>

                <div className={css['call-to-action']}>
                  <Link href="https://workspace.web3.design/" className="button sm">
                    Notion workspace
                  </Link>

                  <Link href="https://discord.gg/FsCFPMTSm9" className="button sm">
                    Discord
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Background />
        </div>
      </div>

      <div className="section" id="faq">
        <div className={css['faq']}>
          <div className={css['left']}>
            <h2 className="extra-large-text">Frequently Asked Questions</h2>
          </div>

          <div className={css['right']}>
            <Accordion />
          </div>
        </div>
      </div>

      <div className="section">
        <div className={css['footer']}>
          <div className={css['block-1']}>
            <div className={css['left']}>
              <div className={`${css['header']} extra-large-text`}>
                <span className="bold">Collaborate</span> to reimagine the web. Join the builders, thinkers, and dreamers making it human-first.
              </div>

              <p className={`${css['grey']}`}>
                The unconference is a no-shill zone, designed to facilitate sharing and collaboration on research and
                standardized work being done to improve the overall UX of the ecosystem.
              </p>
            </div>

            <div className={css['right']}>
              <div className={css['content']}>
                <p className="small-text">Made possible with support by:</p>

                <div className={css['logos']}>
                  <Link href="https://devconnect.org/">
                    <DevconnectLogo />
                  </Link>
                  <Link href="https://ethereum.foundation/">
                    <EFLogo />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={css['block-2']}>
            <div className={css['left']}>
              <div className={css['logo-block']}>
                <Logo />
                <p className={css['title']}>
                  UX
                  <br />
                  UNCONF
                  <br />
                  <span>25 —</span>
                </p>
              </div>
              <div className={css['social-media']}>
                <p className={css['grey']}>Community</p>
                <Link href="https://discord.gg/FsCFPMTSm9">
                  <DiscordIcon />
                </Link>
              </div>
            </div>

            <div className={css['right']}>
              <Newsletter />
            </div>
          </div>

          <Copyright />
        </div>
      </div>
    </div>
  )
}

export default Home
