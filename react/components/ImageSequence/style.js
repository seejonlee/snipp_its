import styled from 'styled-components';

const Styled = {
};

Styled.ImageSequence = styled.div`
	position: relative;
	height: 400vh;
`;

Styled.StickyContainer = styled.div`
	position: sticky;
	top: 80px;
	width: 100vw;
	height: calc(100vh - 80px);
	z-index: 1;

	@media only screen and (min-width 992px) {
		top: 100px;
		height: calc(100vh - 100px)
	}
`;

Styled.Canvas = styled.canvas`
	position: absolute;
	left: 50%;
	top: 50%;
	max-height: 100vh;
	max-width: 100vw;
	transform: translate(-50%, -50%);
`;

Styled.CopyContainer = styled.div`
	position: absolute;
	top: 36%;
	left: 50%;
	transform: translateX(-50%);
	width: calc(100% - 20px);
	text-align: center;
	color: #F1ECD8;
	opacity: 0;
	transition: all 250ms cubic-bezier(.3,0,.1,1);
	z-index: 2;

	&.active {
		opacity: 1;
	}
`;

Styled.Title = styled.h2`
	margin: 0 auto 20px;
	max-width: 335px;

	@media only screen and (min-width 768px) {
		font-size: 45px;
		line-height: 90%;
		white-space: nowrap;
		max-width: unset;
	}

	@media only screen and (min-width 992px) {
		font-size: 60px;
		line-height: 90%;
		white-space: nowrap;
		max-width: unset;
	}
`;

Styled.Accent = styled.span`
	color: #EB734B;
`;

Styled.Description = styled.p`
	margin: 0 auto 40px;

	@media only screen and (min-width 992px) {
		max-width: 600px;
	}
`;

export default Styled;
