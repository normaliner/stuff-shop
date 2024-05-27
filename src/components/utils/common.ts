import AvatarIcon from '../../images/avatar.jpg';
export const shuffle = <T>(arr: T[]): T[] => {
	return [...arr].sort(() => 0.5 - Math.random());
};
export const buildUrl = (url: string, params: { title: string }) => {
	let urlWithParams = url;
	Object.entries(params).forEach(([key, value], i) => {
		const sign = !i ? '?' : '&';
		urlWithParams += `${sign}${key}=${value}`;
	});
	return urlWithParams;
};

export const parseImageUrl = (image:string) => {
	try {
		const parsedImages = JSON.parse(image);
		return parsedImages[0];
	} catch (error) {
		console.error('Failed to parse image URL', error);
		return AvatarIcon; 
	}
};
