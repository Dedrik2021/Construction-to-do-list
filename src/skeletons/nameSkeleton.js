import React from 'react';
import ContentLoader from 'react-content-loader';

const NameSkeleton = () => (
	<ContentLoader
		speed={2}
		width={210}
		height={30}
		viewBox="0 0 210 30"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		
		<rect x="0" y="0" rx="5" ry="5" width="210" height="30" />
	</ContentLoader>
);

export default NameSkeleton;
