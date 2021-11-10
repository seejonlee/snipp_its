import React, {
	useRef, useEffect, useState, useCallback
} from 'react';
import innerHeight from 'ios-inner-height';

import { registerScrollTransition, getCanvasImageScaleParameters } from '../../../functions';

import Styled from './style';

const ImageSequence = ({ copySlides }) => {
	const containerRef = useRef();
	const canvasRef = useRef();
	const contextRef = useRef();
	const imageRef = useRef();
	const [frameCount] = useState(148);
	const [activeIndex, setActiveIndex] = useState(0);

	// Initialization related utility functions.
	const currentFrame = (index) => (
		`https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${ index.toString().padStart(4, '0') }.jpg`
	);

	const preloadImages = useCallback(() => {
		for (let i = 1; i < frameCount; i += 1) {
			const img = new Image();
			img.src = currentFrame(i);
		}
	}, [frameCount]);

	const updateImage = useCallback((index) => {
		imageRef.current.src = currentFrame(index);
		const { x, y, scale } = getCanvasImageScaleParameters(canvasRef.current, imageRef.current);
		contextRef.current.drawImage(imageRef.current, x, y, imageRef.current.width * scale, imageRef.current.height * scale);
	}, []);

	const updateImageOnScroll = useCallback((percentScrolled) => {
	  const frameIndex = Math.min(frameCount - 1, Math.ceil(percentScrolled * frameCount));
	  // console.log({ frameIndex });
		updateImage(frameIndex + 1);
	}, [frameCount, updateImage]);

	useEffect(() => {
		// Initialize imageRef object.
		imageRef.current = new Image();

		// Initialize the first render of the canvas.
		if (canvasRef.current && imageRef.current) {
			contextRef.current = canvasRef.current.getContext('2d');
			imageRef.current.src = currentFrame(1);
			canvasRef.current.width = window.innerWidth;
			canvasRef.current.height = innerHeight();

			imageRef.current.onload = () => {
				const { x, y, scale } = getCanvasImageScaleParameters(canvasRef.current, imageRef.current);
				contextRef.current.drawImage(imageRef.current, x, y, imageRef.current.width * scale, imageRef.current.height * scale);
			};
		}

		// Initialize the scroll handler to create the scroll image sequence.
		if (containerRef.current) {
			registerScrollTransition(containerRef.current, (percentScrolled) => {
				// Update the canvas image.
				if (canvasRef.current) {
					updateImageOnScroll(percentScrolled);
				}

				// Update the copy content.
				if (percentScrolled <= 0.27) {
					setActiveIndex(0);
				} else if (percentScrolled <= 0.53) {
					setActiveIndex(1);
				} else if (percentScrolled <= 0.73) {
					setActiveIndex(2);
				} else {
					setActiveIndex(3);
				}
			});	
		}

		// Preload images
		preloadImages();
	}, [frameCount, preloadImages, updateImage, updateImageOnScroll]);

	return (
		<Styled.ImageSequence ref={containerRef}>
			<Styled.StickyContainer>
			{
				<Styled.Canvas
				ref={canvasRef}
				>
				</Styled.Canvas>
			}
			{
				copySlides.map(({ title, titleAccent, description }, index) => (
				<Styled.CopyContainer
					key={title}
					className={`${ activeIndex === index ? `active` : `` }`}
				>
					<Styled.Title>
					{title}
					{
						titleAccent && (
						<Styled.Accent>{` ${ titleAccent }`}</Styled.Accent>
						)
					}
					</Styled.Title>
					<Styled.Description>
					{description}
					</Styled.Description>
				</Styled.CopyContainer>
				))
			}
			</Styled.StickyContainer>
		</Styled.ImageSequence>
	);
};

ImageSequence.defaultProps = {
	copySlides: [
		{
			title: 'RAMEN IS',
			titleAccent: 'TRADITION',
			// eslint-disable-next-line max-len
			description: 'From the handcrafted bowls made famous in Japanese ramen shops to the quick and easy versions found in today’s college dorm rooms, this iconic dish has journeyed far and wide.',
		},
		{
			title: 'BEGINNINGS',
			// eslint-disable-next-line max-len
			description: 'Ramen’s story starts as la mien (拉麵, or hand-pulled noodles), before Chinese immigrants bring it to Japan in the 19th century. The dish is popularized by a Tokyo noodle shop named Rairaiken in 1910 and eventually becomes known as “ramen.”',
		},
		{
			title: 'EVOLUTION',
			// eslint-disable-next-line max-len
			description: 'Ramen transforms into a national dish in the 1950s, with specialities emerging all over the country. Its rising popularity is also due in part to the invention of instant ramen by Momofuku Ando — this tasty and now ultra-convenient dish becomes an instant hit.',
		},
		{
			title: 'TODAY',
			// eslint-disable-next-line max-len
			description: 'New chapters in ramen\'s rich and wonderful story are still being written. From ramen tours and museums to innovations like frozen varieties and the “ramen burger,” this iconic Japanese dish’s global appeal shows no sign of slowing down.',
		}
	]
};

export default ImageSequence;
