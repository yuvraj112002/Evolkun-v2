import Image from 'next/image'
import Slider from 'react-infinite-logo-slider'

const SingleBrand = ({ brand }) => {
  const { image, title, darkImg } = brand

  return (
    <Slider.Slide>
      <div className='flex items-center'>
        <Image
          src={image}
          alt={title}
          height={100}
          width={300}
          className='
            dark:hidden swiper-logo-image
            h-12 w-auto object-contain
            opacity-50 grayscale
            transition-all duration-300
            hover:opacity-90 hover:grayscale-0
          '

        />
        {/* <Image
          src={darkImg}
          alt={title}
          height={100}
          width={300}
          className='dark:block hidden swiper-logo-image h-22  w-auto object-contain'
        /> */}
      </div>
    </Slider.Slide>
  )
}

export default SingleBrand
