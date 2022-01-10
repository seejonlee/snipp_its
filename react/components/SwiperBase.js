import React from 'react';
import classNames from 'classnames';
// Swiper ESM imports currently require some ESLint disabling.
// It's a known limitationm for example https://swiperjs.com/react#usage-with-create-react-app
import { Swiper, SwiperSlide } from 'swiper/react'; /* eslint-disable-line */
import { Autoplay, Pagination } from 'swiper';

import 'swiper/scss'; /* eslint-disable-line */
import 'swiper/scss/pagination'; /* eslint-disable-line */

const ns = `swiper-base`;

const SwiperBase = ({
	experiences: items,
}) => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	return (
		<div className={rootClassnames}>
			<div className={`${ ns }__slider-container`}>
				{
					items.length > 0 && (
						<Swiper
							modules={[Autoplay, Pagination]}
							slidesPerView={1}
							pagination={{
								clickable: true,
								el: `.swiper-pagination`,
							}}
							speed={500}
							loop
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
						>
							{
								items.map(({
									title,
								}, _index) => {
									const slideCountLabel = (_index + 1).toString().padStart(2, '0');
									const totalCountLabel = (items.length).toString().padStart(2, '0');

									return (
										<SwiperSlide
											key={title}
											className={`${ ns }__slide`}
										>
											<div>
												{`SLIDE ${ slideCountLabel } OF ${ totalCountLabel }`}
											</div>
										</SwiperSlide>
									);
								})
							}
						</Swiper>
					)
				}
				<div className={`swiper-pagination`} />
			</div>
		</div>
	);
};

export default SwiperBase;
