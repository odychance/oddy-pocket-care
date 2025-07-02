import React from 'react'
import s from './styles.module.scss'
import Image from 'next/image'
import coin from '/src/assets/Images/Pig/coin.png'
import contour from '/src/assets/Images/Pig/contour.png'
import pig from '/src/assets/Images/Pig/pig.png'
import gsap from 'gsap'
import clsx from 'clsx'

const Loader = () => {
  const [ loaderState, setLoaderState ] = React.useState(false)

  const coinRef = React.useRef(null)
  const targetRef = React.useRef(null)
  const titleRef = React.useRef(null)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    const tl = gsap.timeline()
    const coin = coinRef.current
    const target = targetRef.current
    const title = titleRef.current
    const container = containerRef.current

    tl.set(coin, {y: "-50vh", opacity: 0})
    tl.set(target, { opacity: 0, scale: 0})
    tl.set(title, {width: "0vh"})
    tl.to(target, { duration: 1, opacity: 1, scale: 1, ease: "power2.inOut"})
    tl.to(coin, {duration: 1.5, opacity: 1, ease: "power2.in", y: "4vh"})
    for (let i = 0; i < 6; i++) {
      let dur = 0.1 * Math.pow(0.85, i);
      tl.to(target, {
        rotation: i % 2 === 0 ? 2 : -2,
        duration: dur,
        ease: "power1.inOut"
      });
    }
    tl.to(target, { rotation: 0, duration: 0.08, ease: "power2.out" });
    tl.to(title, {delay: 0.5, duration: 1, ease: "power4.inOut", width: "40vh"})
    tl.to(container, {duration: 2, ease: "power4.inOut", opacity: 0, onComplete: () => setLoaderState(!loaderState)})
    tl.to([target, title], {duration: 2, ease: "power4.inOut", scale: 0.1}, "<")

  }, [])


  return (
    <div className={clsx(s["conatinerLoader"], loaderState && s["loaderComplete"])} ref={containerRef}>
      <div className={s["targetObject"]} ref={targetRef}>
        <Image src={coin} className={s["coin"]} alt="coin" fill ref={coinRef}/>
        <Image src={contour} className={s["contour"]} alt="contour" fill/>
        <Image src={pig} className={s["pig"]} alt="pig" fill/>
      </div>
      <p className={s["title"]} ref={titleRef}>pocket care</p>
    </div>
  )
}

export default Loader